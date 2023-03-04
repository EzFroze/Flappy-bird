import { useStore } from "../app/store/hooks"
import { getThemeConfig } from "../features/themes/services/themeSlice"

export const useTheme = () => {
  const config = useStore(getThemeConfig)
  const theme = useStore(s => s.themes.mode)
  const mode = theme === 'light' ? 0 : 1

  return {
    config,
    theme,
    mode,
    background: config.bgr[mode],
    button: {
      backgroundColor: config.btn[mode], 
      color: config.txt[mode]
    },
    text: config.txt[mode]
  } as const
}