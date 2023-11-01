import { waitFor, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioBox from "./RadioBox";
import "@testing-library/jest-dom";

test("renders RadioBox component with options", async () => {
  const Types = [
    { name: "fighting", url: "https://pokeapi.co/api/v2/type/2/" },
    { name: "dark", url: "https://pokeapi.co/api/v2/type/17/" },
  ];

  const setSelected = jest.fn();

  render(
    <RadioBox Types={Types} selected={Types[0]} setSelected={setSelected} />
  );

  const type1Option = screen.getByText("fighting");
  const type2Option = screen.getByText("dark");

  expect(type1Option).toBeInTheDocument();
  expect(type2Option).toBeInTheDocument();

  const radioButtons = screen.getAllByRole("radio");
  userEvent.click(radioButtons[1]);

  await waitFor(() => {
    expect(setSelected).toHaveBeenCalledWith(Types[1]);
  });
});
