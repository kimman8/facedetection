const video = document.querySelector('.webcam');
const SIZE = 10;
const SCALE = 1.35;

const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');

const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');

const faceDetector = new window.FaceDetector();

console.log(video, canvas, faceCanvas, faceDetector);

//write a function that will populate the users video

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  video.srcObject = stream;
  await video.play();
  //size the canvases to be same size as video
  console.log(video.videoWidth, video.videoHeight);
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(video);
  //ask the browser when the next animation frame is and tell it to run detect for us
  faces.forEach(drawFace);
  faces.forEach(censor);
  requestAnimationFrame(detect);
}

function drawFace(face) {
  const { width, height, top, left } = face.boundingBox;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log({ width, height, top, left });
  ctx.strokeStyle = '#ffc600';
  ctx.lineWidth = 3;
  ctx.strokeRect(left, top, width, height);
}

function censor({ boundingBox: face }) {
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);

  //draw the small face
  faceCtx.drawImage(
    //5 source args
    video, //wehres da source come from
    face.x, //where do we start da source pull from
    face.y, //
    face.width,
    face.height,
    //4 draw args
    face.x, //where should we start drawing da x and y?
    face.y,
    SIZE,
    SIZE
  );
  // draw small face back on but scale up
  const width = face.width * SCALE;
  const height = face.height * SCALE;
  faceCtx.drawImage(
    faceCanvas, //source
    face.x, //where do we start da source pull from
    face.y,
    SIZE,
    SIZE,
    //DRAWING ARGS
    face.x - (width - face.width) / 2,
    face.y - (height - face.height) / 2,
    width,
    height
  );
}

populateVideo().then(detect);
