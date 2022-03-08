import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:uuid/uuid.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:flutter_background_geolocation/flutter_background_geolocation.dart'
as bg;

class HttpService {

  String url = 'https://tim-eggers.de:9090';

  logIn(String username, String password) async {

    // send logIn data (username + pw)
    print(username + password);

    final uri = Uri.parse(url + '/auth/login');
    final headers = {'Content-Type': 'application/json'};
    Map<String, dynamic> body = {
      'username': username,
      'password': password
    };

    http.Response res = await http.post(
      uri,
      headers: headers,
      body: json.encode(body),
      encoding: Encoding.getByName('utf-8'),
    );

    print(res.body);

    //
    // switch (res.statusCode) {
    //   case 200:
    //     authorized = !authorized;
    //     SharedPreferences prefs = await SharedPreferences.getInstance();
    //     prefs.setString("userid", jsonDecode(res.body));
    //     break;
    //   default:
    //     _authFail();
    //     break;
    // }

    // get jwt + zone -> save in prefs

  }

  postPosition(bg.Location location) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    double lat = location.coords.latitude;
    double lng = location.coords.longitude;

    bool isMoving = location.isMoving;
    // inZone with location.geoFence ...

    final uri =
    Uri.parse(url + '/api/pos');
    final headers = {'Content-Type': 'application/json'}; // TODO token jwt
    Map<String, dynamic> body = {'lat': lat, 'lng': lng}; // TODO more data in body like inZone

    http.Response res = await http.post(
      uri,
      headers: headers,
      body: json.encode(body),
      encoding: Encoding.getByName('utf-8'),
    );

    print(res);
  }

}