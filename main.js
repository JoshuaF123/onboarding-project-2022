console.log("hello");

/*
This function fetchs the country list from the provided URL,
saves it in a JSON array, then puts that data into a useable
array. Try to rework so that it works for state and country.
@return: A usable array containing all the data from the URL.
*/    
async function readDatabase(url){
    try{
        console.log(url);
        //let tempURL = encodeURI(url)
        let fetchRes = await fetch(url.toString());
        let res = await fetchRes.json();
        let dataStorage = [];

        res.forEach(element => {
            dataStorage.push(element)
        });

        return dataStorage;

    }catch(err){
        console.log(err);
    }
}

/*
The functions takes the information that populateDropdownMenu
collects, then adds it to the country dropdown menu.
*/
async function populateDropdownMenu(id, url){
    let optionsFromDatabase = await readDatabase(url);
    console.log(optionsFromDatabase);
    let dropdownMenu = document.getElementById(id);
    dropdownMenu.onclick = function(){
        var options = document.querySelectorAll("#countryList option");
        options.forEach(o => o.remove());
    }
    for(let x = 0 ; x < optionsFromDatabase.length; x++){
        var place = optionsFromDatabase[x];
        var el = document.createElement("option");
        el.text = place.name;
        el.value = place.code;
        dropdownMenu.add(el);
    }
}

window.addEventListener('DOMContentLoaded', function(){
    document.getElementById("countryList").addEventListener('click', function(){
        populateDropdownMenu("countryList", "https://xc-countries-api.herokuapp.com/api/countries/");
    })
});

window.addEventListener('DOMContentLoaded', function(){
    document.getElementById("stateList").addEventListener('click', function(){
        let urlPt1 = "https://xc-countries-api.herokuapp.com/api/countries/";
        let choosenCountry = "";
        let urlPt2 = "/states/";
        let finalURL = urlPt1+choosenCountry+urlPt2;
        populateDropdownMenu("stateList");
    })
});