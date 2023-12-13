const timerElems = document.querySelectorAll(".timer__button");
const formElem = document.querySelector("#custom");

const timeLeftElem = document.querySelector(".display__time-left");
const endTimeElem = document.querySelector(".display__end-time");

let timeId;
function updateTimeLeft(endTime){
    return function() {
        const left = endTime - Date.now();
        if(left < 0) {
            clearInterval(timeId);
            return;
        }
        const leftMins = Math.floor(left / 60000);
        const leftSecs = Math.floor((left % 60000) / 1000);
        const showMes = `${leftMins}:${String(leftSecs).padStart(2, '0')}`
        timeLeftElem.textContent = showMes;
        document.title = showMes;
        
    }
}
function showEndTime(endTime) {
    endTimeElem.textContent = `Be Back At ${endTime.getHours()}:${String(endTime.getMinutes()).padStart(2, '0')}`;
}
function timerStart(time) {
    clearInterval(timeId);
    const endTime = new Date(Date.now() + time * 1000);
    const updateGivenTimeLeft = updateTimeLeft(endTime);
    timeId = setInterval(updateGivenTimeLeft, 1000);
    updateGivenTimeLeft();
    showEndTime(endTime); 
}

function handleClikTimer() {
    timerStart(Number.parseInt(this.dataset.time));
}
function handleSubmit(event) {
    event.preventDefault();

    const value = this.querySelector("input[name='minutes']").value * 60;
    timerStart(value);
}
timerElems.forEach(elem => elem.addEventListener("click", handleClikTimer));
formElem.addEventListener("submit", handleSubmit);

