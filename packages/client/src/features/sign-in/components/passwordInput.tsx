import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Visibility } from '@mui/icons-material'
import { VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Inputs } from '../types'
import { ValidationTextField } from './input'

export const PasswordInput: FC<Inputs> = function ({
  control,
  name,
  rules,
  errors,
  label,
  handleShow,
  handleClick,
  handleMouseDown,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <ValidationTextField
          {...field}
          id={name}
          label={label}
          variant="outlined"
          fullWidth
          margin="normal"
          error={Boolean(errors[name])}
          helperText={errors[name]?.message}
          inputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 16 } }}
          FormHelperTextProps={{ style: { fontSize: 16 } }}
          type={handleShow ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                edge="end">
                {handleShow ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
      )}
    />
  )
}
