const display = document.querySelector('#p1');

document.addEventListener("DOMContentLoaded", function(){
    show();
});

function displayWord(data){
    const display = document.querySelector('#p1'); 
    //var word = 
    display.innerHTML = JSON.stringify(data);
}

function show(){
    var settings = JSON.parse(localStorage.getItem('settings'));
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