// Approximately determine how fast of a computer we are working with
// The slower computers should never skip a frame so it will animate smoother.
function setSpeed() {
	var firstMeasure = millis();
	for (var i=0;i<5000;i++);
	var timeTaken = millis() - firstMeasure;
	if (timeTaken>.3) {
    slowDown = 1;
  }
}

function getSum(total, num) {
    return total + num;
}

function setRandomVars() {
  for (var x=0;x<randomVarLength;x++) 
    randomVars[x] = round(random(-10,10));

  encodeHash();
}

function decodeHash() {
  var pattern =  /^[0-9a-k]{24}$/;
  var hash = window.location.hash.split('#')[1];
  var isHashValid = pattern.test(hash);
  if (isHashValid) {
    for (var x=0;x<hash.length;x++) 
      randomVars[x] = parseInt(hash[x], 21) - 10;
    
    randomSequence = false;
  } else {
    setRandomVars();
  }
}

function encodeHash() {
  var hash = '';
  for (var x=0;x<randomVarLength;x++) 
    hash += (randomVars[x]+10).toString(21);

  window.location.hash = hash;
}