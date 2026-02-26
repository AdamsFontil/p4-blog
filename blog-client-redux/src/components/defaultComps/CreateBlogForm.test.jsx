import { render, screen } from "@testing-library/react";
import CreateBlogForm from "./CreateBlogForm";
import userEvent from "@testing-library/user-event";

test.only("create blog form has the right values, and calls the handlecreate function once clicked", async () => {
  const mockHandler = vi.fn();
  render(<CreateBlogForm createBlog={mockHandler} />);

  const user = userEvent.setup();

  const titleInput = screen.getByLabelText("title");
  const authorInput = screen.getByLabelText("author");
  const urlInput = screen.getByLabelText("url");

  await user.type(titleInput, "testing react blog form");
  await user.type(authorInput, "vite test");
  await user.type(urlInput, "vitejs.com");

  const createNewBlogBtn = screen.getByText("create");
  await user.click(createNewBlogBtn);
  screen.debug();

  console.log("Mock calls2:", mockHandler.mock.calls);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe("testing react blog form");
});
