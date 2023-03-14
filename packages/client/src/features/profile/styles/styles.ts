import { SxProps } from '@mui/material'

export const styles: { [key: string]: SxProps } = {
  boxMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    borderRadius: '10px',
    fontSize: 16,
    mt: 2,
    color: 'white',
    backgroundColor: '#2a2f3f',
    '&:hover': {
      background: '#1976d2',
    },
  },
  link: {
    display: 'block',
    textAlign: 'center',
    width: 'calc(100% - 32px)',
    fontSize: 16,
    padding: '6px 16px',
    lineHeight: 1.75,
    textTransform: 'uppercase',
    borderWidth: '3px',
    borderRadius: '10px',
    mt: 2,
    backgroundColor: '#2a2f3f',
    '&:hover': {
      background: '#1976d2',
    },
  },
}
