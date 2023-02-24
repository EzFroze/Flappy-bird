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
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Outlet as ForumThreadOutlet,
  useLocation,
  useParams,
} from 'react-router-dom'
import { actionPaths, ForumsNames, ForumsNamesRu, Topic } from '../types'
import { Link as RouterLink } from 'react-router-dom'
import { headers } from '../data'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../../app/api/variables'

export const Forum: React.FC = () => {
  const { thread } = useParams()
  const { pathname } = useLocation()
  const [topics, setTopics] = useState<any[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then((res) => res.json())
      .then((res: Topic[]) => {
        const topics = res.map((topic) => {
          return {
            id: topic.id,
            name: topic.title,
            user: {
              name: topic.userId,
              avatar: topic.avatar || 'T'
            },
            lastMessage: {
              user: 'User name',
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
              content: '',
            },
            messagesNumber: 120,
            likes: topic.likes,
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
              })
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
                        <Tooltip
                          title={row.user.name}
                          placement="top-start"
                          arrow>
                          <Avatar sx={{ backgroundColor: 'darkred' }}>
                            {row.user.avatar}
                          </Avatar>
                        </Tooltip>
                        <Link
                          underline="none"
                          component={RouterLink}
                          to={`${row.id}`}>
                          <Typography variant="button">{row.name}</Typography>
                        </Link>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction={'row'} spacing={1}>
                        <Box>{row.lastMessage.date}</Box>
                        <Box sx={{ color: 'darkgrey' }}>
                          {row.lastMessage.time.slice(0, 5)}
                        </Box>
                      </Stack>
                      от <Link>{row.lastMessage.user}</Link>
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
