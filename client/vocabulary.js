var numberOfWords;

document.addEventListener("DOMContentLoaded", function(){
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));


    var settings = JSON.parse(localStorage.getItem("settings"));
    switch(settings.convert) {
        case "0":
            document.getElementById("toEng").checked = true;
            break;
        case "1":
            document.getElementById("toGerman").checked = true;
            break;
        case "2":
            document.getElementById("both").checked = true;
    }
});

function loadChecks(){  //loads localStorage into html
    var settings = JSON.parse(localStorage.getItem("settings"));
    
    for(var i = 1;i<numberOfWords+1;i++){    //(Object.keys(settings).length)
        try{
            var text = "id_" + String(i);
            if (settings[text] == "selected"){  //(settings.id_2) == (var text = "id_2"; settings[text])
                document.getElementById(String(i)).checked = true;
            }
            else{
                document.getElementById(String(i)).checked = false;
            }
        }
        catch{}
    }
}

function handleSubmit(event) {
    event.preventDefault();                             //prevents default behaviour (restarting site)

    const data = new FormData(event.target);            
    const value = Object.fromEntries(data.entries());
    console.log(value);

    //var result = Object.values(value)[1];
    //console.log(result);

    localStorage.setItem("settings", JSON.stringify(value));
    window.location.replace("index.html")
    //const cat = JSON.parse(localStorage.getItem('settings'));
    //var result2 = Object.values(cat)[1];
    //var result2 = cat.id_2;
    //console.log(result2);
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function loadHTMLTable(data){
    const table = document.querySelector("table tbody");
    console.log(data);
    numberOfWords = data.length;

    if (data.length === 0){
        table.innerHTML = "<tr><td class = 'no-data' colspan='5'>No Data</td></tr>";
    }
    let tableHtml = "";
    
    data.forEach(function ({id, German, English, Frequency, Context}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td id="id_${id}_ger">${German}</td>`;
        tableHtml += `<td id="id_${id}_eng">${English}</td>`;
        tableHtml += `<td>${Frequency}</td>`;
        tableHtml += `<td>${Context}</td>`;
        tableHtml += `<td class="short"><input type="checkbox" name="id_${id}" value="selected" id=${id} data-id=${id}></td>`;  //you can add checked
        tableHtml += "</tr>";
        //numberOfWords++;
    });

    table.innerHTML = tableHtml;
    loadChecks();
}

function wordRange(){
    const input1 = document.getElementById("input1");
    const input2 = document.getElementById("input2");
    var top = Number(input2.value) + 1;
    for(i = input1.value; i<top; i++){
        try{
        var checkbox = document.getElementById(i);
        checkbox.checked = true;
        }
        catch{}
    }
}

function select100(){
    try{
        for(i = 1; i<101; i++){
            var checkbox = document.getElementById(i);
            checkbox.checked = true;
        }
    }
    catch{}
}

function selectAll(){
    try{
        for(i = 1; i<100000; i++){
            var checkbox = document.getElementById(i);
            checkbox.checked = true;
        }
    }
    catch{}
}

function remove(){
    try{
        for(i = 1; i<100000; i++){
            var checkbox = document.getElementById(i);
            checkbox.checked = false;
        }
    }
    catch{}
}

function samewords(){
    try{
        for(i = 1; i<100000; i++){
            var selectWord1 = "id_" + i + "_ger"
            var selectWord2 = "id_" + i + "_eng"
            //console.log(document.getElementById(selectWord1).innerHTML);
            if(document.getElementById(selectWord1).innerHTML == document.getElementById(selectWord2).innerHTML){
                var checkbox = document.getElementById(i);
                checkbox.checked = false;
            }
        }
    }
    catch{}
}