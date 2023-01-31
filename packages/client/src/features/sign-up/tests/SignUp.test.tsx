import { SignUp } from '../components/SignUp'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import { store } from '../../../app/store/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

describe('SignUp tests', () => {
  let signUp: RenderResult

  global.fetch = jest.fn((url, options) => {
    return Promise.resolve({
      status: 401,
      statusText: 'Bad Request',
      json: () => {
        return {
          reason: 'email is not valid',
        }
      },
      body: {
        reason: 'email is not valid',
      },
    })
  }) as jest.MockedFunction<any>

  beforeEach(async () => {
    await act(async () => {
      signUp = render(
        <BrowserRouter>
          <Provider store={store}>
            <SignUp />
          </Provider>
        </BrowserRouter>
      )
    })
  })

  test('SignUp validation is work', async () => {
    await act(async () => {
      fireEvent.change(signUp.getByLabelText(/Введите Email/i), {
        target: { value: 'Admin' },
      })
      fireEvent.change(signUp.getByLabelText(/Введите Имя/i), {
        target: { value: '145623' },
      })
      fireEvent.change(signUp.getByLabelText(/Введите Фамилию/i), {
        target: { value: '1234566' },
      })
      fireEvent.change(signUp.getByLabelText(/Введите логин/i), {
        target: { value: '12345' },
      })
      fireEvent.change(signUp.getByLabelText(/Введите телефон/i), {
        target: { value: 'gcggkhih;j' },
      })
      fireEvent.change(signUp.getByLabelText(/Введите пароль/i), {
        target: { value: '123456' },
      })
      fireEvent.change(signUp.getByLabelText(/Повторите Пароль/i), {
        target: { value: '1234567AS' },
      })
    })
    expect(signUp.getAllByText(/Значение введено неверно/i)).toHaveLength(6)
    expect(signUp.getAllByText(/Пароли не совпадают/i)).toHaveLength(1)
  })

  test('serverError is work', async () => {
    await act(async () => {
      fireEvent.change(signUp.getByLabelText(/Введите Email/i), {
        target: { value: 'Admin@yandex.ru' },
      })
      fireEvent.change(signUp.getByLabelText(/Введите Имя/i), {
        target: { value: 'Иван' },
      })
      fireEvent.change(signUp.getByLabelText(/Введите Фамилию/i), {
        target: { value: 'Иванов' },
      })
      fireEvent.change(signUp.getByLabelText(/Введите логин/i), {
        target: { value: 'Admin' },
      })
      fireEvent.change(signUp.getByLabelText(/Введите телефон/i), {
        target: { value: '89175464815' },
      })
      fireEvent.change(signUp.getByLabelText(/Введите пароль/i), {
        target: { value: '1234567AS' },
      })
      fireEvent.change(signUp.getByLabelText(/Повторите Пароль/i), {
        target: { value: '1234567AS' },
      })
      fireEvent.click(signUp.getByText(/Создать аккаунт/i))
    })
    expect(signUp.getByText('⚠ email is not valid')).toBeInTheDocument()
  })
})
