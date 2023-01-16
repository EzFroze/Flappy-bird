import React from 'react'
import { Link } from 'react-router-dom'
import style from './NotFound.module.css'
import { NotFoundTypes } from '../types'

export const NotFound: React.FC<NotFoundTypes> = ({
  title,
  description,
  link,
  linkText,
}) => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>{title}</h1>
      <p className={style.description}>{description}</p>
      <Link to={link} className={style.link}>
        {linkText}
      </Link>
    </div>
  )
}
