// material core
import { createTheme } from '@mui/material/styles'
import typography from './typography'
import palette from './palette'

const themes = (type: number) =>
  createTheme({
    typography: { ...typography },
    palette: { ...palette },
  })

export default themes
