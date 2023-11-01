import axios from "axios";
import { useEffect, useState } from "react";
import Poke from "../card/Poke";
import LoadingPage from "../../../pages/LoadingPage";

interface PokemonData {
  name: string;
  image: string;
}

interface PokeGroupProps {
  typeUrl: string;
}

const PokeGroup: React.FC<PokeGroupProps> = ({ typeUrl }: PokeGroupProps) => {
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [curPage, setCurPage] = useState(0);
  const [show, setShow] = useState([false, true]);
  const [maxPoke, setMaxPoke] = useState(0);
  const fetchPokemonByType = async () => {
    try {
      setLoading(true);

      const typeResponse = await axios.get(typeUrl);
      const { pokemon } = typeResponse.data;

      const pokemonPromises = pokemon
        .slice(curPage, 8 + curPage)
        .map(async (poke: { pokemon: { url: string } }) => {
          const pokemonResponse = await axios.get(poke.pokemon.url);
          const { name, sprites } = pokemonResponse.data;
          return { name, image: sprites.front_default };
        });

      const pokemonData = await Promise.all(pokemonPromises);
      setMaxPoke(pokemon.length);
      setPokemonData(pokemonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonByType();
  }, [typeUrl, curPage]);

  if (loading) {
    return <LoadingPage />;
  }

  const handlePrev = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setCurPage(curPage - 8);

    if (curPage - 8 <= 0) {
      setShow([false, show[1]]);
    }

    if (curPage - 8 < maxPoke - 8 && !(curPage - 8 <= 0)) {
      setShow([show[0], true]);
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    setCurPage(curPage + 8);

    if (curPage + 8 >= 8) {
      setShow([true, show[1]]);
    }

    if (curPage + 8 >= maxPoke && !(curPage + 8 >= 8)) {
      setShow([show[0], false]);
    }
  };

  return (
    <div className="py-3 w-full ">
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-5">
        {pokemonData.map((pokemon, index) => (
          <li key={index} className="flex justify-center">
            <Poke name={pokemon.name} image={pokemon.image} />
          </li>
        ))}
      </ul>
      <div className="w-full flex justify-between">
        {show[0] && (
          <div
            className="p-3 max-h-[100px] max-w-[100px] hover:scale-75 transform transition-transform"
            onClick={(e) => handlePrev(e)}
          >
            <img src="/images/left.png" />
          </div>
        )}
        {show[1] && (
          <div
            className="p-3 max-h-[100px] max-w-[100px] hover:scale-75 transform transition-transform"
            onClick={(e) => handleNext(e)}
          >
            <img src="/images/right.png" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokeGroup;
