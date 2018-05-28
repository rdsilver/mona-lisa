var img;
var randomVars = [];
var randomVarLength = 24;
var frames = 0;
var randomSequence = true;
var slowDown = 2;

function preload() {
  img = loadImage("assets/monaLisa.jpg");
}

function setup() {
  pixelDensity(1);
  canvas = createCanvas(img.width, img.height);
  canvas.parent('sketch');
  image(img, 0, 0);
  setSpeed();

  if (!window.location.hash)
    setRandomVars();
  else
    decodeHash();
}

function draw() {
  if (frames%slowDown == 0)
    sortPixels();

  if (frames%200 == 0 && randomSequence)
    reset();

  frames++;
}

function sortPixels() {
  loadPixels();
  for(var x=0;x<width;x++) {
    for(var y=height;y>=0;y--) {
      var index = (x+y*width)*4;
      totalColor = pixels[index+randomVars[0]] + pixels[index+randomVars[1]] + pixels[index+randomVars[3]];
      var otherIndex = ((x+randomVars[4])+(y+randomVars[5])*width)*4;
      totalColorOther = pixels[otherIndex+randomVars[6]] + pixels[otherIndex+randomVars[7]] + pixels[otherIndex+randomVars[8]];

      if (totalColor < totalColorOther) {
        tempPixels = [pixels[index+randomVars[9]], pixels[index+randomVars[10]],pixels[index+randomVars[11]]];
        pixels[index+randomVars[12]] = pixels[otherIndex+randomVars[13]];
        pixels[index+randomVars[14]] = pixels[otherIndex+randomVars[15]];
        pixels[index+randomVars[16]] = pixels[otherIndex+randomVars[17]];
        pixels[otherIndex+randomVars[18]] = tempPixels[Math.abs((0+randomVars[19])%3)];
        pixels[otherIndex+randomVars[20]] = tempPixels[Math.abs((1+randomVars[21])%3)];
        pixels[otherIndex+randomVars[22]] = tempPixels[Math.abs((2+randomVars[23])%3)];
      }
    }
  }
  updatePixels();
}

function reset() {
  image(img, 0, 0);
  setRandomVars();
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    reset();
    randomSequence = false;
  }
}
