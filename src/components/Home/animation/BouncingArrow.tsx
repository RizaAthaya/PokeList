import { Disclosure } from "@headlessui/react";

const BouncingArrow = () => {
  return (
    <div className="arrow animate-bounce">
      <Disclosure>
        {({ open }) => (
          <div className="arrow-icon text-xl md:text-2xl">
            <h5>Scroll down</h5>
            {open ? <span>&#9650;</span> : <span>&#9660;</span>}
          </div>
        )}
      </Disclosure>
    </div>
  );
};

export default BouncingArrow;
