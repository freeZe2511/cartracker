import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:uuid/uuid.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:flutter_background_geolocation/flutter_background_geolocation.dart'
as bg;

class HttpService {

  String url = 'https://h2876375.stratoserver.net:9090';

  logIn(){

    // send logIn data (username + pw)

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