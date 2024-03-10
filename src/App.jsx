import React, { useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Button,
  TextField,
  Container,
  Typography,
  Box,
} from "@mui/material";
import StoryRenderer from "./StoryRenderer.jsx";
import { story, title } from "./story.js";

function App() {
  const [prompt, setPrompt] = useState(
    "An astronaut alone in the vast universe"
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

  const wait = (seconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  };

  const generate = async () => {
    if (generating) {
      return;
    }

    if (!prompt || !character || !genre || !style || !tone || !themes) {
      return;
    }

    setGenerating(true);
    await wait(2);
    const newStory = [title, ...story];
    setResponse(newStory);
    setGenerating(false);
    /*
    const body = {
      prompt,
      character,
      genre,
      style,
      tone,
      themes: themes.split(","),
    };
    try {
      const resp = await axios.post("http://127.0.0.1:3000/generate", body, {
        timeout: 6000000000,
      });
      const newStory = [title, ...resp.data];
      setResponse(newStory);
    } catch (error) {
      console.error("Error occurred during request:", error);
    } finally {
      setGenerating(false);
    }*/
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box sx={{ width: "100%" }}>
          {response ? (
            <Box>
              <StoryRenderer story={response} />
              <Button variant="contained" onClick={clear} sx={{ marginTop: 2 }}>
                Clear
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="h4" gutterBottom>
                Cartoon Generator
              </Typography>
              <TextField
                label="Prompt"
                variant="outlined"
                fullWidth
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Character Name"
                variant="outlined"
                fullWidth
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Genre"
                variant="outlined"
                fullWidth
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Style"
                variant="outlined"
                fullWidth
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Tone"
                variant="outlined"
                fullWidth
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Themes (comma-separated)"
                variant="outlined"
                fullWidth
                value={themes}
                onChange={(e) => setThemes(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                onClick={generate}
                disabled={generating}
              >
                {generating ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Generate"
                )}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default App;
