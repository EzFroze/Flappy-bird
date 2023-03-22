import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
} from '@mui/material'
import {
  SportsEsports,
  Chat,
  Leaderboard,
  MeetingRoom,
  HowToReg,
} from '@mui/icons-material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { RoutesEnum } from '../../../app/router/types'
import { useStore } from '../../../app/store/hooks'
import { getUser } from '../../../features/profile/services/authSlice'
import { BASE_URL } from '../../../app/api/variables'
import { RouterLinkProps, MyNavLinkProps } from '../types'

const RouterLink: React.FC<RouterLinkProps> = props => {
  const MyNavLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, MyNavLinkProps>(
        (navLinkProps, ref) => {
          const { className: previousClasses, ...rest } = navLinkProps
          const elementClasses = previousClasses?.toString() ?? ''
          return (
            <NavLink
              {...rest}
              ref={ref}
              to={props.to}
              end
              className={({ isActive }) =>
                isActive ? elementClasses + ' Mui-selected' : elementClasses
              }
            />
          )
        }
      ),
    [props.to]
  )
  return (
    <ListItemButton component={MyNavLink}>
      <ListItemIcon
        sx={{
          '.MuiListItemButton-root > &': {
            color: 'primary',
          },
          '.Mui-selected > &': { color: 'orange' },
        }}>
        {props.icon}
      </ListItemIcon>

      <ListItemText
        sx={{
          '.Mui-selected > &': { textDecoration: 'underline' },
        }}>
        <Typography color="primary">{props.text}</Typography>
      </ListItemText>
    </ListItemButton>
  )
}

export const NavMenu: React.FC = () => {
  const user = useStore(getUser)

  return (
    <List
      sx={{
        display: 'flex',
        '& > .MuiListItemButton-root': {
          color: 'primary',
        },
        '& > .Mui-selected': { color: 'orange' },
      }}>
      <RouterLink to={RoutesEnum.Game} text="Играть" icon={<SportsEsports />} />
      <RouterLink to={RoutesEnum.Forums} text="Форум" icon={<Chat />} />
      <RouterLink
        to={RoutesEnum.Leaderboard}
        text="Таблица лидеров"
        icon={<Leaderboard />}
      />
      {user.data ? (
        <RouterLink
          to={RoutesEnum.Profile}
          text="Профиль"
          icon={<Avatar src={`${BASE_URL}/resources/${user?.data?.avatar}`} />}
        />
      ) : (
        <>
          <RouterLink
            to={RoutesEnum.SignIn}
            text="Войти"
            icon={<MeetingRoom />}
          />
          <RouterLink
            to={RoutesEnum.SignUp}
            text="Зарегистрироваться"
            icon={<HowToReg />}
          />
        </>
      )}
    </List>
  )
}
