var colors = ["red", "blue", "green", "yellow"];
var currentState = [];
var userState = [];
var generateState = function() {
  var randomColor = colors[Math.floor(Math.random() * colors.length)];
  currentState.push(randomColor);
}
var gameStep = 0;
var maxStep = 20;
var resetState = function() {
  currentState = [];
  userState = [];
  gameStep = 0;
}

var resetBtns = function() {
  for (var i = 0; i < colors[i].length; i++) {
    document.getElementById(colors[i]).disabled = false;
  }
}

var mutateUserState = function(element) {
  userState.push(element.id);
  var isMatched = checkMatch(currentState, userState);
  isCorrect(isMatched);
  element.disabled = true;
}

var renderState = function() {
  for (var i = 0; i < currentState.length; i++) {
    document.getElementById(currentState[i]).style.background = 'white';
    setTimeout(function() {
      document.getElementById(currentState[i]).style.background = currentState[i];
    }, 1000)
  }
}



var checkMatch = function(currentState, userState) {
  var match = false
  if (currentState.length === userState.length) {
    for (var i = 0; i < currentState.length; i++) {
      if (currentState[i] === userState[i]) {
        match = true;
      } else {
        match = false;
      }
    }
  } else {
    match = false;
  }

  return match;
}

var isCorrect = function(bool) {
  if (bool) {
    gameStep++;
    initialPrompt(true);
  } else {
    userState = [];
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
