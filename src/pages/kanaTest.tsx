import { useNavigate } from "react-router";

import I18N from "~/components/i18n";
import KanaTestField from "~/components/kanaTestField";

const KanaTest: React.FC = () => {
  const navigate = useNavigate();

  const onCancel = () => {
    navigate("/kana");
    umami?.track("kana.cancel");
  };

  return (
    <>
      <style jsx>{`
        button {
          display: block;
          margin: 0 auto;
        }
      `}</style>
      <h1><I18N>kana.title</I18N></h1>
      <KanaTestField />
      <button className="pure-button button-secondary" onClick={onCancel}><I18N>kana.cancel</I18N></button>
    </>
  );
};

export default KanaTest;