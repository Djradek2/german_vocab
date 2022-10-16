const display = document.querySelector('#p1');
var settings = JSON.parse(localStorage.getItem('settings'));

document.addEventListener("DOMContentLoaded", function(){
    show();
});

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function displayWord(data){
    const display = document.querySelector('#p1'); 

    var word = JSON.parse((JSON.stringify(data.word)).slice(1, -1));
    console.log(word);

    if(settings.convert == 0){
        display.innerHTML = word.German;
    }
    else if (settings.convert == 1){
        display.innerHTML = word.English;
    }
    else if (settings.convert == 2){
        var rand = randomNum(1,2);
        if(rand == 1){
            display.innerHTML = word.German;
        }
        else{
            display.innerHTML = word.English;
        }
    }
}

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