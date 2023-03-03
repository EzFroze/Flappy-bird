import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Link,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {
  Outlet as ForumThreadOutlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { actionPaths, ForumTopic, Topic } from '../types'
import { Link as RouterLink } from 'react-router-dom'
import { headers } from '../data'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../../app/api/variables'

export const Forum: React.FC = () => {
  const { thread } = useParams()
  const { pathname } = useLocation()
  const [topics, setTopics] = useState<ForumTopic[]>([])
  const nav = useNavigate()

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(r => r.json())
      .then(r => console.log('users', r))
      .catch(err => console.log('err', err))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then((res) => res.json())
      .then((res: Topic[]) => {
        console.log('res', res)
        const topics = res.map((topic) => {
          const user = topic.comments?.last?.user
          const dt = topic.comments?.last?.datetime

          return {
            id: topic.id,
            name: topic.title,
            lastMessage: {
              user: user?.display_name || user?.login || '',
              date: dt ? new Date(dt).toLocaleDateString() : '',
              time: dt ? new Date(dt).toLocaleTimeString() : '',
              content: '',
            },
            messagesNumber: topic.comments.quantity,
            likes: topic.likes || 0,
            user: topic.user
          }
        })

        setTopics(topics)
      })
  }, [])

  useEffect(() => {
    console.log('forum topics', topics)
  }, [topics])

  return (
    <>
      {thread || pathname.includes(actionPaths.createThread) ? (
        <ForumThreadOutlet />
      ) : (
        <Container maxWidth="lg" sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h3">Форум</Typography>
            <Button onClick={() => {
              fetch(`${BASE_URL}/auth/logout`, {
                credentials: 'include',
                method: 'POST'
              }).then(() => nav('/'))
            }}>Выйти</Button>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={3}>
              <Link
                data-test="link-create-thread"
                underline="none"
                to={actionPaths.createThread}
                component={RouterLink}>
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  variant="contained">
                  Новая тема
                </Button>
              </Link>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={7}>
              <Stack direction="row" justifyContent="flex-end">
                <Chip label="Страницы" />
                <Pagination count={Math.ceil(topics.length / 10)} />
              </Stack>
            </Grid>
          </Grid>

          <TableContainer sx={{ mt: 2, backgroundColor: 'white' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((title, i) => (
                    <TableCell sx={{ width: title.width }} key={i * 1000}>
                      {title.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {topics.map((row, i) => (
                  <TableRow key={i * 10000}>
                    <TableCell>
                      <Stack direction={'row'} alignItems="center" spacing={2}>
                        <Avatar
                          sx={{ border: '1px solid black' }} 
                          src={`${BASE_URL}/resources/${row.user.avatar}`} />
                        <Link
                          underline="none"
                          component={RouterLink}
                          to={`${row.id}`}>
                          <Typography variant="button">{row.name}</Typography>
                        </Link>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {
                        row.lastMessage.user && (
                          <>
                            <Stack direction={'row'} spacing={1}>
                              <Box>{row.lastMessage.date}</Box>
                              <Box sx={{ color: 'darkgrey' }}>
                                {row.lastMessage.time?.slice(0, 5)}
                              </Box>
                            </Stack>
                            от <Link>{row.lastMessage.user}</Link>
                          </>
                        ) || 'Нет сообщений'
                      }
                    </TableCell>
                    <TableCell align="right">{row.messagesNumber}</TableCell>
                    <TableCell align="right">{row.likes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </>
  )
}
