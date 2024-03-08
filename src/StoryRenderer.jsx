import React, { useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";

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

  useEffect(() => {
    audioRefs.current.forEach((audio) => {
      audio.play();
    });
  }, []);

  return (
    <HTMLFlipBook width={300} height={500}>
      {props.story.map((panel, index) => (
        <Page key={index} number={index + 1}>
          <center>
            <img
              src={panel.img || ""}
              alt={`Panel ${index + 1}`}
              style={{ width: "400px", height: "400px" }}
            />
            <br />
            <audio ref={(ref) => (audioRefs.current[index] = ref)} controls autoPlay>
              <source src={panel.audio} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <p>{panel.dialogue}</p>
          </center>
        </Page>
      ))}
    </HTMLFlipBook>
  );
}
