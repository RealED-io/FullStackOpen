import { describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { render, screen } from "@testing-library/react";

const blog = {
    "title": "New Blog",
    "author": "New Author",
    "url": "fakeurl.com",
    "likes": 5,
    "user": {
        "username": "abcde",
        "name": "fghij",
        "id": "68255f21ab9e8e328e9700a3"
    },
    "id": "68899c96d2f93893202c0cfc"
}

describe('Blog component initial test', () => {
    test('have blog title', () => {
        const { container } = render(<Blog blog={blog} username={blog.user.username} />)
        expect(container).toHaveTextContent(blog.title)
    })

    test('have author', () => {
        const { container } = render(<Blog blog={blog} username={blog.user.username} />)
        expect(container).toHaveTextContent(blog.author)
    })

    test('does not render URL', () => {
        render(<Blog blog={blog} username={blog.user.username} />)
        const element = screen.queryByText(blog.url)
        expect(element).toBeNull()
    })

    test('does not render likes', () => {
        render(<Blog blog={blog} username={blog.user.username} />)
        const element = screen.queryByText(`likes ${blog.likes}`)
        expect(element).toBeNull()
    })
})

describe('Blog component "show" button test', () => {
    test('shows url when button is clicked', async () => {
        const user = userEvent.setup()
        render(<Blog blog={blog} username={blog.user.username} />)
        const button = screen.getByTestId('showBtn')
        await user.click(button)
        const element = screen.getByText(blog.url)
        expect(element).toBeDefined()
    })

    test('shows likes when button is clicked', async () => {
        const user = userEvent.setup()
        render(<Blog blog={blog} username={blog.user.username} />)
        const button = screen.getByTestId('showBtn')
        await user.click(button)
        const element = screen.getByText(`likes ${blog.likes}`)
        expect(element).toBeDefined()
    })
})

test('calls eventHandler twice when clicked twice', async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn()
    render(<Blog blog={blog} username={blog.user.username} handleLike={mockHandler} />)
    const showButton = screen.getByTestId('showBtn')
    await user.click(showButton)

    const likeButton = screen.getByTestId('likeBtn')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})