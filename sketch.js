var img;
var randomVars = [];
var runningTotal = [];
var runningTotalSize = 15;
var frames = 0;


function preload() {
  img = loadImage("assets/monaLisa.jpg");
}

function setup() {
  pixelDensity(1);
  canvas = createCanvas(img.width, img.height);
  canvas.parent('sketch');
  image(img, 0, 0);
  setRandomVars();
}

function draw() {
  if (frames%5 == 0)
    sortPixels();

  if (frames%500 == 0)
    reset();

  frames++;
}

function sortPixels() {
  var changedAmount = 0;
  var average = 0;

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
        pixels[otherIndex+randomVars[18]] = tempPixels[0]+randomVars[19];
        pixels[otherIndex+randomVars[20]] = tempPixels[1]+randomVars[21];
        pixels[otherIndex+randomVars[22]] = tempPixels[2]+randomVars[23];
        changedAmount++;
      }
    }
  }
  updatePixels();

  // Check to see if reset is needed because the image is not doing anything
  runningTotal.push(changedAmount);
  if (runningTotal.length > runningTotalSize) {
    runningTotal.shift();
  }
  average = round(runningTotal.reduce(getSum)/runningTotal.length);
  if (average == changedAmount) {
    reset();
    frames=0;
  }
}

function getSum(total, num) {
    return total + num;
}

function reset() {
  image(img, 0, 0);
  setRandomVars();
}

function setRandomVars() {
  for (var x=0;x<23;x++) {
    randomVars[x] = round(random(-5,5));
  }
}