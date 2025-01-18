import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Sudoku from "./pages/sudoku";
import Kana from "./pages/kana";
import KanaTest from "./pages/kanaTest";
import Navigation from "./components/navigation";

const App: React.FC = () => {
  return (
    <>
      <Navigation />

      <div className="content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/sudoku" element={<Sudoku />} />
          <Route path="/kana" element={<Kana />} />
          <Route path="/kana/test" element={<KanaTest />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
