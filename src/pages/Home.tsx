import { useEffect } from "react";
import Hero from "../components/Home/sections/Hero";
import List from "../components/Home/sections/List";

const Home = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        if ("scrollBehavior" in document.documentElement.style) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          element.scrollIntoView();
        }
      }
    }
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Hero />
      <List />
    </div>
  );
};

export default Home;
