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
import { actionPaths, ForumsNames, ForumsNamesRu } from '../types'
import { Link as RouterLink } from 'react-router-dom'

const headersMockData = [
  { name: 'Название темы', width: 'auto' },
  { name: 'Последнее сообщение', width: 200 },
  { name: 'Ответов', width: 50 },
  { name: 'Просмотров', width: 50 },
]
const rowsMockData = new Array(10).fill(null).map((_, i) => ({
  name: `Thread ${i}`,
  user: {
    name: 'user name',
    avatar: 'T',
  },
  lastMessage: {
    user: 'User name',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    content: '',
  },
  messagesNumber: 120,
  views: 8001,
}))

export const Forum: React.FC = () => {
  const { forum, thread } = useParams()
  const { pathname } = useLocation()

  const forumName = forum as ForumsNames

  return (
    <>
      {(thread || pathname.includes(actionPaths.createThread)) ? (
        <ForumThreadOutlet />
      ) : (
        <Container>
          <Typography variant="h3">{ForumsNamesRu[forumName]}</Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={3}>
              <Link
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
                <Pagination count={10} />
              </Stack>
            </Grid>
          </Grid>

          <TableContainer sx={{ mt: 2, backgroundColor: 'white' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {headersMockData.map((title, i) => (
                    <TableCell sx={{ width: title.width }} key={i * 1000}>
                      {title.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsMockData.map((row, i) => (
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
                          to={`${i}`}>
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
                    <TableCell align="right">{row.views}</TableCell>
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
