import { useState } from "react";
import generateStory from "./ai.js";
import axios from "axios";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState(
    "An astraunt alone in the vast universe"
  );
  const [character, setCharacter] = useState("John");
  const [genre, setGenre] = useState("Horror");
  const [style, setStyle] = useState("Scary");
  const [tone, setTone] = useState("Serious");
  const [themes, setThemes] = useState("Post Apocalyptic, Terror, Death");
  const [generating, setGenerating] = useState(false);
  const [response, setResponse] = useState(null);

  const clear = () => {
    setResponse(null);
  };

  const generate = async () => {
    if (generating) {
      return;
    }

    if (!prompt || !character || !genre || !style || !tone || !themes) {
      return;
    }

    setGenerating(true);
    const body = {
      prompt,
      character,
      genre,
      style,
      tone,
      themes: themes.split(","),
    };
    const resp = await generateStory(prompt, character, {
      genre,
      style,
      tone,
      themes: themes.split(","),
    });
    console.log(resp);
    setResponse(resp);
    setGenerating(false);
  };

  const renderInputs = () => {
    return (
      <div>
        <h1>Cartoon Generator</h1>
        <label htmlFor="prompt">Prompt: </label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="character">Character Name: </label>
        <input
          type="text"
          id="character"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="genre">Genre: </label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="style">Style: </label>
        <input
          type="text"
          id="style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="tone">Tone: </label>
        <input
          type="text"
          id="tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="themes">Themes (comma-separated): </label>
        <input
          type="text"
          id="themes"
          value={themes}
          onChange={(e) => setThemes(e.target.value)}
        />
        <br />
        <br />

        <button onClick={generate} disabled={generating}>
          Generate
        </button>
      </div>
    );
  };

  const renderResponse = () => {
    return (
      <div>
        <h1>Generated Panels</h1>
        {response.map((panel, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h3>Panel {index + 1}</h3>
            <p>Line: {panel.dialogue}</p>
            <img
              src={panel.img}
              alt={`Panel ${index + 1}`}
              style={{ width: "400px", height: "400px" }}
            />
          </div>
        ))}
        <br />
        <br />
        <button onClick={clear}>Clear</button>
      </div>
    );
  };

  return <>{response ? renderResponse() : renderInputs()}</>;
}

export default App;
