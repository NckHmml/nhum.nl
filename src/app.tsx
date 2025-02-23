import { Route, Routes } from "react-router-dom";

import BackgroundComponent from "~/components/background";
import Footer from "~/components/footer";
import Navigation from "~/components/navigation";

import { Concepts, ConceptsBots, ConceptsIndex, ConceptsPassword, ConceptsSearch } from "~/pages/concepts";
import Home from "~/pages/home";
import Kana from "~/pages/kana";
import KanaTest from "~/pages/kanaTest";
import Sudoku from "~/pages/sudoku";

const App: React.FC = () => {
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
