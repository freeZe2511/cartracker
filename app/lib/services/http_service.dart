import 'dart:convert';
import 'dart:math';

import 'package:flutter_background_geolocation/flutter_background_geolocation.dart'
    as bg;
import 'package:http/http.dart' as http;
import 'package:maps_toolkit/maps_toolkit.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:vector_math/vector_math.dart';

class HttpService {
  String url = 'https://tim-eggers.de:9090';

  /// Handler for logIn with username and password parameters
  Future<bool> logIn(String username, String password) async {
    final uri = Uri.parse(url + '/auth/login');
    final headers = {'Content-Type': 'application/json'};
    Map<String, dynamic> body = {'username': username, 'password': password};

    // post to server
    http.Response res = await http.post(
      uri,
      headers: headers,
      body: json.encode(body),
      encoding: Encoding.getByName('utf-8'),
    );

    return await authorize(res.statusCode, jsonDecode(res.body));
  }

  /// Handler to check if response is valid
  authorize(num statusCode, var body) async {
    bool authorized = false;
    SharedPreferences prefs = await SharedPreferences.getInstance();

    switch (statusCode) {
      case 200:
        if (body["zone"] != null) {
          var zone = body["zone"];

          // transform response into string for sharedPreferences
          List<String> zoneList = [];
          zoneList.add(zone["id"]);
          zoneList.add(zone["name"]);
          zoneList.add(zone["radius"].toString());

          if (zone["pos"].length != 0) {
            var zonePosList = [];
            var counter = 0;
            for (var p in zone["pos"]) {
              var pos = [];
              pos.add(p["lat"].toString());
              pos.add(p["lng"].toString());
              zonePosList.add(pos);
              counter++;
            }
            zoneList.add(zonePosList.toString());
            zoneList.add(counter.toString());
          } else {
            zoneList.add("[]");
            zoneList.add("0");
          }

          // set sharedPreferences
          prefs.setString("jwt", body["jwt"]);
          prefs.setString("userid", body["userid"]);
          prefs.setStringList("zone", zoneList);
          authorized = true;
        }
        break;
      default:
        break;
    }

    return authorized;
  }

  /// LogOut clears sharedPreferences so local token is cleared
  logOut() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.clear();
  }

  /// Handler to post location to server
  postPosition(bg.Location location) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    // get stored information to send with post request
    String token = prefs.getString("jwt")!;
    String userid = prefs.getString("userid")!;
    List<String> zoneList = prefs.getStringList("zone")!;

    double lat = location.coords.latitude;
    double lng = location.coords.longitude;

    double speed = location.coords.speed;

    bool isMoving = location.isMoving;
    bool inZone = isInZone(userid, lat, lng, zoneList);

    final uri = Uri.parse(url + '/api/v1/pos');
    final headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token'
    };
    Map<String, dynamic> body = {
      'userid': userid,
      'lat': lat,
      'lng': lng,
      'inZone': inZone,
      'speed': speed,
      'isMoving': isMoving
    };

    http.Response res = await http.post(
      uri,
      headers: headers,
      body: json.encode(body),
      encoding: Encoding.getByName('utf-8'),
    );

    print(res.statusCode);
  }

  /// Check if user coords are inside of stored zone
  ///
  /// Outsourced into app to reduce server load!
  bool isInZone(String userid, double lat, double lng, List<String> zoneList) {
    var zoneId = zoneList[0];
    var zoneName = zoneList[1];
    var zoneRadius = zoneList[2];
    var zonePos = zoneList[3];
    var zonePosAmount = zoneList[4];

    //ZonePos string into Array
    var a = zonePos.substring(2, zonePos.length - 2).split("], [");

    var posList = [];
    for (var pos in a) {
      var posArray = [];
      var ar = pos.split(", ");
      posArray.add(double.parse(ar[0]));
      posArray.add(double.parse(ar[1]));
      posList.add(posArray);
    }

    // check in none, cirle or poly zone
    if (zoneList[1] == "None") return true;
    if (double.parse(zoneRadius) > 0) {
      var latZone = posList[0][0];
      var lngZone = posList[0][1];
      return checkCircleZone(latZone, lngZone, lat, lng, num.parse(zoneRadius));
    } else {
      return checkPolyZone(lat, lng, posList);
    }
  }

  /// Check if position inside circular zone
  bool checkCircleZone(double zoneLat, double zoneLng, double userLat,
      double userLng, num radius) {
    // radius in m
    const radiusEarth = 6371; // in km
    double distanceLat = radians(userLat - zoneLat);
    double distanceLon = radians(userLng - zoneLng);
    num a = sin(distanceLat / 2) * sin(distanceLat / 2) +
        cos(radians(zoneLat)) *
            cos(radians(userLat)) *
            sin(distanceLon / 2) *
            sin(distanceLon / 2);
    num b = 2 * atan2(sqrt(a), sqrt(1 - a));
    num distance = radiusEarth * b;
    return ((distance * 1000) <= radius);
  }

  /// Check if position inside poly zone
  bool checkPolyZone(double userLat, double userLng, List<dynamic> posList) {
    List<LatLng> polygon = [];

    for (var element in posList) {
      polygon.add(LatLng(element[0], element[1]));
    }

    return PolygonUtil.containsLocation(
        LatLng(userLat, userLng), polygon, true);
  }
}
