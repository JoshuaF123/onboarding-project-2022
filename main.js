console.log("hello");

/*
This function fetchs the list from the provided URL,
saves it in a JSON array, then puts that data into a useable
array.
@param url: is the url of the database you're trying to pull
from. It must be a string!
@return: A usable array containing all the data from the URL.
*/    
async function readDatabase(url){
    try{
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
collects, then adds it to the appropriate dropdown menu.
@param id: the ID of the dropdown list you're trying to access.
Must be a string.
@param url: is the url of the database you're trying to pull
from. It must be a string!
*/
async function populateDropdownMenu(id, url){
    let optionsFromDatabase = await readDatabase(url);
    console.log(optionsFromDatabase);
    let dropdownMenu = document.getElementById(id);

    for(let x = 0 ; x < optionsFromDatabase.length; x++){
        var place = optionsFromDatabase[x];
        var el = document.createElement("option");
        el.text = place.name;
        el.value = place.code;
        dropdownMenu.add(el);
    }
}

async function addCountry(url){
    const response = await fetch(url, {method: 'POST'});
}

function submit(){
    console.log("Arrived at submit()");
    /*
    let cCode = document.getElementById("userCountryCode").value;
    let cName = document.getElementById("userCountryName").value;
    */

    let newCountry = {
        "code": document.getElementById("userCountryCode").value,
        "name": document.getElementById("userCountryName").value
    }

    console.log(newCountry);

}

//This part is basically the main function. On load, populate the
//country dropdown menu by calling 'populateDropdownMenu' function.
//This in turn forces the state list to populate. The statelist will update
//whenever the user changes the currently selected country.
window.addEventListener('DOMContentLoaded', function(){//end1
    let clickedCountry = false;
    let countryList = document.getElementById("countryList");
    let stateList = document.getElementById("stateList");

    //Initial population of the country list. The If statement
    //safeguards from duplications or pollution.
    countryList.addEventListener('click', function(){ //start2
        if(clickedCountry === false){
            populateDropdownMenu("countryList", "https://xc-countries-api.herokuapp.com/api/countries/");
            clickedCountry = true;
        }
        
    });//end2
    //auto-updating state list.
    countryList.addEventListener('change', function(){ //start3
        let urlPt1 = "https://xc-countries-api.herokuapp.com/api/countries/";
        let urlPt2 = "/states/";
        let choosenCountry = countryList.value;
        let finalURL = urlPt1+choosenCountry+urlPt2;

        //These two lines remove every entry in the state list
        //to prevent duplications and polluting the options.
        var options = document.querySelectorAll("#stateList option");
        options.forEach(o => o.remove());
        
        //This block re-adds the default value to the state list.
        let defOption = document.createElement("option");
        defOption.text = "Select a state.";
        defOption.val = "val";
        stateList.add(defOption);

        populateDropdownMenu("stateList", finalURL);
    });//start3

    document.getElementById("addLocation").addEventListener("submit", submit);

});//end1