document.addEventListener("DOMContentLoaded", function(){
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

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

    if (data.length === 0){
        table.innerHTML = "<tr><td class = 'no-data' colspan='5'>No Data</td></tr>";
    }
    let tableHtml = "";
    
    data.forEach(function ({id, German, English, Frequency, Context}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${German}</td>`;
        tableHtml += `<td>${English}</td>`;
        tableHtml += `<td>${Frequency}</td>`;
        tableHtml += `<td>${Context}</td>`;
        if(id < 101){
            tableHtml += `<td class="short"><input type="checkbox" name="id_${id}" checked value="selected" id=${id} data-id=${id}></td>`;
        }
        else{
            tableHtml += `<td class="short"><input type="checkbox" name="id_${id}" value="selected" id=${id} data-id=${id}></td>`;
        }
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
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