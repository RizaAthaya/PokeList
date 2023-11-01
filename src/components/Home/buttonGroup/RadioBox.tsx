import { RadioGroup } from "@headlessui/react";

interface Type {
  name: string;
  url: string;
}

interface Props {
  Types: Type[];
  selected: Type;
  setSelected: React.Dispatch<React.SetStateAction<Type>>;
}

export default function RadioBox({ Types, selected, setSelected }: Props) {
  return (
    <div className="w-full px-4 py-2">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {Types.map((type) => (
              <RadioGroup.Option
                key={type.name}
                value={type}
                className={({ active }) =>
                  `${
                    active
                      ? "ring-2 ring-white/60 ring-offset-2 ring-offset-[#FF9E9E]"
                      : "hover:ring-2 hover:ring-white/60 hover:ring-offset-2 hover:ring-offset-[#FF9E9E]"
                  }
                  ${
                    type.name == selected.name
                      ? "bg-[#FF9E9E] text-white"
                      : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {() => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium capitalize ${
                              type.name == selected.name
                                ? "text-white"
                                : "text-gray-900"
                            }`}
                          >
                            {type.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}