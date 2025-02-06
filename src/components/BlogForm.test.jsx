/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls event handler with correct details', async () => {

  const eventHandler = await vi.fn()

  render(<BlogForm newBlogSubmission={eventHandler} />)

  const titleTextField = screen.getByPlaceholderText('Homecooking')
  const authorTextField = screen.getByPlaceholderText('John Smith')
  const urlTextField = screen.getByPlaceholderText('http://homecooking.com')
  const createButton = screen.getByText('create')

  const user = userEvent.setup()
  await user.type(titleTextField, 'blog title')
  await user.type(authorTextField, 'blog author')
  await user.type(urlTextField, 'blog url')
  await user.click(createButton)

  expect(eventHandler.mock.calls).toHaveLength(1)
  expect(eventHandler.mock.calls[0][0]).toStrictEqual({
    title: 'blog title',
    author: 'blog author',
    url: 'blog url'
  })
})