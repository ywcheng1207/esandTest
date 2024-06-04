
import React, { useState, useRef, useEffect } from 'react';


function App() {
  return (
    <div>
      <Camera />
    </div>
  );
}


export default App;

function Camera() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef(null);

  // 用於存儲媒體設備
  let mediaRecorder;

  const toggleCamera = async () => {
    if (!mediaRecorder || !videoRef.current.srcObject) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        mediaRecorder = new MediaRecorder(stream);
        setIsCameraOn(true);
      } catch (err) {
        console.error("Error accessing the camera:", err);
      }
    } else {
      // 停止錄製並清除鏡頭
      mediaRecorder.stop();
      mediaRecorder = null;
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  return (
    <div>
      <button onClick={toggleCamera}>
        {isCameraOn ? "Stop Camera" : "Start Camera"}
      </button>
      <video ref={videoRef} autoPlay muted></video>
    </div>
  );
}

