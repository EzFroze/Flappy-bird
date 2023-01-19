import React from 'react'
import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import { Inputs } from '../types'

export const Input: React.FC<Inputs> = ({
  control,
  name,
  rules,
  errors,
  label,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
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
        />
      )}
    />
  )
}
