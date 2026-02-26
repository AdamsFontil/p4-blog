import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "one more time",
  author: "hellas",
  url: "onemoretime.com",
  likes: 0,
  user: {
    username: "hellas",
    name: "arto hellas",
  },
};

test("renders blog with author and title", () => {
  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent(blog.title);
  expect(div).toHaveTextContent(blog.author);
  expect(div).not.toHaveTextContent(blog.url);
  screen.debug(div);
  expect(div).toBeDefined();
});

test("clicking on view reveals url and likes", async () => {
  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent(blog.title);
  expect(div).toHaveTextContent(blog.author);
  expect(div).toHaveTextContent(blog.url);
  expect(div).toHaveTextContent(blog.likes);
  screen.debug(div);
  expect(div).toBeDefined();
});

test("clicking like twice change mock.calls length", async () => {
  const mockHandler = vi.fn();
  render(<Blog blog={blog} handleLike={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const likeBtn = screen.getByText("like");
  await user.click(likeBtn);
  await user.click(likeBtn);

  expect(mockHandler.mock.calls).toHaveLength(2);
  screen.debug();
  console.log("Mock calls:", mockHandler.mock.calls);
});
