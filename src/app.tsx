import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Sudoku from "./pages/sudoku";
import Kana from "./pages/kana";
import KanaTest from "./pages/kanaTest";
import { Concepts, ConceptsBots, ConceptsIndex, ConceptsPassword, ConceptsSearch } from "./pages/concepts";

import Navigation from "./components/navigation";
import Footer from "./components/footer";
import BackgroundComponent from "./components/background";

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
