import React, { createContext, useState } from "react";

type ChildProviderProps = {
  children: React.ReactNode;
};

type Selected = {
  name: string;
  url: string;
};

type valueProvider = {
  selected: Selected;
  setSelected: React.Dispatch<React.SetStateAction<Selected>>;
};

// Context Competition
export const TypeContext = createContext<valueProvider>({
  selected: {
    name: "normal",
    url: "https://pokeapi.co/api/v2/type/1",
  },
  setSelected: () => {},
});

export const TypeProvider: React.FC<ChildProviderProps> = ({
  children,
}: ChildProviderProps) => {
  const [selected, setSelected] = useState<Selected>({
    name: "normal",
    url: "https://pokeapi.co/api/v2/type/1",
  });

  console.log(selected);
  return (
    <TypeContext.Provider
      value={{ selected: selected, setSelected: setSelected }}
    >
      {children}
    </TypeContext.Provider>
  );
};
