import BouncingArrow from "../animation/BouncingArrow";

const Hero = () => {
  return (
    <div className="bg-[url('/images/bg-home.jpg')] bg-cover bg-no-repeat h-screen max-w-full flex flex-row-reverse items-center justify-between relative w-full">
      <img src="/images/Poke.png" className="w-1/2 xl:w-1/4 ml-6" />
      <div className="flex flex-col gap-2 text-left px-4 md:pl-12 text-white absolute md:relative">
        <h2 className="text-xl md:text-4xl font-semibold">WELCOME TO</h2>
        <h1 className="text-5xl md:text-7xl font-bold">POCKET MONSTER DEX</h1>
        <h3 className="text-lg md:text-2xl font-light">Get your favorite poke info!</h3>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center items-center w-full flex-col gap-3">
        <BouncingArrow />
      </div>
    </div>
  );
};

export default Hero;
