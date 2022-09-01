import Message from './index'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('../../context/AuthContext', () => ({
  useUser: () => ({ user: { username: 'example' } })
}))

describe('was sent by the current user', () => {
  const fakeData = {
    avatar: 'https://randomuser.me/api/portraits/women/60.jpg',
    image: 'https://randomuser.me/api/portraits/men/60.jpg',
    setModal: jest.fn(),
    text: 'Fake message',
    username: 'example'
  }
  test('it should only render the sent image and text message', () => {
    render(<Message avatar={fakeData.avatar} image={fakeData.image} setModal={fakeData.setModal} text={fakeData.text} username={fakeData.username} />)

    expect(screen.queryByText(fakeData.username)).not.toBeInTheDocument()
    expect(screen.queryByAltText(`${fakeData.username}'s avatar`)).not.toBeInTheDocument()
    expect(screen.getByText(fakeData.text)).toBeInTheDocument()
    const imageElement = screen.getByAltText(`image sent by ${fakeData.username}`)
    expect(imageElement).toBeInTheDocument()

    fireEvent.click(imageElement)

    expect(fakeData.setModal).toBeCalledTimes(1)
  })
})

describe('was sent by other user', () => {
  const fakeData = {
    avatar: 'https://randomuser.me/api/portraits/women/60.jpg',
    image: 'https://randomuser.me/api/portraits/men/60.jpg',
    setModal: jest.fn(),
    text: 'Fake message',
    username: 'example2'
  }

  test('should render the sender\'s username and avatar along with the message itself', () => {
    render(<Message avatar={fakeData.avatar} image={fakeData.image} setModal={fakeData.setModal} text={fakeData.text} username={fakeData.username} />)

    expect(screen.getByText(fakeData.username)).toBeInTheDocument()
    expect(screen.getByAltText(`${fakeData.username}'s avatar`)).toBeInTheDocument()
    expect(screen.getByText(fakeData.text)).toBeInTheDocument()
    const imageElement = screen.getByAltText(`image sent by ${fakeData.username}`)
    expect(imageElement).toBeInTheDocument()
    fireEvent.click(imageElement)

    expect(fakeData.setModal).toBeCalledTimes(1)
  })
})
