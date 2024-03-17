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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fileserverUrl =
  "https://fileserverfairytalechat-33d4dd18703c.herokuapp.com";

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
        `${fileserverUrl}/upload`,
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
      const resp = await axios.post(
        "http://34.16.171.165:3000/generate",
        body,
        {
          timeout: 6000000000,
        }
      );
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
              <br />
              {characterImage && (
                <img src={characterImage} alt="Character" width="100" />
              )}
              <br />
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
      <ToastContainer />
    </Container>
  );
}

export default App;
