console.log("hello");

/*
This function fetchs the country list from the provided URL,
saves it in a JSON array, then puts that data into a useable
array. Try to rework so that it works for state and country.
@return: A usable array containing all the data from the URL.
*/    
async function readDatabase(url){
    try{
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
    //This clears out the options everytime you click the
    //dropdown menu, but that prevents us from having a
    //selected element
    /*dropdownMenu.onclick = function(){
        var options = document.querySelectorAll("#"+ id +" option");
        options.forEach(o => o.remove());
    }*/
    for(let x = 0 ; x < optionsFromDatabase.length; x++){
        var place = optionsFromDatabase[x];
        var el = document.createElement("option");
        el.text = place.name;
        el.value = place.code;
        dropdownMenu.add(el);
    }
}

window.addEventListener('DOMContentLoaded', function(){
    let clickedCountry = false;
    let clickedState = false
    document.getElementById("countryList").addEventListener('click', function(){
        if(clickedCountry === false){
            populateDropdownMenu("countryList", "https://xc-countries-api.herokuapp.com/api/countries/");
            clickedCountry = true;
        }
    });
    document.getElementById("stateList").addEventListener('click', function(){
        if(clickedState === false){
            let urlPt1 = "https://xc-countries-api.herokuapp.com/api/countries/";
            let urlPt2 = "/states/";
    
            let choice = document.getElementById("countryList");    
            let choosenCountry = choice.value;
    
            let finalURL = urlPt1+choosenCountry+urlPt2;
            populateDropdownMenu("stateList", finalURL);
            clickedState = true;
        }

    });
});