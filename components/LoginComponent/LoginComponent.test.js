import LoginComponent from './index'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

let fakeUser = null
const fakeLogin = jest.fn()

jest.mock('../../context/AuthContext', () => ({
  useUser: () => ({ handleLogin: fakeLogin, user: fakeUser })
}))

describe('user is null', () => {
  beforeEach(() => {
    render(<LoginComponent />)
  })

  test('it should display the login button', () => {
    screen.getByRole('button', { name: /Sign in with Google/i })
  })

  test('on clicking sign in button, handleLogin should be called', () => {
    const loginBtn = screen.getByRole('button', { name: /Sign in with Google/i })
    fireEvent.click(loginBtn)
    expect(fakeLogin).toHaveBeenCalledTimes(1)
  })
})

test('when user is undefined, it should not display the login button', () => {
  fakeUser = { username: 'example' }
  render(<LoginComponent />)
  expect(screen.queryByRole('button', { name: /Sign in with Google/i })).not.toBeInTheDocument()
  screen.getByText(/Fasechat/i)
})

test('when user is logged, it should not display the login button', () => {
  fakeUser = { username: 'example' }
  render(<LoginComponent />)
  expect(screen.queryByRole('button', { name: /Sign in with Google/i })).not.toBeInTheDocument()
  screen.getByText(/Fasechat/i)
})
