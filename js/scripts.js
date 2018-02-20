var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
	pickPaper = document.getElementById('js-playerPick_paper'),
	pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function () { playerPick('rock') });
pickPaper.addEventListener('click', function () { playerPick('paper') });
pickScissors.addEventListener('click', function () { playerPick('scissors') });

var gameState = 'notStarted',  //started // ended
	player = {
		name: '',
		score: 0
	},
	computer = {
		score: 0
	};

var newGameElem = document.getElementById('js-newGameElement'),
	pickElem = document.getElementById('js-playerPickElement'),
	resultsElem = document.getElementById('js-resultsTableElement'),
	winnerBanner = document.getElementById('js-winnerBanner');

var winScore = 10;
var winner;
function setGameElements() {
	switch (gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			winnerBanner.style.display = 'none';
			break;
		case 'ended':
			newGameBtn.innerText = 'Jeszcze raz';
			winnerBanner.style.display = 'block';
			winnerBanner.innerHTML = "The Winner is: " + winner;
		case 'notStarted':
		default:
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
	}
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
	playerNameElem = document.getElementById('js-playerName'),
	computerPointsElem = document.getElementById('js-computerPoints');


function newGame() {
	player.name = prompt('Please enter your name', 'imię gracza');
	if (player.name) {
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements();

		playerNameElem.innerHTML = player.name;
		setGamePoints();
	}
}

function playerPick(playerPick) {
	console.log(playerPick);
}
function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random() * 3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
}
function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';

	if (playerPick == computerPick) {
		winnerIs = 'noone'; // remis
		playerResultElem.innerHTML = computerResultElem.innerHTML = "Tie!";
	} else if (
		(computerPick == 'rock' && playerPick == 'scissors') ||
		(computerPick == 'scissors' && playerPick == 'paper') ||
		(computerPick == 'paper' && playerPick == 'rock')) {
		winnerIs = 'computer';
	}
	console.log('winnerIs=' + winnerIs);
	if (winnerIs == 'player') {
		playerResultElem.innerHTML = "Win!";
		player.score++;
		console.log('pscore=' + player.score);
		setGamePoints();

	} else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = "Win!";
		computer.score++;
		console.log('cscore=' + computer.score);
		setGamePoints();
	}

}
function playerPick(playerPick) {
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
	checkRoundWinner(playerPick, computerPick);
	setGameEnd();
}
function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
	console.log('player.score=' + player.score);
}
function setGameEnd() {
	if (player.score == winScore) {
		winner = player.name;
		gameState = 'ended';
	} else if (computer.score == winScore) {
		winner = 'Computer';
		gameState = 'ended';
	}
	setGameElements();
}