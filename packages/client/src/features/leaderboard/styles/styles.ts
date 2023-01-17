import { SxProps } from '@mui/material'

export const styles: { [key: string]: SxProps } = {
  startContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    width: '750px',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '2px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}
