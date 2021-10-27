import { setupServer } from "msw/node";
import { DefaultRequestBody, rest } from "msw";
import { Photo } from "../types/photoTypes";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import PhotoList from "./PhotoList";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.post<Photo, Photo>("/api/favorites", (req, res, ctx) => {
    const photo = req.body;
    return res(
      ctx.delay(200),
      ctx.json({ ...photo, isFavorite: !photo.isFavorite })
    );
  }),
  rest.get<DefaultRequestBody, Photo[]>("/api/photos", (req, res, ctx) => {
    const name = req.url.searchParams.get("name") || "Unknown";

    return res(
      ctx.delay(100),
      ctx.json([
        {
          id: 1,
          thumbnail: "/photo1.jpg",
          title: name + ": Mock service worker",
          isFavorite: false,
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
describe("After the application is fully loaded", () => {
  beforeEach(async () => {
    render(<PhotoList />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
  });

  it("Renders the photos", () => {
    expect(
      screen.getByText("Unknown: Mock service worker")
    ).toBeInTheDocument();
  });

  describe("When clicking in 'Refresh' button", () => {
    beforeEach(async () => {
      userEvent.type(screen.getByLabelText("Your Name:"), "Arash");
      await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    });

    it("Renders the newly loaded data", () => {
      expect(
        screen.getByText("Arash: Mock service worker")
      ).toBeInTheDocument();
    });
  });

  describe("When the 'Refresh' button is clicked and the server return an error", () => {
    beforeEach(async () => {
      server.use(
        rest.get<DefaultRequestBody, { message: string }>(
          "/api/photos",
          (req, res, ctx) => {
            return res(
              ctx.status(500),
              ctx.json({ message: "Sorry something happened" })
            );
          }
        )
      );

      userEvent.click(screen.getByText("Refresh"));
      await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    });

    it("Renders the error keeping the old data", () => {
      expect(screen.getByText("Sorry something happened")).toBeInTheDocument();
    });
  });

  describe("When clicking in 'Add to favorites' button chenge the button text", () => {
    beforeEach(async () => {
      userEvent.click(screen.getByRole("button", { name: "Add to favorites" }));
      await waitForElementToBeRemoved(() =>
        screen.getByRole("button", { name: "Add to favorites" })
      );
    });

    it("Renders 'Remove from favorites'", () => {
      expect(
        screen.getByRole("button", { name: "Remove from favorites" })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Add to favorites" })
      ).not.toBeInTheDocument();
    });
  });
});
