console.log("hello");

/*
This function fetchs the country list from the provided URL,
saves it in a JSON array, then puts that data into a useable
array. Try to rework so that it works for state and country.
@return: A usable array containing all the data from the URL.
*/    
async function readCountryData(){
    try{
        console.log(document);
        let fetchRes = await fetch("https://xc-countries-api.herokuapp.com/api/countries/");
        let res = await fetchRes.json();
        let countries = [];

        res.forEach(element => {
            countries.push(element)
        });

        //console.log(countries);
        return countries;

    }catch(err){
        console.log(err);
    }
}

/*
The functions takes the information that populateDropdownMenu
collects, then adds it to the country dropdown menu.
*/
async function populateDropdownMenu(){
    let countries = await readCountryData();
    console.log(countries);
    let dropdownMenu = document.getElementById("countryList");
    for(let x = 0 ; x < countries.length; x++){
        var country = countries[x];
        var el = document.createElement("option");
        el.text = country.name;
        el.id = country.code;
        dropdownMenu.add(el);
    }
}

window.addEventListener('DOMContentLoaded', function(){
    document.getElementById("countryList").addEventListener('click', function(){
        readCountryData();
        populateDropdownMenu();
    })
});

window.addEventListener('DOMContentLoaded', function(){
    document.getElementById("stateList").addEventListener('click', function(){
        readCountryData();
        populateDropdownMenu();
    })
});