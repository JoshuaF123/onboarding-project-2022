console.log("hello");

async function readCountryData(){
    try{
        console.log(document);
        var element = document.getElementById("countyList");
        let fetchRes = await fetch("https://xc-countries-api.herokuapp.com/api/countries/");
        let res = await fetchRes.json();
        var countries = [];

        res.forEach(element => {
            countries.push(element)
        });

        return countries;

    }catch(err){
        console.log(err);
    }
}

function populateDropdownMenu(){
    countries = readCountryData();
    
}

window.addEventListener('DOMContentLoaded', populateDropdownMenu);