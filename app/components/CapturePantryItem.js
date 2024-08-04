import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const CaptureImage = () => {
  const webcamRef = useRef(null);
  const [showError, setShowError] = useState(false);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64Image = imageSrc.split(",")[1]; // Get base64 string

    // Send image to your API
    const response = await fetch("/api/classify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64Image }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get the response body as text
      console.error(
        "Error fetching classification:",
        response.status,
        errorText
      );
      return;
    }

    const data = await response.json();
    console.log("Classification Results:", data.labels);
  };

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture and Classify</button>
    </div>
  );
};

export default CaptureImage;
