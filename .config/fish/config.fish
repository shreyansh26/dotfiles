if status is-interactive
    # Commands to run in interactive sessions can go here
end

eval "$(/opt/homebrew/bin/brew shellenv)"

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
if test -f /opt/anaconda3/bin/conda
    eval /opt/anaconda3/bin/conda "shell.fish" "hook" $argv | source
else
    if test -f "/opt/anaconda3/etc/fish/conf.d/conda.fish"
        . "/opt/anaconda3/etc/fish/conf.d/conda.fish"
    else
        set -x PATH "/opt/anaconda3/bin" $PATH
    end
end
# <<< conda initialize <<<

export CERT_PATH=/etc/ssl/certs/zscaler2.pem
export CERT_DIR=/etc/ssl/certs/
export SSL_CERT_FILE=/etc/ssl/certs/zscaler2.pem
export SSL_CERT_DIR=/etc/ssl/certs/
export REQUESTS_CA_BUNDLE=/etc/ssl/certs/zscaler2.pem
export PATH="/Users/shreyansh/Desktop/misc/tlparse/target/release/:$PATH"

# Added by `rbenv init` on Sat Mar 22 21:10:24 IST 2025
status --is-interactive; and rbenv init - --no-rehash fish | source

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/Users/shreyansh/google-cloud-sdk/path.fish.inc' ]; . '/Users/shreyansh/google-cloud-sdk/path.fish.inc'; end

function machine_01
    printf '\e]11;#1a0d1a\a'
    printf '\e]10;#e8d4f8\a'
    printf '\e]12;#bb9af7\a'
    printf '\e]4;5;#c792ea\a'
    printf '\e]4;4;#7c3aed\a'
    printf '\e]4;6;#a78bfa\a'
    command ssh 8xH100 $argv
    printf '\e]111\a\e]110\a\e]112\a\e]104\a'
end

function machine_02
    printf '\e]11;#1a0f05\a'
    printf '\e]10;#f8e4d4\a'
    printf '\e]12;#e0af68\a'
    printf '\e]4;3;#ffc777\a'
    printf '\e]4;1;#ff9e64\a'
    printf '\e]4;5;#d19a66\a'
    command ssh 10.138.0.21 $argv
    printf '\e]111\a\e]110\a\e]112\a\e]104\a'
end

function machine_03
    # bg/fg/cursor
    printf '\e]11;#0a1a0f\a'   # bg: deep forest
    printf '\e]10;#d4f8e4\a'   # fg: mint
    printf '\e]12;#50fa7b\a'   # cursor: bright green

    # palette tweaks
    printf '\e]4;2;#9ece6a\a'  # green: lime
    printf '\e]4;6;#2dd4bf\a'  # cyan: teal
    printf '\e]4;4;#34d399\a'  # blue: emerald

    command ssh ubuntu@192.168.1.103 $argv

    # reset to default
    printf '\e]111\a\e]110\a\e]112\a\e]104\a'
end

function machine_04
    # bg/fg/cursor
    printf '\e]11;#1a0a0a\a'   # bg: deep crimson-black
    printf '\e]10;#f8d4d4\a'   # fg: soft rose
    printf '\e]12;#ff6b6b\a'   # cursor: bright coral

    # palette tweaks
    printf '\e]4;1;#f7768e\a'  # red: soft coral
    printf '\e]4;5;#ff79c6\a'  # magenta: hot pink
    printf '\e]4;3;#fca5a5\a'  # yellow: salmon

    command ssh ubuntu@192.168.1.104 $argv

    # reset to default
    printf '\e]111\a\e]110\a\e]112\a\e]104\a'
end
