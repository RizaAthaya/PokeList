import { Transition } from '@headlessui/react';

const LoadingPage = () => {
  return (
    <Transition
      show={true}
      as="div"
      className="fixed inset-0 flex items-center justify-center bg-[url('/images/bg-home.jpg')] bg-cover bg-no-repeat"
    >
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-rose-600"></div>
    </Transition>
  );
};

export default LoadingPage;
