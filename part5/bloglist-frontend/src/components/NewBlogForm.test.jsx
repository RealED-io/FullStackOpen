import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NewBlogForm from "./NewBlogForm"

describe('NewBlogForm component tests', () => {
    const blog = {
        title: 'Fake Title',
        author: 'Fake Author',
        url: 'Fake URL',
    }

    test('call eventHandler on creation of new blog', async () => {
        const mockHandler = vi.fn()
        const user = userEvent.setup()

        render(<NewBlogForm onCreate={mockHandler} />)

        const inputTitle = screen.getByPlaceholderText('The Title')
        const inputAuthor = screen.getByPlaceholderText('John Doe')
        const inputUrl = screen.getByPlaceholderText('www.books.com')
        const submitBtn = screen.getByTestId('createBtn')

        await user.type(inputTitle, blog.title)
        await user.type(inputAuthor, blog.author)
        await user.type(inputUrl, blog.url)
        await user.click(submitBtn)

        expect(mockHandler.mock.calls).toHaveLength(1)
    })

    test('passed blog info is correct', async () => {
        const mockHandler = vi.fn()
        const user = userEvent.setup()

        render(<NewBlogForm onCreate={mockHandler} />)

        const inputTitle = screen.getByPlaceholderText('The Title')
        const inputAuthor = screen.getByPlaceholderText('John Doe')
        const inputUrl = screen.getByPlaceholderText('www.books.com')
        const submitBtn = screen.getByTestId('createBtn')

        await user.type(inputTitle, blog.title)
        await user.type(inputAuthor, blog.author)
        await user.type(inputUrl, blog.url)
        await user.click(submitBtn)

        expect(mockHandler.mock.calls[0][0].title).toBe(blog.title)
        expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
        expect(mockHandler.mock.calls[0][0].url).toBe(blog.url)
    })
})