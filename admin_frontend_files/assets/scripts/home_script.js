//GoogleMap for Tracking
var map;
//Initial Center Coordinates --> has to be set in initMap()
var initMapCenterLatLong;
//Temporary Marker Variable for testing purposes --> has to be changed to an array of google.maps.Marker
var marker;
document.addEventListener('DOMContentLoaded', function () {
    //TODO: Comment out after there is a server sided response for the request in the function checkLogin()
    /*if (!checkLogin()) {
        window.location.href = 'index.html';
    }*/
});
function initMap() {
    //Sets The Coordinates which the Map is centered the first time the home.html is loaded
    initMapCenterLatLong = new google.maps.LatLng(50.58727, 8.67554);
    //Initialises the Map with the corresponding Coordinates and a Zoom of 13
    map = new google.maps.Map(document.getElementById('map'), {
        center: initMapCenterLatLong,
        zoom: 13
    });
    //----- Testing -----
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(50.58727, 8.67554),
        title: "TestMarker"
    });
    marker.setMap(map);
    //-------------------
}
//TODO: Comment out after there is a server sided response for the request in the function checkLogin()
/*
//Checks if the Admin is logged in (Session)
//returns TRUE there is a Session and FALSE if the Session has expired or else
function checkLogin(): boolean {
    axios.get("/isLoggedIn").then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return false;
}
 */ 
//# sourceMappingURL=home_script.js.map