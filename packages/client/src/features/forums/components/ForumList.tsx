import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Container, Link, ListItemButton } from '@mui/material'
import {
  Link as RouterLink,
  Outlet as ForumOutlet,
  useParams,
} from 'react-router-dom'
import { forumThemes, titles } from '../data'

const titlesStyles = {
  elevation: 0,
  sx: {
    px: 1,
    py: 2,
  },
}

const topicsDataStyles = {
  elevation: 2,
  sx: {
    p: 3,
    textAlign: 'center',
    backgroundColor: 'rgba(250,250,250,0.0)',
    border: '1px solid white',
  },
}

export const ForumList: React.FC = () => {
  const { forum } = useParams()

  return (
    // TODO: посмотреть почему height 100vh не дотягивает до самого низа
    <>
      {forum ? (
        <ForumOutlet />
      ) : (
        <Container sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {titles.map((title, i) => {
              return (
                <Grid item xs={i === 0 ? 8 : 2} key={i + 100}>
                  <Paper {...titlesStyles}>
                    <Typography variant="h6">{title}</Typography>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
          {forumThemes.map(({ title, link }, i) => {
            return (
              <Grid container spacing={2} sx={{ mt: i === 0 ? 0 : 2 }} key={i}>
                <Grid item xs={8}>
                  <Link
                    color="#000"
                    variant="button"
                    underline="none"
                    component={RouterLink}
                    to={link}>
                    <Paper elevation={2}>
                      <ListItemButton 
                        data-testid={`selected-forum-${i}`} 
                        sx={{ p: 3 }}>
                        {title}
                      </ListItemButton>
                    </Paper>
                  </Link>
                </Grid>
                <Grid item xs={2}>
                  <Paper {...topicsDataStyles}>
                    <Typography>
                      {Math.floor(Math.random() * 10 + 10)}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper {...topicsDataStyles}>
                    <Typography>
                      {Math.floor(Math.random() * 100 + 100)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            )
          })}
        </Container>
      )}
    </>
  )
}
