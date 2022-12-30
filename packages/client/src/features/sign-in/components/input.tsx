import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { TextField, styled } from '@mui/material'
import { Inputs } from '../types'

export const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset ': {
    borderColor: '#86868b',
    borderWidth: 3,
    borderRadius: '10px',
  },
  '& input:invalid + fieldset + label.Mui-focused': {
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: '10px',
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important',
  },

  '& label': {
    color: '#f8a488',
    fontWidth: 'bold',
  },
  '& .MuiOutlinedInput-root fieldset': {
    borderColor: '#86868b',
    borderWidth: 3,
    borderRadius: '10px',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important',
    },
  },

  '& .MuiButtonBase-root': {
    color: '#2a2f3f',
  },
})

export const Input: FC<Inputs> = function ({
  control,
  name,
  rules,
  errors,
  label,
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
        />
      )}
    />
  )
}
