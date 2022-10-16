//const display = document.querySelector('#p1'); 
/* const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function (){
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

function displayWord(data){
    const display = document.querySelector('#p1'); 
    display.innerHTML = JSON.stringify(data);
} */

function startup(){
    const defaultSettings =JSON.stringify({convert: "2", pick: "0", id_1: "selected", id_2: "selected", id_3: "selected", id_4: "selected", id_5: "selected", id_6: "selected", id_7: "selected"});
    try{
        var test = JSON.parse(localStorage.getItem('settings'));
        console.log(test.convert);
        console.log(test.pick);
        //console.log(Object.keys(test)[0]);
    }
    catch{
        localStorage.setItem("settings", defaultSettings);
    }
    window.location.replace("app.html")
}