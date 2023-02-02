import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { useEffect } from 'react'
import { useStore, useSet } from '../../../app/store/hooks'
import { fetchExampleData } from '../services/exampleApi'
import {
  exampleInput,
  exampleSelect,
  getExampleInput,
} from '../services/exampleSlice'

export const PageComponent: React.FC = () => {
  const set = useSet()
  const selectValue = useStore(({ example }) => example.select)
  const status = useStore(({ example }) => example.status)
  const data = useStore(({ example }) => example.data)
  const inputValue = useStore(getExampleInput)

  useEffect(() => {
    set(fetchExampleData())
  }, [])

  return (
    <Container maxWidth="sm" sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Stack sx={{ flexGrow: 1 }} spacing={2}>
          <TextField
            label="example input"
            sx={{ width: '100%' }}
            value={inputValue}
            onChange={ev => set(exampleInput(ev.target.value))}
            helperText={`store: ${inputValue}`}
          />
          <FormControl disabled={status === 'pending'}>
            <InputLabel id="select-label">
              {status === 'pending' ? 'loading...' : 'data'}
            </InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={selectValue || ''}
              label="data"
              onChange={ev => set(exampleSelect(ev.target.value))}>
              {data.map(({ id }) => (
                <MenuItem key={id} value={id}>
                  {id}
                  {id}
                  {id}
                  {id}
                  {id}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>thunk: {status}</FormHelperText>
          </FormControl>
        </Stack>
      </Box>
    </Container>
  )
}
