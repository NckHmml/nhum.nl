import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import BackgroundComponent from "~/components/background";
import Footer from "~/components/footer";
import Navigation from "~/components/navigation";

import { Concepts, ConceptsBots, ConceptsIndex, ConceptsPassword, ConceptsSearch } from "~/pages/concepts";
import Home from "~/pages/home";
import Kana from "~/pages/kana";
import KanaTest from "~/pages/kanaTest";
import Sudoku from "~/pages/sudoku";

let pathname: string;

const App: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    // Custom pageviews as the hashrouter doesn't seem to work properly by default
    if (pathname === location.pathname) return;
    pathname = location.pathname;
    umami?.track((props) => ({ ...props, url: pathname }));
  }, [location]);

  return (
    <>
      <BackgroundComponent />
      <Navigation />

      <div className="route-root">
        <style jsx>{`
          .route-root {
            margin: 0 20px;
            z-index: 1;
            box-sizing: border-box;
            animation: content-opacity 3s;
            animation-timing-function: ease-in;
            display: flex;
            align-items: center;
          }

          @keyframes content-opacity {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
        <div className="content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/concepts/:path?" element={<Concepts />}>
              <Route index element={<ConceptsIndex />} />
              <Route path="bots" element={<ConceptsBots />} />
              <Route path="search" element={<ConceptsSearch />} />
              <Route path="password" element={<ConceptsPassword />} />
            </Route>
            <Route path="/sudoku" element={<Sudoku />} />
            <Route path="/kana" element={<Kana />} />
            <Route path="/kana/test" element={<KanaTest />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default App;
