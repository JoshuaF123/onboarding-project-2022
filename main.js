console.log("hello");

/*
This function fetchs the list from the provided URL,
saves it in a JSON array, then puts that data into a useable
array.
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

window.addEventListener('DOMContentLoaded', function(){//end1
    let clickedCountry = false;
    let countryList = document.getElementById("countryList");
    let stateList = document.getElementById("stateList");

    countryList.addEventListener('click', function(){ //start2
        if(clickedCountry === false){
            populateDropdownMenu("countryList", "https://xc-countries-api.herokuapp.com/api/countries/");
            clickedCountry = true;
        }
        
    });//end2

    countryList.addEventListener('change', function(){ //start3
        let urlPt1 = "https://xc-countries-api.herokuapp.com/api/countries/";
        let urlPt2 = "/states/";
        let choosenCountry = countryList.value;
        let finalURL = urlPt1+choosenCountry+urlPt2;

        var options = document.querySelectorAll("#stateList option");
        options.forEach(o => o.remove());
        
        let defOption = document.createElement("option");
        defOption.text = "Select a state.";
        defOption.val = "val";
        stateList.add(defOption);

        populateDropdownMenu("stateList", finalURL);
    });//start3
});//end1