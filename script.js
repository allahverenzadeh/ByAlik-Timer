let timer;
let isRunning = false;
let timeLeft;
let alarm = new Audio('alarm.mp3');

const timerDisplay = document.getElementById('timer');
const playButton = document.getElementById('play');
const resetButton = document.getElementById('reset');
const stopAlarmButton = document.getElementById('stopAlarm');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const conicDiv = document.getElementById('conic');

function updateDisplay(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update rotation
    const rotation = 360 - (timeInSeconds / (getInitialTime() / 360));
    document.querySelector('.hand').style.transform = `rotate(${rotation}deg)`;
}

function getInitialTime() {
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    return (minutes * 60) + seconds;
}

function startTimer() {
    if (!isRunning) {
        timeLeft = timeLeft || getInitialTime();
        if (timeLeft <= 0) return;
        
        isRunning = true;
        playButton.querySelector('i').classList.replace('fa-play', 'fa-pause');
        
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                playButton.querySelector('i').classList.replace('fa-pause', 'fa-play');
                alarm.play();
                alarm.loop = true;
                stopAlarmButton.classList.remove('hidden');
            }
        }, 1000);
    } else {
        clearInterval(timer);
        isRunning = false;
        playButton.querySelector('i').classList.replace('fa-pause', 'fa-play');
    }
}

function updateAnimation() {
    const progress = (timeLeft / getInitialTime()) * 100;
    conicDiv.style.background = `conic-gradient(
        from 0deg,
        #60A5FA ${progress}%,
        #1F2937 ${progress}%
    )`;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = getInitialTime();
    updateDisplay(timeLeft);
    playButton.querySelector('i').classList.replace('fa-pause', 'fa-play');
    stopAlarm();
}

function stopAlarm() {
    alarm.pause();
    alarm.currentTime = 0;
    stopAlarmButton.classList.add('hidden');
}

playButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
stopAlarmButton.addEventListener('click', stopAlarm);

// Initial display
resetTimer();
