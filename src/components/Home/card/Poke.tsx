const Poke = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <a href={`/${name}`}>
        <img
          className="w-full h-40 object-contain"
          src={image}
          alt={name}
        />
      </a>
      <div className="px-6 py-4">
        <a href={`/${name}`}>
          <h5 className="text-lg font-semibold text-black capitalize">{name}</h5>
        </a>
      </div>
      <div className="px-6 pb-4 flex justify-center">
        <a
          href={`/${name}`}
          className="text-white bg-[#FF9E9E] hover:bg-white border border-[#FF9E9E] hover:border-[#FF9E9E] focus:ring-2 focus:outline-none focus:ring-[#ffcccc] font-medium rounded-lg text-sm px-4 py-2.5 text-center hover:text-[#FF9E9E]"
        >
          Get Detail
        </a>
      </div>
    </div>
  );
};

export default Poke;
