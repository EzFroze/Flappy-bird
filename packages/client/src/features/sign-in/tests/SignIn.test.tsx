import { SignIn } from '../components/SignIn'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import { store } from '../../../app/store/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

describe('SignIn tests', () => {
  let signIn: RenderResult

  global.fetch = jest.fn((url, options) => {
    return Promise.resolve({
      status: 401,
      statusText: 'Bad Request',
      json: () => {
        return {
          reason: 'Login or password is incorrect',
        }
      },
      body: {
        reason: 'Login or password is incorrect',
      },
    })
  }) as jest.MockedFunction<any>

  beforeEach(async () => {
    await act(async () => {
      signIn = render(
        <BrowserRouter>
          <Provider store={store}>
            <SignIn />
          </Provider>
        </BrowserRouter>
      )
    })
  })

  test('SignIn validation is work', async () => {
    await act(async () => {
      fireEvent.change(signIn.getByLabelText(/Введите логин/i), {
        target: { value: '12345' },
      })
      fireEvent.change(signIn.getByLabelText(/Введите пароль/i), {
        target: { value: '123456' },
      })
    })
    expect(signIn.getAllByText(/Значение введено неверно/i)).toHaveLength(2)
  })

  test('serverError is work', async () => {
    await act(async () => {
      fireEvent.change(signIn.getByLabelText(/Введите логин/i), {
        target: { value: 'Admin' },
      })
      fireEvent.change(signIn.getByLabelText(/Введите пароль/i), {
        target: { value: '1234567AS' },
      })
      fireEvent.click(signIn.getByText(/Войти/i))
    })
    expect(
      signIn.getByText('⚠ Login or password is incorrect')
    ).toBeInTheDocument()
  })
})
