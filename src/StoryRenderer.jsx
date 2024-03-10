import React, { useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Box } from "@mui/material";

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <p>{props.children}</p>
      <p>Page number: {props.number}</p>
    </div>
  );
});

export default function StoryRenderer(props) {
  const audioRefs = useRef([]);

  const handlePageFlip = (e) => {
    const currentPage = e.data;
    const audioToPlay = audioRefs.current[currentPage];

    if (audioToPlay) {
      audioToPlay.play();
      audioRefs.current.forEach((audio, index) => {
        if (index !== currentPage) {
          audio.pause();
        }
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <HTMLFlipBook width={300} height={500} onFlip={handlePageFlip}>
        {props.story.map((panel, index) => (
          <Page key={index} number={index + 1}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={panel.img || ""}
                alt={`Panel ${index + 1}`}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
              <br />
              {panel.audio && (
                <audio ref={(ref) => (audioRefs.current[index] = ref)} controls>
                  <source src={panel.audio} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              )}
              <p>{panel.dialogue}</p>
            </Box>
          </Page>
        ))}
      </HTMLFlipBook>
    </Box>
  );
}
