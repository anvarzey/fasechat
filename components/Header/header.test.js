import Header from './index'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

test('renders the component', () => {
  render(<Header />)

  screen.getByText(/Fasechat Room/i)
})
