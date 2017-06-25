"use strict";

var colors = ["red", "blue", "green", "yellow"];
var currentState = [];
var userState = [];
var renderDelay = 1000;
var listening = false;
var playing = false;
var strict = false;
var sounds = {
	push: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
	render: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
	click: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
};
var generateState = function generateState() {
	currentState.push(colors[Math.floor(Math.random() * colors.length)]);
};

var gameStep = 0;
var maxStep = 20;

var play = function play(obj, src) {
	new Audio(src).play();
};

var resetState = function resetState() {
	document.querySelector(".step").innerText = 1;
	listening = false;
	currentState = [];
	userState = [];
	gameStep = 0;
	renderDelay = 1000;
};

var userStateListener = function userStateListener(color) {
	if (listening === true) {
		play($("#sound"), sounds.push);
		userState.push(color);
		if (userState.length == currentState.length) {
			listening = false;
			var matched = checkMatch();
			isCorrect(matched);
		} else if (userState.length > currentState.length) {
			listening = false;
			userState = [];
		}
	} else {
		console.log(userState);
	}
};

var blimp = function blimp(box, sound) {
	if (playing) {
		play($("#sound"), sound);
		box.css({ opacity: 1 });
		setTimeout(function () {
			box.css({ opacity: 0.7 });
		}, 1000);
	}
};

var renderState = function renderState(msg) {
	if (playing) {
		userState = [];
		//alert(currentState);

		var _loop = function _loop(color) {
			setTimeout(function () {
				blimp($("#" + currentState[color]), sounds.render);
			}, renderDelay);
			renderDelay += 1500;
		};

		for (var color in currentState) {
			_loop(color);
		}
		renderDelay = 1000;
		setTimeout(function () {
			listening = true;
		}, renderDelay * currentState.length);
	}
};

var toggleModal = function toggleModal(text, mood, next) {
	$(".modal").text(text);

	$(".modal").addClass("visible " + mood);
	setTimeout(function () {
		$(".modal").removeClass("visible");
		if (next) {
			next();
		}
	}, 1000);
};

var checkMatch = function checkMatch() {
	var match = false;
	for (var i = 0; i < currentState.length; i++) {
		if (currentState[i] === userState[i]) {
			match = true;
		} else {
			match = false;
		}
	}
	return match;
};

var isCorrect = function isCorrect(bool) {
	if (bool) {
		gameStep++;
		document.querySelector(".step").innerText = gameStep + 1;
		initialPrompt(true);
	} else if (!strict) {
		toggleModal("Ops! try again!", "wrong", renderState);
	} else if (strict) {
		initialPrompt(false);
	}
};

var initialPrompt = function initialPrompt(recursive) {
	if (recursive === false) {
		playing = true;
		$('.startscreen').removeClass('visible');
		resetState();
		generateState();
		renderState();
	} else if (recursive === true) {
		if (gameStep < maxStep) {
			generateState();
			renderState();
		} else {
			resetState();
			playing = false;
			$('.startscreen').addClass('visible');
			toggleModal("Awesome! You won!", "win");
		}
	}
};

var _loop2 = function _loop2(box) {
	document.querySelector("#" + colors[box]).addEventListener("mousedown", function () {
		play($("#sound"), sounds.click);
		$("#" + colors[box]).css({ opacity: 1 });
	});
	document.querySelector("#" + colors[box]).addEventListener("mouseup", function () {
		$("#" + colors[box]).css({ opacity: 0.7 });
	});
};

for (var box in colors) {
	_loop2(box);
}
$('.strict').on('click', function () {
	strict = !strict;
	if (strict) {
		$('.strict').addClass('toggled');
	} else {
		$('.strict').removeClass('toggled');
	}
});