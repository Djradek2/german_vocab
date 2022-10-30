const display = document.querySelector('#p1');
var settings = JSON.parse(localStorage.getItem('settings'));
const inputField = document.getElementById("word-input");
const checkButton = document.getElementById("check-btn");
const scoreBoard = document.getElementById('score');
var totalScore = 0;
var correctScore = 0;
var latestWord;
var rand;

document.addEventListener("DOMContentLoaded", function(){
    loadScore();
    show();
});

document.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        event.preventDefault();
        checkButton.click();
    }
})

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function displayWord(data){
    const display = document.querySelector('#p1'); 

    var word = JSON.parse((JSON.stringify(data.word)).slice(1, -1));
    latestWord = word;
    console.log(word);

    if(settings.convert == 0){
        display.innerHTML = word.German;
    }
    else if (settings.convert == 1){
        display.innerHTML = word.English;
    }
    else if (settings.convert == 2){
        rand = randomNum(1,2);
        if(rand == 1){
            display.innerHTML = word.German;
        }
        else{
            display.innerHTML = word.English;
        }
    }
}

/* function sendAnswer(answer){
    var settings = localStorage.getItem('settings');
    var answerID = word.id;
    var convertSetting = settings.convert; 
    var send = {id: answerID, value: answer, setting: convertSetting};
    console.log(send);
} */

function show(){
    fetch('http://localhost:5000/get',{
        headers: {                                              
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(settings)
    })
    .then(response => response.json())
    .then(data => displayWord(data));
}

function check(){
    answer = inputField.value;
    inputField.value = "";
    totalScore++;
    if(settings.convert == 0){
        if (answer == latestWord.English){
            correctScore++;//correct
        }
        else{

        }
    }
    else if (settings.convert == 1){
        if (answer == latestWord.German){
            correctScore++;//correct
        }
        else{

        }        
    }
    else if (settings.convert == 2){
        if ((answer == latestWord.English) && (rand == 1)){
            correctScore++;//correct
        }
        else if ((answer == latestWord.German) && (rand == 2)){
            correctScore++;
        }
    }
    show();
    showWinrate();
    saveScore();
}

function showWinrate(){
    scoreBoard.innerHTML = "score: " + correctScore + " / " + totalScore + " (" + (correctScore/totalScore*100).toFixed(2) + "%)"; 
}

function saveScore(){
    localStorage.setItem("score", JSON.stringify({"correct": correctScore, "total": totalScore}));
}

function loadScore(){
    try{
    var scoreSave = JSON.parse(localStorage.getItem('score'));
    totalScore = scoreSave.total;
    correctScore = scoreSave.correct;
    }
    catch{}
    showWinrate();
}

function clearScore(){
    
}