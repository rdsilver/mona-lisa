var img;
var gif;
var fileName = 'melted.webm';
var saved = true;

function preload() {
  img = loadImage("assets/monaLisa.jpg");
}

function setup() {
  pixelDensity(1);
  canvas = createCanvas(img.width, img.height);
  canvas.parent('sketch');
  image(img, 0, 0);

  gif = new CCapture({
    framerate: 24,
    quality: 90,
    format: 'webm',
    name: fileName,
    workersPath: 'gifLibrary/'
  });

  gif.start();
}

function draw() {
  if (frameCount<img.height && frameCount%5 == 0)
    gif.capture(canvas.elt);
  else if (frameCount == img.height && !saved) {
    gif.save(doneRendering);
    saved = true;
  }

  sortPixels();
}

function sortPixels() {
  loadPixels();
  for(var x=0;x<width;x++) {
    for(var y=height;y>=0;y--) {
      var index = (x+y*width)*4;
      totalColor = pixels[index] + pixels[index+1] + pixels[index+2];
      var indexDown = (x+(y+1)*width)*4;
      totalColorDown = pixels[indexDown] + pixels[indexDown+1] + pixels[indexDown+2];

      if (totalColor < totalColorDown) {
        tempPixels = [pixels[index], pixels[index+1],pixels[index+2]];
        pixels[index] = pixels[indexDown];
        pixels[index+1] = pixels[indexDown+1];
        pixels[index+2] = pixels[indexDown+2];
        pixels[indexDown] = tempPixels[0];
        pixels[indexDown+1] = tempPixels[1];
        pixels[indexDown+2] = tempPixels[2];
      }
    }
  }
  updatePixels();
}

function doneRendering(blob) {
  saveGif(blob);
}

function saveGif(blob) {
  let a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();

  if (/Edge\/\d./i.test(navigator.userAgent))
    navigator.msSaveOrOpenBlob(blob, fileName);

  window.URL.revokeObjectURL(url);
};