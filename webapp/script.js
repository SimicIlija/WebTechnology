const basicUrl = 'http://localhost:3000/';
function loadText() {
    var elem = document.getElementById('para');
    const Http = new XMLHttpRequest();
    const url = basicUrl + 'api';
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        elem.innerText = Http.responseText;
    }
}