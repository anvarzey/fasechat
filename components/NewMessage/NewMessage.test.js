import NewMessage from './index'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const fakeHandleRefresh = jest.fn()
const fakeSetModal = jest.fn()
const fakeHandleDelete = jest.fn()
let fakeDisabledBtn = false

const fakeAvatar = 'https://randomuser.me/api/portraits/men/90.jpg'
const fakeUsername = 'example'

const fakeHandleImage = jest.fn()
let fakeImage = null
let fakeMessage = null
const fakeHandleSubmit = jest.fn().mockImplementation((e) => e.preventDefault())

jest.mock('../../hooks/useSendMessage', () => (
  jest.fn(() => ({
    disabledBtn: fakeDisabledBtn,
    handleChange: jest.fn(),
    handleDelete: fakeHandleDelete,
    handleImage: fakeHandleImage,
    handleSubmit: fakeHandleSubmit,
    image: fakeImage,
    message: fakeMessage
  }))
))

jest.mock('../../context/AuthContext', () => ({
  useUser: () => ({
    user: {
      avatar: fakeAvatar,
      username: fakeUsername
    }
  })
}))

jest.mock('react-input-emoji', () => (
  jest.fn(() => <div />)
))

test('it should render correctly and send button should be disabled', () => {
  fakeDisabledBtn = true
  render(<NewMessage handleRefresh={fakeHandleRefresh} setModal={fakeSetModal} />)

  screen.getByAltText(`${fakeUsername}'s avatar`)
  expect(screen.getByRole('button', { name: /send/i })).toBeDisabled()
})

test('it should render correctly', async () => {
  render(<NewMessage handleRefresh={fakeHandleRefresh} setModal={fakeSetModal} />)

  // const labelardo = screen.getByTestId('image-input')
  const labelardo = screen.getByLabelText(/insert image/i, { selector: 'input' })

  expect(labelardo).toBeInTheDocument()

  fireEvent.change(labelardo, {
    target: {
      files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })]
    }
  })

  expect(fakeHandleImage).toBeCalledTimes(1)
})

describe('image is provided', () => {
  beforeEach(() => {
    fakeImage = {
      preview: 'https://randomuser.me/api/portraits/men/49.jpg'
    }

    fakeDisabledBtn = false
    render(<NewMessage handleRefresh={fakeHandleRefresh} setModal={fakeSetModal} />)
  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  test('preview functionality', () => {
    const previewImage = screen.getByAltText(/preview image to send/i)
    expect(previewImage).toBeInTheDocument()
    fireEvent.click(previewImage)
    expect(fakeSetModal).toBeCalledTimes(1)
    const cancelBtn = screen.getByRole('button', { name: 'X' })
    fireEvent.click(cancelBtn)
    expect(fakeHandleDelete).toBeCalledTimes(1)
  })

  test('submit image', () => {
    const previewImage = screen.getByAltText(/preview image to send/i)
    expect(previewImage).toBeInTheDocument()

    const sendBtn = screen.getByRole('button', { name: /send/i })
    expect(sendBtn).toBeEnabled()
    fireEvent.click(sendBtn)

    expect(fakeHandleSubmit).toBeCalledTimes(1)
  })
})

describe('message is provided', () => {
  beforeEach(() => {
    fakeMessage = 'Message for testing'

    fakeDisabledBtn = false
    render(<NewMessage handleRefresh={fakeHandleRefresh} setModal={fakeSetModal} />)
  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  test('is sent', () => {
    const sendBtn = screen.getByRole('button', { name: /send/i })
    expect(sendBtn).toBeEnabled()
    fireEvent.click(sendBtn)

    expect(fakeHandleSubmit).toBeCalledTimes(1)
  })
})
