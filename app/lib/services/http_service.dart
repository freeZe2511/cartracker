import 'dart:convert';

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

    double lat = location.coords.latitude;
    double lng = location.coords.longitude;

    bool isMoving = location.isMoving;
    // inZone with location.geoFence ...

    final uri = Uri.parse(url + '/api/v1/pos');
    final headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token'
    };
    Map<String, dynamic> body = {
      'userid': userid,
      'lat': lat,
      'lng': lng
    }; // TODO more data in body like inZone

    http.Response res = await http.post(
      uri,
      headers: headers,
      body: json.encode(body),
      encoding: Encoding.getByName('utf-8'),
    );
  }
}
