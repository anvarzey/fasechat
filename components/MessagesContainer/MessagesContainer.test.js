import MessagesContainer from './index'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Message from '../Message'
import React from 'react'

const fakeMessages = [
  {
    key: 1,
    avatar: 'https://randomuser.me/api/portraits/men/20.jpg',
    image: 'https://randomuser.me/api/portraits/women/80.jpg',
    message: 'Test message number 1',
    username: 'example1'
  },
  {
    key: 2,
    avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
    image: 'https://randomuser.me/api/portraits/women/60.jpg',
    message: 'Test message number 2',
    username: 'example2'
  },
  {
    key: 3,
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    message: 'Test message number 3',
    username: 'example3'
  },
  {
    key: 4,
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    message: 'Test message number 4',
    username: 'example4'
  }
]

const fakeProps = {
  handleRefresh: jest.fn(),
  refresh: false,
  setModal: jest.fn()
}

jest.mock('../../hooks/useMessages', () => (
  jest.fn(() => ({
    disabled: true,
    messages: fakeMessages,
    incrementByTen: jest.fn()
  }))))

jest.mock('../Message/index', () => jest.fn())

describe('list of messages are provided', () => {
  beforeEach(() => {
    render(<MessagesContainer handleRefresh={fakeProps.handleRefresh} refresh={fakeProps.refresh} setModal={fakeProps.setModal} />)
  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  test('message component is called with each received message', () => {
    expect(Message).toHaveBeenCalledTimes(fakeMessages.length)
  })

  test('pepin', () => {
    expect(Message).toHaveBeenCalledTimes(fakeMessages.length)

    const loadMoreBtn = screen.getByText(/load more messages/i)
    expect(loadMoreBtn).toBeDisabled()
  })
})

test('refresh is received as true, it should call scroller and handleRefresh functions', async () => {
  fakeProps.refresh = true

  window.HTMLElement.prototype.scroll = jest.fn()

  render(<MessagesContainer handleRefresh={fakeProps.handleRefresh} refresh={fakeProps.refresh} setModal={fakeProps.setModal} />)

  await waitFor(() => expect(fakeProps.handleRefresh).toBeCalledTimes(1))
})
