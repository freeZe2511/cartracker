import 'dart:async';
import 'dart:convert';

import 'package:cartracker_backend/database/admin_dao.dart';
import 'package:cartracker_backend/database/user_dao.dart';
import 'package:cartracker_backend/database/zone_dao.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:shelf/shelf.dart';

import '../config.dart';

class AuthenticationController {

  /// LogIn Controller
  /// Checks if requested username and password are valid
  ///
  /// First check admin database, if no match user database, or error response
  /// Return JWT token and needed data
  Future<Response> login(Request request) async {
    if (request.isEmpty) return Response(400);
    var body = jsonDecode(await request.readAsString());

    String userName = body["username"];
    String password = body["password"];

    var a = await AdminDao.findOne(userName, password);

    if (a != null) {
      var token = returnJWT(userName);
      return Response(200, body: jsonEncode({
        "jwt": token,
        "role": "admin"
      }));
    } else {
      var b = await UserDao.findOne(userName, password);
      if (b == null) return Response(401);
      var zone = await ZoneDao.readOneByID(b.zoneid);
      var token = returnJWT(userName);
      return Response(200, body: jsonEncode({
        "jwt": token,
        "zone": zone,
        "userid": b.id
      }));
    }
  }

  /// Signing JWT token with key
  String returnJWT(String userName) {
    var jwt = JWT({"user": userName});
    var token = jwt.sign(SecretKey(Config.config["jwt_key"]!));
    return token;
  }
}
