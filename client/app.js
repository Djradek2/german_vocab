const display = document.querySelector('#p1');

document.addEventListener("DOMContentLoaded", function(){
    show();
});

function displayWord(data){
    const display = document.querySelector('#p1'); 
    display.innerHTML = JSON.stringify(data);
}

function show(){
    fetch('http://localhost:5000/get',{
        headers: {                                              
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({'lol':'2'})
    })
    .then(response => response.json())
    .then(data => displayWord(data));
}