#!/usr/bin/env node
'use strict';
const { spawn } = require('node:child_process');
const { createInterface } = require('node:readline');

function queryModels(binary, args = ['app-server', '--listen', 'stdio://'], timeout = 30000) {
  return new Promise((resolve, reject) => {
    const child = spawn(binary, args, { stdio: ['pipe', 'pipe', 'ignore'] });
    const lines = createInterface({ input: child.stdout });
    let done = false, requestId = 1;
    const models = [];
    const finish = (error) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      lines.close();
      child.kill();
      error ? reject(error) : resolve(models);
    };
    const timer = setTimeout(() => finish(new Error('Model query timed out')), timeout);
    const send = (message) => child.stdin.write(JSON.stringify(message) + '\n');
    child.on('error', error => finish(error));
    child.stdin.on('error', error => finish(error));
    child.on('close', code => finish(new Error(`App server exited before completing model/list (${code})`)));
    lines.on('line', line => {
      try {
        const message = JSON.parse(line);
        if (message.id !== requestId) return;
        if (message.error) throw new Error(`App-server RPC error (${message.error.code})`);
        if (!message.result) throw new Error('Missing RPC result');
        let cursor;
        if (requestId === 1) {
          send({ method: 'initialized' });
        } else {
          if (!Array.isArray(message.result.data)) throw new Error('Invalid model/list response');
          models.push(...message.result.data);
          cursor = message.result.nextCursor;
          if (!cursor) return finish();
        }
        send({ id: ++requestId, method: 'model/list', params: { limit: 100, includeHidden: false, ...(cursor ? { cursor } : {}) } });
      } catch (error) { finish(error); }
    });
    send({ id: 1, method: 'initialize', params: { clientInfo: { name: 'remote_model_check', version: '1.0' }, capabilities: { experimentalApi: true } } });
  });
}

function selectModels(models, target) {
  const visible = models.filter(model => model.hidden === false && (!target || model.id === target || model.model === target));
  if (target && !visible.length) throw new Error(`Requested model is not picker-visible: ${target}`);
  return visible.map(({ id, model, displayName, hidden }) => ({ id, model, displayName, hidden }));
}

async function selfTest() {
  const assert = require('node:assert/strict');
  const fixture = `
    require('node:readline').createInterface({input:process.stdin}).on('line', line => {
      const m = JSON.parse(line); if (!m.id) return;
      const result = m.id === 1 ? {} : { data: [{id: m.params.cursor ? 'target' : 'other', hidden:false}], nextCursor: m.params.cursor ? null : 'page2' };
      process.stdout.write(JSON.stringify({id:m.id,result})+'\\n');
    });`;
  const models = await queryModels(process.execPath, ['-e', fixture]);
  assert.equal(selectModels(models, 'target')[0].id, 'target');
  assert.throws(() => selectModels(models, 'missing'), /not picker-visible/);
  assert.throws(() => selectModels([{id:'target',hidden:true}], 'target'), /not picker-visible/);
  await assert.rejects(queryModels(process.execPath, ['-e', 'process.exit(0)']), /exited/);
  await assert.rejects(queryModels(process.execPath, ['-e', 'setInterval(()=>{},1000)'], 150), /timed out/);
  const errorFixture = fixture.replace('{id:m.id,result}', '{id:m.id,error:{code:-32601}}');
  await assert.rejects(queryModels(process.execPath, ['-e', errorFixture]), /RPC error/);
  console.log('Self-check passed: pagination, visibility, missing model, early exit, timeout, RPC error.');
}

async function main() {
  const [target, binary = 'codex'] = process.argv.slice(2);
  if (target === '--self-test') return selfTest();
  if (!target || (target !== '-' && !/^[a-zA-Z0-9][a-zA-Z0-9._:-]*$/.test(target))) {
    throw new Error('Usage: node check-model.cjs MODEL_SLUG|- [CODEX_BINARY]');
  }
  console.log(JSON.stringify({ source: 'temporary-stdio-server', binary, models: selectModels(await queryModels(binary), target === '-' ? null : target) }, null, 2));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
