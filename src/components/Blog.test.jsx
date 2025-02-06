/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {

  test('only renders title and author by default', () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'http://blog.com',
      likes: 10,
      user: { name: 'user name' }
    }
    render(<Blog blog={blog} />)

    const element = screen.getByText('blog title blog author')

    expect(element).toBeDefined()
    expect(element.children.length).toBe(1)
  })

  test('renders all when button is clicked', async () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'http://blog.com',
      likes: 10,
      user: { name: 'user name' }
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const defaults = screen.getByText('blog title blog author')
    const url = screen.getByText('http://blog.com')
    const likes = screen.getByText('likes 10')
    const userName = screen.getByText('user name')

    expect(defaults).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
    expect(userName).toBeDefined()
  })

  test('renders all when button is clicked', async () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'http://blog.com',
      likes: 10,
      user: { name: 'user name' }
    }

    const likeEventHandler = vi.fn()

    render(<Blog blog={blog} addALike={likeEventHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeEventHandler.mock.calls).toHaveLength(2)
  })

})