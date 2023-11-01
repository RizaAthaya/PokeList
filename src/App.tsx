import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { TypeProvider } from "./components/hooks/useType";

// pages
import LoadingPage from "./pages/LoadingPage";

const HomePage = lazy(() => {
  return new Promise<{ default: React.ComponentType<unknown> }>((res) => {
    setTimeout(() => res(import("./pages/Home")), 1500);
  });
});

const DetailPage = lazy(() => {
  return new Promise<{ default: React.ComponentType<unknown> }>((res) => {
    setTimeout(() => res(import("./pages/Detail")), 1500);
  });
});

const theRoutes = [
  {
    path: "/",
    content: <HomePage />,
  },
  {
    path: "/:poke",
    content: <DetailPage />,
  },
];
function App() {
  return (
    <>
      <TypeProvider>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            {theRoutes.map((item, index) => {
              return (
                <Route
                  key={index}
                  path={item.path}
                  element={item.content}
                ></Route>
              );
            })}
          </Routes>
        </Suspense>
      </TypeProvider>
    </>
  );
}

export default App;
