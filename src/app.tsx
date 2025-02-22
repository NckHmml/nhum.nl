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

      <Footer />
    </>
  );
};

export default App;
