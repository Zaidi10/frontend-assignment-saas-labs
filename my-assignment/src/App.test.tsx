import { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import * as services from "./Utils";
import mockData from "./Mocks/index.json";
import { fetchTableData } from "./Utils";
import { FormatedTableResponseItem } from "./Types/Api";

test("Test 1 Check if Api is being Called", () => {
  const mockFetchData = jest
    .spyOn(services, "fetchTableData")
    .mockImplementation(async () => {
      return new Promise((res) => {
        res(mockData);
      });
    });

  render(<App />);

  expect(mockFetchData).toHaveBeenCalled();
});

test("Test 2 Check if Table Headers are being rendered", async () => {
  jest.spyOn(services, "fetchTableData").mockImplementation(async () => {
    return new Promise((res) => {
      res(mockData as FormatedTableResponseItem[]);
    });
  });
  render(<App />);
  await act(async () => {
    await fetchTableData(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    );
  });

  expect(screen.getByText(/S.No./i)).toBeInTheDocument();
  expect(screen.getByText(/Percentage funded/i)).toBeInTheDocument();
  expect(screen.getByText(/Amount pledged/i)).toBeInTheDocument();
});

test("Test 3 Check if Table Data is being Rendered", async () => {
  jest.spyOn(services, "fetchTableData").mockImplementation(async () => {
    return new Promise((res) => {
      res(mockData);
    });
  });
  render(<App />);
  await act(async () => {
    await fetchTableData(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    );
  });

  const trElements = screen.queryAllByRole("row");
  expect(trElements).toHaveLength(6);

  expect(screen.getByText(/186/i)).toBeInTheDocument();
  expect(screen.getByText(/15823/i)).toBeInTheDocument();
});

test("Test 4 Check if Pagination Component is being Rendered or not", async () => {
  jest.spyOn(services, "fetchTableData").mockImplementation(async () => {
    return new Promise((res) => {
      res(mockData);
    });
  });
  render(<App />);
  await act(async () => {
    await fetchTableData(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    );
  });
  expect(screen.getByText(/Previous/i)).toBeInTheDocument();
  expect(screen.getByText(/Next/i)).toBeInTheDocument();
});

test("Test 5 Check if Row Per Page is rendered", async () => {
  jest.spyOn(services, "fetchTableData").mockImplementation(async () => {
    return new Promise((res) => {
      res(mockData);
    });
  });
  render(<App />);
  await act(async () => {
    await fetchTableData(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    );
  });

  expect(screen.getByLabelText("Select an option")).toBeInTheDocument();
  expect(screen.getByText(/Rows per page:/i)).toBeInTheDocument();
});

test("Test 6 Check if Modal is opened after clicking row per page", async () => {
  jest.spyOn(services, "fetchTableData").mockImplementation(async () => {
    return new Promise((res) => {
      res(mockData);
    });
  });
  render(<App />);
  await act(async () => {
    await fetchTableData(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    );
  });

  const button = screen.getByTestId("open-modal");

  expect(screen.queryByRole("menu")).not.toBeInTheDocument();

  fireEvent.click(button);

  expect(screen.getByRole("menu")).toBeInTheDocument();
  expect(screen.getByTestId("option-2")).toBeInTheDocument();
});

test("Test 7 On Next Page Click Api should be called and current page should change", async () => {
  jest.spyOn(services, "fetchTableData").mockImplementation(async () => {
    return new Promise((res) => {
      res(mockData);
    });
  });
  render(<App />);
  await act(async () => {
    await fetchTableData(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    );
  });
  const page1 = screen.getByTestId("page-1");
  const page2 = screen.getByTestId("page-2");
  const page5 = screen.getByTestId("page-5");
  const next = screen.getByTestId("next");
  const previous = screen.getByTestId("page-1");

  expect(page1).toHaveClass("active");
  expect(page2).not.toHaveClass("active");

  fireEvent.click(next);

  expect(page1).not.toHaveClass("active");
  expect(page2).toHaveClass("active");

  fireEvent.click(page5);

  expect(page1).not.toBeInTheDocument();
  expect(page2).not.toBeInTheDocument();
  expect(page5).toHaveClass("active");
});

test("Test 8 On Selecting DropDown No of Rows are chaning", async () => {
  jest.spyOn(services, "fetchTableData").mockImplementation(async () => {
    return new Promise((res) => {
      res(mockData);
    });
  });
  render(<App />);
  await act(async () => {
    await fetchTableData(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    );
  });

  const trElements = screen.queryAllByRole("row");

  expect(trElements).toHaveLength(6);
  const button = screen.getByTestId("open-modal");

  fireEvent.click(button);
  const option5 = screen.getByTestId("option-2");

  expect(screen.getByRole("menu")).toBeInTheDocument();
  expect(option5).toBeInTheDocument();
  fireEvent.click(option5);

  const trElements2 = screen.queryAllByRole("row");
  expect(trElements2).toHaveLength(3);
});
