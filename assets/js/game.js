
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

var userStateListener = function(color){
  console.log("THIS SHOULD FIRE AFTER CLICKING")
  userState.push(color);
}

var renderState = function(msg){
  //alert(msg);
  for(var i =0; i < currentState.length; i++){
    document.getElementById(currentState[i]).style.background = "white";
    document.getElementById(currentState[i]).addEventListener("click", userStateListener(currentState[i]), false);
  }
  setTimeout(function(){
    for(var i =0; i < currentState.length; i++){
      document.getElementById(currentState[i]).style.background = currentState[i];
    }
  }, 1000)
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
  for(var i =0; i < currentState.length; i++){
    document.getElementById(currentState[i]).removeEventListener("click", userStateListener(currentState[i]), false);
  }2
  if(bool){
    gameStep++;
    console.log("Removed user click")
    console.log(currentState, userState);
    initialPrompt(true);
  } else {
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
