import { useNavigate } from "react-router";
import KanaTestField from "../components/kanaTestField";

const KanaTest: React.FC = () => {
  const navigate = useNavigate();

  const onCancel = () => {
    navigate("/kana");
  };

  return (
    <>
      <style jsx>{`
        button {
          display: block;
          margin: 0 auto;
        }
      `}</style>
      <h1>Kana learning tool</h1>
      <KanaTestField />
      <button className="pure-button button-primary" onClick={onCancel}>Cancel</button>
    </>
  );
};

export default KanaTest;