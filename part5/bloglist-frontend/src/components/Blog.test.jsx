import { describe, expect } from "vitest";
import Blog from "./Blog";
import { render, screen } from "@testing-library/react";

describe('Test Blog component', () => {
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