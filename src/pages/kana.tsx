import KanaField from "../components/kanaField";

const Kana: React.FC = () => (
  <>
    <h1>Kana learning tool</h1>
    <p>During the time I spent living in Japan, I wanted to at least be able to read the basic character sets, called "Hiragana" and "Katakana" respectively.<br />Of course, having a developer mindset, I had to make a tool that does exactly what I would like it do.</p>
    <h2>Instructions</h2>
    <p>This tool works by repeating a selected sets of characters, with the idea that after repeating it enough they will be stored in the long term memory.<br />The following options are available;</p>
    <ul>
      <li>repeat: the number of times to repeat each set in a single session</li>
      <li>font: some fonts make the characters look slightly different</li>
      <li>reverse mode: this will switch the tool from "kana to latin" to "latin to kana"</li>
    </ul>
    <p>Select the characters by clicking the checkbox to their right, after which you can press the button to start.</p>
    <KanaField />
  </>
);

export default Kana;