console.log("hello");

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

async function populateDropdownMenu(){
    let countries = await readCountryData();
    console.log(countries);
    let dropdownMenu = document.getElementById("countryList");
    for(let x = 0 ; x < countries.length; x++){
        var country = countries[x];
        var el = document.createElement("option");
        el.text = country.name;
        el.value = country.code;
        dropdownMenu.add(el);
    }
}

window.addEventListener('DOMContentLoaded', readCountryData);
window.addEventListener('DOMContentLoaded', populateDropdownMenu);