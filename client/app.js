const display = document.querySelector('#p1');
var settings = JSON.parse(localStorage.getItem('settings'));
const input = document.getElementById("word-input");
const checkButton = document.getElementById("check-btn");
var totalScore = 0;
var correctScore = 0;
var latestWord;
var rand;

document.addEventListener("DOMContentLoaded", function(){
    loadScore();
    show();
});

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
    answer = input.value;
    input.value = "";
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
    console.log(correctScore + " / " + totalScore);
    show();
}

function showWinrate(){

}

function saveScore(){

}

function loadScore(){
    
}