import axios from "axios";
import RadioBox from "../buttonGroup/RadioBox";
import { useContext, useEffect, useState } from "react";
import PokeGroup from "../cardGroup/PokeGroup";
import { TypeContext } from "../../hooks/useType";

const List = () => {
  const { selected, setSelected } = useContext(TypeContext);
  const [Types, setTypes] = useState([]);
  const [Loading, setLoading] = useState(false);

  const fetchTypes = async () => {
    const typesUrl = "https://pokeapi.co/api/v2/type/";

    try {
      const response = await axios.get(typesUrl);
      const types = response.data.results;

      const typeData = types.map((type: { name: string; url: string }) => ({
        name: type.name,
        url: type.url,
      }));

      setTypes(typeData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching types:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchTypes();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [selected]);

  return (
    <>
      <div
        id="list"
        className="bg-[url('/images/bg-home2.png')] bg-cover bg-no-repeat bg-right xl:bg-top w-full min-h-screen pb-20 pt-2 flex flex-col gap-5 w-full"
      >
        <div className="px-4 md:px-8">
          <h2 className="text-white text-center text-2xl md:text-3xl font-bold py-4">
            Explore Pokémon Types
          </h2>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="grid grid-cols-12 gap-4 w-full px-4">
            <div className="col-span-12 md:col-span-4 xl:col-span-2 col max-h-[20vh] md:max-h-full xl:max-h-[80vh] overflow-y-auto mt-3">
              <RadioBox
                Types={Types}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            {Loading ? (
              <div className="h-screen w-[80vw] flex justify-center items-center mx-auto">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-rose-600 mx-auto"></div>
              </div>
            ) : (
              <div className="col-span-12 md:col-span-8 xl:col-span-10 col">
                <PokeGroup typeUrl={selected.url} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
