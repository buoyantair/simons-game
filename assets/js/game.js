var colors = ["red", "blue", "green", "yellow"];
var currentState = [];
var userState = [];
var generateState = function() {
  var randomColor = colors[Math.floor(Math.random() * colors.length)];
  currentState.push(randomColor);
}
var gameStep = 0;
var maxStep = 5;
var resetState = function() {
  currentState = [];
  userState = [];
  gameStep = 0;
}

var hintShowed = false;

var userStateListener = function(color) {
  if (hintShowed === true) {
    hintShowed = false;
    userState.push(color);
    console.log('User : ' + userState)
    var mat = checkMatch(currentState, userState);
    console.log(mat);
    isCorrect(mat);
    console.log("ba ba black sheep")
  }
}

var renderState = function() {
  if (hintShowed === false) {
    console.log('User : ' + currentState);
    hintShowed = true;
  }
}


var checkMatch = function(currentState, userState) {
  var match = false
  for (var i = 0; i < currentState.length; i++) {
    if (currentState[i] === userState[i]) {
      match = true;
    } else {
      match = false;
    }
  }
  return match;
}

var isCorrect = function(bool) {
  if (bool) {
    gameStep++;
    initialPrompt(true);
  } else {
    userState.pop();
    renderState();
  }
}

var initialPrompt = function(recursive) {
  if (recursive === false) {
    generateState();
    renderState();
  } else if (recursive === true) {
    if (gameStep < maxStep) {
      generateState();
      renderState();
    } else {
      resetState();
      initialPrompt(false);
    }
  }
}
