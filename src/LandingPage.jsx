import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  Slider,
  Paper,
  IconButton,
} from "@mui/material";
import { FaDiscord, FaTwitter } from "react-icons/fa";

// Import images
import user1 from "./users/user1.png";
import user2 from "./users/user2.png";
import user3 from "./users/user3.png";

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [feedbacks] = useState([
    {
      image: user1,
      feedback: "Amazing stories! I can't stop reading.",
      name: "John Doe",
    },
    {
      image: user2,
      feedback: "This platform is revolutionary.",
      name: "Jane Smith",
    },
    {
      image: user3,
      feedback: "Never thought AI could write such compelling stories.",
      name: "Michael Johnson",
    },
  ]);

  const handleEmailSubmit = () => {
    // Handle email submission
    setOpen(false);
    setEmail("");
  };

  return (
    <div>
      {/* Header */}
      <header style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Explore Infinite Stories Today
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Register
        </Button>
        <Button variant="contained" color="primary" href="/app">
          Start Reading
        </Button>
      </header>

      {/* Body */}
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Unleash the Power of AI Storytelling with Neverending Stories
        </Typography>
        <Typography variant="body1" gutterBottom>
          Discover a whole new world of storytelling with Neverending Stories.
          Our AI-powered platform brings your imagination to life, creating
          captivating and immersive stories like never before. Whether you're a
          writer, educator, or just love a good tale, Neverending Stories is
          your gateway to endless enchantment.
        </Typography>
      </div>

      {/* Features section */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h6" gutterBottom>
                Revolutionize Your Storytelling with AI
              </Typography>
              <Typography variant="body1">
                Craft custom stories tailored to your taste and interests.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h6" gutterBottom>
                Interactive Conversational Scripts
              </Typography>
              <Typography variant="body1">
                Engage audiences with immersive dialogues powered by AI
                technology.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h6" gutterBottom>
                AI-Driven Content Generation
              </Typography>
              <Typography variant="body1">
                Generate dynamic content effortlessly with artificial
                intelligence algorithms.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>

      {/* Images section */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
        }}
      >
        {/* Slideshow of feedback */}
        {feedbacks.map((feedback, index) => (
          <div key={index} style={{ margin: "10px", textAlign: "center" }}>
            <img
              src={feedback.image}
              alt={`User ${index + 1}`}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <Typography variant="body1" gutterBottom>
              {feedback.feedback}
            </Typography>
            <Typography variant="subtitle2">{feedback.name}</Typography>
          </div>
        ))}
      </div>

      {/* Revolutionizing storytelling section */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Revolutionizing storytelling through AI technology.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Custom illustrations accompany each story
          <br />
          Choose a narrator or create your own
          <br />
          Unique stories generated on demand
          <br />
          Upload your own character from a photo
        </Typography>
      </div>

      {/* About Us section */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your description about the company goes here...
        </Typography>
      </div>

      {/* Get in Touch section */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Get in Touch
        </Typography>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            label="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleEmailSubmit}
            style={{ marginBottom: "20px" }}
          >
            Submit
          </Button>
        </form>
        <div>
          <IconButton>
            <FaTwitter />
          </IconButton>
          <IconButton>
            <FaDiscord />
          </IconButton>
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <TextField
            label="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEmailSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LandingPage;
