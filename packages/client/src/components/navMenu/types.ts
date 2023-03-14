import React, { ReactNode } from 'react'
import { NavLinkProps } from 'react-router-dom'
import { RoutesEnum } from '../../app/router/types'

export type RouterLinkProps = React.PropsWithChildren<{
  to: RoutesEnum
  text: string
  icon?: ReactNode
}>

export type MyNavLinkProps = Omit<NavLinkProps, 'to'>
