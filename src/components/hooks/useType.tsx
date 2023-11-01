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

export const TypeContext = createContext<valueProvider>({
  selected: {
    name: "",
    url: "",
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

  return (
    <TypeContext.Provider
      value={{ selected, setSelected }}
    >
      {children}
    </TypeContext.Provider>
  );
};
