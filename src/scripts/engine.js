const state = {
    wiew: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),

    },
    values: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
};

function countDown(){
    state.values.currentTime--;
    state.wiew.timeleft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){

        alert("Game Over! O seu resultado foi: " + state.values.result);
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
    }
}

function playSound(){
    let audio = new Audio("./src/audios/bonus-points.mp3");
    audio.volume = 0.5;
    audio.play();
}

function randomSquare() {
    state.wiew.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.wiew.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.wiew.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.wiew.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}

function initialize() {
  
    addListenerHitBox();
}

initialize();