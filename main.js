function httpGetAsync(URL){
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.onreadystatechange = function(){
        if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200)
            callback(xmlHTTP.responseText);
    }
    xmlHTTP.open("GET", URL, true);
    xmlHTTP.send(null);
    //return xmlHTTP.responseText;
}