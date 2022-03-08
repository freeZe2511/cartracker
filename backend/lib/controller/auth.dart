import 'dart:async';
import 'dart:convert';

import 'package:cartracker_backend/database/admin_dao.dart';
import 'package:cartracker_backend/database/user_dao.dart';
import 'package:cartracker_backend/database/zone_dao.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:shelf/shelf.dart';

class AuthenticationController {

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

  String returnJWT(String userName) {
    var jwt = JWT({"user": userName}); //TODO expire and reauth?
    var token = jwt.sign(SecretKey("super secret key"));
    return token;
  }
}

// Future<Response> logout(Request request) async {
//   // erst user dann admin tabelle checken? oder admin token schicken?
//   return Response(200);
// }
