# Dotfiles

Personal dotfiles for shell, terminal, editor, window manager, fonts, and Codex CLI setup.

This repository is not a one-command bootstrap. It mixes macOS and Linux configuration, so the intended workflow is to symlink only the pieces you want and review machine-specific paths before using them.

## What is in the repo

- `.zshrc` and `.p10k.zsh`: `oh-my-zsh` + `powerlevel10k`, custom `PATH`, Conda init, and Google Cloud SDK hooks.
- `.config/fish/config.fish`: Fish shell setup with Homebrew, Conda, certificate environment variables, and custom SSH helper functions.
- `.wezterm.lua`: WezTerm theme, font selection, and pane management keybindings.
- `.vimrc` and `.vim_runtime/`: Vim setup built on a vendored `vim_runtime` tree.
- `.config/nvim/init.vim`: Minimal Neovim settings.
- `.config/i3/` and `.config/i3blocks/`: i3 window manager config, i3blocks status bar config, lock script, and helper scripts.
- `.fonts/`: Fonts used by the desktop and terminal setup.
- `.codex/`: Codex CLI config, agent definitions, prompts, and custom skills.

## Install

Clone the repo somewhere stable, then symlink only the configs you want:

```bash
git clone <your-fork-or-repo-url> ~/dotfiles
cd ~/dotfiles

mkdir -p ~/.config

ln -sf ~/dotfiles/.zshrc ~/.zshrc
ln -sf ~/dotfiles/.p10k.zsh ~/.p10k.zsh
ln -sf ~/dotfiles/.wezterm.lua ~/.wezterm.lua
ln -sf ~/dotfiles/.vimrc ~/.vimrc
ln -sf ~/dotfiles/.config/nvim ~/.config/nvim
ln -sf ~/dotfiles/.config/fish ~/.config/fish
ln -sf ~/dotfiles/.config/i3 ~/.config/i3
ln -sf ~/dotfiles/.config/i3blocks ~/.config/i3blocks
ln -sf ~/dotfiles/.codex ~/.codex
```

If you want the bundled fonts, copy or symlink the files from `.fonts/` into your local font directory and refresh the font cache for your OS.

## Dependencies

Several configs assume tools are already installed:

- Shell: `zsh`, `oh-my-zsh`, `powerlevel10k`, `fish`, Conda, Google Cloud SDK
- Terminal/editor: WezTerm, Vim, Neovim
- Linux desktop: i3, i3blocks, `i3lock`, `scrot`, ImageMagick, `feh`, `compton` or `picom`, `playerctl`, `pactl`, `xbacklight`, `synclient`
- Fonts: a Nerd Font-compatible terminal font, plus the fonts in `.fonts/` if you want the exact desktop look

## Notes

- Several paths are hard-coded for the original machine, including Homebrew, Conda, Google Cloud SDK, wallpapers, and SSH targets.
- The i3 config is Linux-specific. The Fish, Zsh, WezTerm, and Codex setup are the parts most likely to be useful on macOS.
- `.vim_runtime/` is tracked in-repo rather than installed separately.
