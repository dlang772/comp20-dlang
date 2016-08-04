
function parse(){
	var xmlhttp = new XMLHttpRequest();
	var url = "data.json";

	xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var parseData = JSON.parse(xmlhttp.responseText);
        printData(parseData);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function printData(parseData) {
        
        var chat = "";

        for (i in parseData) {
        chat += parseData[i].content + ' ' + parseData[i].username + "<br/>";
        }
        document.getElementById("messages").innerHTML = chat;
}