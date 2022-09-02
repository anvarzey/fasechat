import Header from './index'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('../../context/AuthContext', () => ({
  useUser: () => ({
    handleLogout: jest.fn(),
    user: { username: 'example' }
  })
}
))

test('renders the component', () => {
  render(<Header />)

  screen.getByText(/Fasechat Room/i)
})
