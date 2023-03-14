import {
  Typography,
  Container,
  FormHelperText,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material'
import { BASE_URL } from '../../../app/api/variables'
import { useServerError } from '../../../hooks/useServerError'
import { FC, useEffect, useState } from 'react'
import { getLeaderboard, transformLeaderboard } from '../services/leaderboard'

export const Leaderboard: FC = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const { serverError, setError } = useServerError()
  useEffect(() => {
    getLeaderboard()
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401) {
          setError(new Error(`Войдите в аккаунт`))
        } else {
          setError(new Error(`Что-то пошло не так`))
        }
      })
      .then(result => {
        if (result) {
          if (result.length) {
            setLeaderboard(transformLeaderboard(result))
          } else {
            setError(new Error(`У нас пока нет статистики. Станьте первым!`))
          }
        }
      })
      .catch(setError)
  }, [])

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography color="primary" variant="h4">
        Результаты
      </Typography>
      <FormHelperText
        sx={{
          color: 'red',
          fontSize: 16,
        }}>
        {serverError}
      </FormHelperText>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 310 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Место</TableCell>
              <TableCell align="center">Аватар</TableCell>
              <TableCell align="right">Логин</TableCell>
              <TableCell align="right">id</TableCell>
              <TableCell align="right">Счет</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map(row => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{row.place}</TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar src={`${BASE_URL}/resources/${row.avatar}`} />
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.progress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
