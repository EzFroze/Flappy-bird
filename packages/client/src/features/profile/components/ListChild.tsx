import React from 'react'
import { ListItem, ListItemText, Divider, Typography } from '@mui/material'
import { Lists } from '../types'

export const ListChild: React.FC<Lists> = ({
  label,
  name,
  text,
  defaultVal,
  handleChange,
}) => {
  return (
    <>
      <ListItem sx={{ px: '0' }}>
        <ListItemText primary={label} />
        {defaultVal ? (
          <Typography>{defaultVal}</Typography>
        ) : (
          <input
            style={{
              backgroundColor: 'transparent',
              border: 0,
              color: 'white',
              textAlign: 'right',
              fontSize: '1rem',
              height: 33,
            }}
            name={name}
            onChange={handleChange}
            defaultValue={text}
          />
        )}
      </ListItem>
      <Divider color="white" sx={{ mb: '.5rem' }} light />
    </>
  )
}
