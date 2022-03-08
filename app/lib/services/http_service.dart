import 'dart:convert';
import 'dart:math';
import 'package:vector_math/vector_math.dart';

import 'package:flutter_background_geolocation/flutter_background_geolocation.dart'
    as bg;
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class HttpService {
  // http for debugging else https
  String url = 'https://tim-eggers.de:9090';

  Future<bool> logIn(String username, String password) async {
    bool authorized = false;
    SharedPreferences prefs = await SharedPreferences.getInstance();

    final uri = Uri.parse(url + '/auth/login');
    final headers = {'Content-Type': 'application/json'};
    Map<String, dynamic> body = {'username': username, 'password': password};

    http.Response res = await http.post(
      uri,
      headers: headers,
      body: json.encode(body),
      encoding: Encoding.getByName('utf-8'),
    );

    body = jsonDecode(res.body);
    var zone = body["zone"];
    List<String> zoneList = [
      zone["id"],
      zone["name"],
      zone["radius"].toString(),
      zone["pos"][0]["lat"].toString(),
      zone["pos"][0]["lng"].toString()
    ];

    switch (res.statusCode) {
      case 200:
        authorized = true;
        prefs.setString("jwt", body["jwt"]);
        prefs.setString("userid", body["userid"]);
        prefs.setStringList("zone", zoneList);
        break;
      default:
        break;
    }

    return authorized;
  }

  logOut() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.clear();
  }

  postPosition(bg.Location location) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String token = prefs.getString("jwt")!;
    String userid = prefs.getString("userid")!;
    List<String> zoneList = prefs.getStringList("zone")!;

    double lat = location.coords.latitude;
    double lng = location.coords.longitude;

    double speed = location.coords.speed;

    bool isMoving = location.isMoving;
    bool inZone = isInZone(userid, lat, lng, zoneList); // with bg geofences??

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
      // 'speed': speed
      // 'isMoving': isMoving
    }; // TODO more data in body like inZone

    http.Response res = await http.post(
      uri,
      headers: headers,
      body: json.encode(body),
      encoding: Encoding.getByName('utf-8'),
    );
  }

  bool isInZone(String userid, double lat, double lng, List<String> zoneList) {
    if (zoneList[0] == "1") return true;
    // circular fences/zones
    if (double.parse(zoneList[2]) > 0) {
      return checkCircleZone(double.parse(zoneList[3]), double.parse(zoneList[4]), lat,
          lng, num.parse(zoneList[2]));
    } else {
      // todo special fences
      return false;
    }
  }

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
}
