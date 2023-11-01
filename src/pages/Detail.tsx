import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { TypeContext } from "../components/hooks/useType";

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  types: { name: string; url: string }[];
  baseStats: { name: string; value: number }[];
  imageUrl: string;
  imageUrl2: string;
}

const Detail = () => {
  const [detailPokemon, setDetailPokemon] = useState<PokemonDetails | null>(
    null
  );
  const { setSelected } = useContext(TypeContext);
  const { poke } = useParams<{ poke: string }>();
  const navigate = useNavigate();

  const fetchPokemonDetails = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${poke}`
      );
      const { name, height, weight, types, stats, sprites } = response.data;

      const baseStats = stats.map(
        (stat: { stat: { name: string }; base_stat: number }) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })
      );
      const typesWithUrl = types.map(
        (type: { type: { name: string; url: string } }) => ({
          name: type.type.name,
          url: type.type.url,
        })
      );

      const imageUrl = sprites.front_default;
      const imageUrl2 = sprites.back_default;

      const pokemonDetails: PokemonDetails = {
        name,
        height,
        weight,
        types: typesWithUrl,
        baseStats,
        imageUrl,
        imageUrl2,
      };

      setDetailPokemon(pokemonDetails);
      console.log(pokemonDetails);
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  return (
    <div className="bg-[url('/images/bg-home.jpg')] bg-cover bg-no-repeat h-auto md:h-screen flex flex-col text-white items-start justify-start w-screen">
      <div className="p-5 w-28 h-28 hover:scale-75 transform transition-transform md:relative fixed">
        <a href="/">
          <img src="/images/back.png" alt="Back" />
        </a>
      </div>
      {detailPokemon ? (
        <div className="w-full flex md:flex-row flex-col px-4 md:px-10 h-full items-start justify-center text-black mx-auto">
          <div className="w-full flex justify-center xl:justify-between py-2 md:py-10 items-center h-full xl:flex-row flex-col ">
            <img
              src={detailPokemon.imageUrl}
              alt={detailPokemon.name}
              className="w-[350px] h-[350px] md:w-[400px] md:h-[400px] rounded-lg xl:shadow-xl mx-auto md:mx-0"
            />
            <img
              src={detailPokemon.imageUrl2}
              alt={detailPokemon.name}
              className="hidden xl:block md:w-[200px] md:h-[200px] xl:w-[400px] xl:h-[400px] rounded-lg shadow-xl"
            />
          </div>
          <div className="w-full xl:w-1/3 bg-white p-4 pt-0 h-[55vh] md:h-full xl:h-[70vh] relative xl:absolute bottom-0 flex flex-col items-center gap-4 justify-center rounded-t-3xl shadow-xl shadow-black">
            <div className="p-5 w-52 h-52 absolute -top-24">
              <img src="/images/pokeball.png" alt="Pokeball" />
            </div>
            <div className="w-full bg-white p-4  pt-10 md:pt-4">
              <h1 className="text-4xl font-bold uppercase mb-5">
                {detailPokemon.name}
              </h1>
              <p className="text-lg">
                Height: {detailPokemon.height} decimetres
              </p>
              <p className="text-lg">
                Weight: {detailPokemon.weight} hectograms
              </p>
              <p className="text-lg my-2 gap-2 flex justify-center cursor-pointer">
                {detailPokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-br from-[#FF9E9E] to-[#FF7E7E] text-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF9E9E]"
                    style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                    onClick={() => {
                      setSelected(type);
                      navigate("/#list");
                    }}
                  >
                    {type.name}
                  </span>
                ))}
              </p>

              <h2 className="mt-4 text-lg font-bold">Base Stats</h2>
              <ul className="mt-2">
                {detailPokemon.baseStats.map((stat, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="uppercase">{stat.name}</span>
                    <span>{stat.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default Detail;
