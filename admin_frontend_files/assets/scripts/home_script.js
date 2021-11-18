//GoogleMap for Tracking
var map;
//Initial Center Coordinates --> has to be set in initMap()
var initMapCenterLatLong;
//Temporary Marker Variable for testing purposes --> has to be changed to an array of google.maps.Marker
var marker;
var markers = []; // later change to map
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
        zoom: 15,
        streetViewControl: false
    });
    //----- Testing -----
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(50.58727, 8.67554),
        title: "TestMarker",
    });
    marker.setMap(map);
    //-------------------
    createMarkers();
    setInterval(reloadMarkers, 1000); // dummy for real time updates (needs obvs performance refactors)
}
function createMarkers() {
    axios.get("/api/v1/admin/map/coords/1").then(function (res) {
        var users = res.data;
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var user = users_1[_i];
            for (var _a = 0, _b = user["latest-positions"]; _a < _b.length; _a++) {
                var pos = _b[_a];
                var tempMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(pos["lat"], pos["lng"]),
                    title: user["username"]
                });
                markers.push(tempMarker);
                tempMarker.setMap(map);
            }
        }
    }).catch(function (error) {
        console.log(error);
    });
}
function reloadMarkers() {
    for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
        var m = markers_1[_i];
        m.setMap(null);
    }
    markers = [];
    createMarkers();
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