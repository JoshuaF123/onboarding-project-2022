import fetch from "node-fetch";
async function populateDropdownMenu(){
    try{
        //var element = document.getElementById("countyList");
        let fetchRes = await fetch("https://xc-countries-api.herokuapp.com/api/countries/");
        let res = await fetchRes.json();
        var countries = [];
        /*fetchRes.then(res => res.json()).then(data => {
            countries.push(data);
        });*/
        res.forEach(element => {
            countries.push(element)
        });
        console.log(countries);
        console.log(countries[0]);
        console.log("test");

    }catch(err){
        console.log(err);
    }

}

populateDropdownMenu();