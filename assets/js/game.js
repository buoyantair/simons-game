
var colors = ["red", "blue", "green", "yellow"];
var currentState = [];
var userState = [];
var generateState = function(){
  var randomColor = colors[Math.floor(Math.random() * colors.length)];
  currentState.push(randomColor);
}
var gameStep = 0;
var maxStep = 5;
var resetState = function(){
  currentState = [];
  userState= [];
  gameStep = 0;
}

var rendered = false;

var userStateListener = function(color){
  if(rendered === true){
    userState.push(color);
    console.log(userState);
    var mat = checkMatch(currentState, userState);
    isCorrect(mat);
  }
}

var renderState = function(msg){
  for(var i =0; i < currentState.length; i++){
    setInterval(function(){
      if(currentState[i] === 'red'){
        document.getElementById(currentState[i]).style.background = '#EF476F';
      } else if(currentState[i] === 'blue'){
        document.getElementById(currentState[i]).style.background = '#048BA8';
      } else if(currentState[i] === 'green'){
        document.getElementById(currentState[i]).style.background = '#06D6A0';
      } else if(currentState[i] === 'yellow'){
        document.getElementById(currentState[i]).style.background = '#FFD166';
      }
    }, 1000)
  }
  setTimeout(function(){
    for(var i =0; i < currentState.length; i++){
      document.getElementById(currentState[i]).style.background = currentState[i];
    }
  }, 2000)
  rendered = true;
}


var checkMatch = function(currentState, userState){
  var match = false
  for(var i=0; i < currentState.length; i++){
    if(currentState[i] === userState[i]){
      match = true;
    } else{
      match = false;
    }
  }
  return match;
}

var isCorrect = function(bool){
  if(bool){
    gameStep++;
    initialPrompt(true);
  } else {
    userState.pop();
    renderState();
  }
}

var initialPrompt = function(recursive){
  if(recursive === false){
    generateState();
    renderState();
  } else if(recursive === true) {
    if(gameStep < maxStep){
      generateState();
      renderState();
    } else{
      resetState();
      initialPrompt(false);
    }
  }
}
