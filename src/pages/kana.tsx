import I18N from "~/components/i18n";
import KanaField from "~/components/kanaField";

const Kana: React.FC = () => (
  <>
    <h1><I18N>kana.title</I18N></h1>
    <p><I18N>kana.description</I18N></p>
    <h2><I18N>kana.instructions.title</I18N></h2>
    <p><I18N>kana.instructions.0</I18N></p>
    <ul>
      <li><I18N>kana.instructions.1</I18N></li>
      <li><I18N>kana.instructions.2</I18N></li>
      <li><I18N>kana.instructions.3</I18N></li>
    </ul>
    <p><I18N>kana.instructions.4</I18N></p>
    <KanaField />
  </>
);

export default Kana;