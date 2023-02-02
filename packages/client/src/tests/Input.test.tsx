import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../components/input/components/Input'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'
import { validateName } from '../utils/validation'

export const FormForTest: React.FC<any> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        control={control}
        rules={validateName}
        errors={errors}
        label="Введите имя"
      />
      <Button type="submit">Отправить</Button>
    </form>
  )
}

describe('Input component tests', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    render(<FormForTest onSubmit={mockOnSubmit} />)
  })

  test('Form render with input;', () => {
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByLabelText('Введите имя')).toBeInTheDocument()
  })

  test('Should display error when value is empty', async () => {
    fireEvent.submit(screen.getByRole('button'))

    expect(
      await screen.findAllByText('⚠ Поле не может быть пустым')
    ).toHaveLength(1)
    expect(mockOnSubmit).not.toBeCalled()
  })

  test('Should display error when value is invalid', async () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '123456' },
    })
    fireEvent.submit(screen.getByRole('button'))

    expect(
      await screen.findAllByText('⚠ Значение введено неверно')
    ).toHaveLength(1)
    expect(mockOnSubmit).not.toBeCalled()
  })

  test('Should display error when value length is invalid', async () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Ив' },
    })
    fireEvent.submit(screen.getByRole('button'))

    expect(
      await screen.findAllByText('⚠ Значение меньше 3 символов')
    ).toHaveLength(1)
    expect(mockOnSubmit).not.toBeCalled()

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'ИванИванИванИванИванИван' },
    })
    fireEvent.submit(screen.getByRole('button'))

    expect(
      await screen.findAllByText('⚠ Значение больше 20 символов')
    ).toHaveLength(1)
    expect(mockOnSubmit).not.toBeCalled()
  })

  test('Call onSubmit function', async () => {
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'Иван' },
      })
      fireEvent.click(screen.getByRole('button'))
    })
    expect(mockOnSubmit).toHaveBeenCalled()
  })
})
