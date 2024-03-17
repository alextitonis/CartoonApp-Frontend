import React, { useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import StoryRenderer from "./StoryRenderer.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL, FILESERVER_URL } from "./vars/constants.js";
import getRandomExample from "./vars/examples.js";

function App() {
  const [prompt, setPrompt] = useState("");
  const [character, setCharacter] = useState("");
  const [characterImage, setCharacterImage] = useState("");
  const [genre, setGenre] = useState("");
  const [style, setStyle] = useState("");
  const [tone, setTone] = useState("");
  const [themes, setThemes] = useState("");
  const [generating, setGenerating] = useState(false);
  const [response, setResponse] = useState(null);

  const clear = () => {
    setResponse(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCharacterImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generate = async () => {
    if (generating) {
      toast.error("Please wait for the current request to finish");
      return;
    }

    if (
      !prompt ||
      !character ||
      !genre ||
      !style ||
      !tone ||
      !themes ||
      !characterImage
    ) {
      toast.error("Please fill in all fields and upload an image");
      return;
    }

    setGenerating(true);
    try {
      const imageUrl = await axios.post(
        `${FILESERVER_URL}/upload`,
        {
          img: characterImage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const url = imageUrl.data.imageUrl;
      console.log(url);
      const body = {
        prompt,
        character,
        characterImage: url,
        genre,
        style,
        tone,
        themes: themes.split(","),
      };
      const resp = await axios.post(`${API_URL}/generate`, body, {
        timeout: 6000000000,
      });
      const title = prompt;
      const newStory = [title, ...resp.data];
      toast.success("Story generated successfully");
      setResponse(newStory);
    } catch (error) {
      console.error("Error occurred during request:", error);
      toast.error("An error occurred during the request");
    } finally {
      setGenerating(false);
    }
  };

  const randomize = () => {
    const example = getRandomExample();
    setPrompt(example.prompt);
    setCharacter(example.character);
    setGenre(example.genre);
    setStyle(example.style);
    setTone(example.tone);
    setThemes(example.themes);
    setCharacterImage(example.image);
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
              <Tooltip title="Enter the prompt for your story">
                <TextField
                  label="Prompt"
                  variant="outlined"
                  fullWidth
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </Tooltip>
              <Tooltip title="Enter the name of your character">
                <TextField
                  label="Character Name"
                  variant="outlined"
                  fullWidth
                  value={character}
                  onChange={(e) => setCharacter(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </Tooltip>
              <Tooltip title="Upload an image for your character">
                <div>
                  <input
                    accept="image/png, image/jpeg"
                    id="character-image"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="character-image">
                    <Button variant="contained" component="span">
                      Upload Character Image
                    </Button>
                  </label>
                </div>
              </Tooltip>
              <br />
              {characterImage && (
                <img src={characterImage} alt="Character" width="100" />
              )}
              <br />
              <Tooltip title="Enter the genre of your story">
                <TextField
                  label="Genre"
                  variant="outlined"
                  fullWidth
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </Tooltip>
              <Tooltip title="Enter the style of your story">
                <TextField
                  label="Style"
                  variant="outlined"
                  fullWidth
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </Tooltip>
              <Tooltip title="Enter the tone of your story">
                <TextField
                  label="Tone"
                  variant="outlined"
                  fullWidth
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </Tooltip>
              <Tooltip title="Enter the themes of your story (comma-separated)">
                <TextField
                  label="Themes"
                  variant="outlined"
                  fullWidth
                  value={themes}
                  onChange={(e) => setThemes(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </Tooltip>
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
              <Tooltip title="Get some interesting inputs">
                <Button
                  variant="contained"
                  onClick={randomize}
                  disabled={generating}
                >
                  {generating ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Magic"
                  )}
                </Button>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default App;
