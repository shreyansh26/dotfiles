-- Pull in the wezterm API
local wezterm = require 'wezterm'

-- This will hold the configuration.
local config = wezterm.config_builder()

local act = wezterm.action

-- This is where you actually apply your config choices

-- For example, changing the color scheme:
config.color_scheme = 'arcoiris'
config.font = wezterm.font 'MesloLGS NF'

-- config.colors = {
--   tab_bar = {
--     -- The color of the inactive tab bar edge/divider
--     inactive_tab_edge = '#575757',
--   },
--   -- -- The default text color
--   -- foreground = 'silver',
--   -- -- The default background color
--   -- background = 'black',

--   -- Overrides the cell background color when the current cell is occupied by the
--   -- cursor and the cursor style is set to Block
--   cursor_bg = '#52ad70',
--   -- Overrides the text color when the current cell is occupied by the cursor
--   cursor_fg = 'black',
--   -- Specifies the border color of the cursor when the cursor style is set to Block,
--   -- or the color of the vertical or horizontal bar when the cursor style is set to
--   -- Bar or Underline.
--   cursor_border = '#52ad70',

--   -- the foreground color of selected text
--   selection_fg = 'black',
--   -- the background color of selected text
--   selection_bg = '#fffacd',

--   -- The color of the scrollbar "thumb"; the portion that represents the current viewport
--   scrollbar_thumb = '#222222',

--   -- The color of the split lines between panes
--   split = '#444444',

--   ansi = {
--     'black',
--     'maroon',
--     'green',
--     'olive',
--     'navy',
--     'purple',
--     'teal',
--     'silver',
--   },
--   brights = {
--     'grey',
--     'red',
--     'lime',
--     'yellow',
--     'blue',
--     'fuchsia',
--     'aqua',
--     'white',
--   },

--   -- Arbitrary colors of the palette in the range from 16 to 255
--   indexed = { [136] = '#af8700' },

--   -- Since: 20220319-142410-0fcdea07
--   -- When the IME, a dead key or a leader key are being processed and are effectively
--   -- holding input pending the result of input composition, change the cursor
--   -- to this color to give a visual cue about the compose state.
--   compose_cursor = 'orange',

--   -- Colors for copy_mode and quick_select
--   -- available since: 20220807-113146-c2fee766
--   -- In copy_mode, the color of the active text is:
--   -- 1. copy_mode_active_highlight_* if additional text was selected using the mouse
--   -- 2. selection_* otherwise
--   copy_mode_active_highlight_bg = { Color = '#000000' },
--   -- use `AnsiColor` to specify one of the ansi color palette values
--   -- (index 0-15) using one of the names "Black", "Maroon", "Green",
--   --  "Olive", "Navy", "Purple", "Teal", "Silver", "Grey", "Red", "Lime",
--   -- "Yellow", "Blue", "Fuchsia", "Aqua" or "White".
--   copy_mode_active_highlight_fg = { AnsiColor = 'Black' },
--   copy_mode_inactive_highlight_bg = { Color = '#52ad70' },
--   copy_mode_inactive_highlight_fg = { AnsiColor = 'White' },

--   quick_select_label_bg = { Color = 'peru' },
--   quick_select_label_fg = { Color = '#ffffff' },
--   quick_select_match_bg = { AnsiColor = 'Navy' },
--   quick_select_match_fg = { Color = '#ffffff' },
-- }

config.window_frame = {
  -- The font used in the tab bar.
  -- Roboto Bold is the default; this font is bundled
  -- with wezterm.
  -- Whatever font is selected here, it will have the
  -- main font setting appended to it to pick up any
  -- fallback fonts you may have used there.
  font = wezterm.font { family = 'Roboto', weight = 'Bold' },

  -- The size of the font in the tab bar.
  -- Default to 10.0 on Windows but 12.0 on other systems
  font_size = 12.0,

  -- The overall background color of the tab bar when
  -- the window is focused
  active_titlebar_bg = '#333333',

  -- The overall background color of the tab bar when
  -- the window is not focused
  inactive_titlebar_bg = '#333333',
}

-- config.background = {
--   {
--     source = {
--       File = {path="C:\\Users\\shrey\\Dropbox\\My PC (DESKTOP-CRUV06M)\\Downloads\\58f5826aac1db16199c2d9925e7b5cef.gif", speed=0.2},
--     },
--     width = '100%'
--   }
-- }

config.keys = {
  -- This will create a new split and run your default program inside it
  {
    key = 'h',
    mods = 'CTRL|SHIFT|ALT',
    action = wezterm.action.SplitVertical { domain = 'CurrentPaneDomain' },
  },
  {
    key = 'v',
    mods = 'CTRL|SHIFT|ALT',
    action = wezterm.action.SplitHorizontal { domain = 'CurrentPaneDomain' },
  },
  {
    key = 'b',
    mods = 'CTRL',
    action = act.RotatePanes 'CounterClockwise',
  },
  { key = 'n', mods = 'CTRL', action = act.RotatePanes 'Clockwise' },
}

-- config.default_prog = { 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe' }
-- config.audible_bell = "Disabled"

-- config.ssh_domains = {
--   {
--     -- This name identifies the domain
--     name = '8xh100',
--     -- The hostname or address to connect to. Will be used to match settings
--     -- from your ssh config file
--     remote_address = '8xh100',
--     -- The username to use on the remote host
--     username = 'shreyansh',
--     remote_wezterm_path = '/home/shreyansh/.local/bin/wezterm'
--   },
-- }

-- and finally, return the configuration to wezterm
return config
