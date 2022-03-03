import 'dart:async';
import 'dart:convert';

import 'package:cartracker_backend/database/admin_dao.dart';
import 'package:cartracker_backend/database/user_dao.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:shelf/shelf.dart';

class AuthenticationController {
  // TODO refactor, very ugly, roles??
  Future<Response> login(Request request) async {
    //TODO erst user dann admin tabelle checken? oder zsm tabelle mit role (auch für authorization dann)?
    var body = jsonDecode(await request.readAsString());
    String uniqueX = body["uniqueX"];
    String password = body["password"];
    var a = await AdminDao.findOne1(uniqueX); //TODO just unique name?
    if (a == null) {
      var b = await UserDao.findOne1(uniqueX); // TODO
      if (b == null) return Response(401);
      var jwt = JWT({"uniqueX": uniqueX}); //TODO expire and reauth?
      var token = jwt.sign(SecretKey("super secret key"));
      return Response(200, body: jsonEncode(token));
    } else {
      if (password == a.password) {
        var jwt = JWT({"uniqueX": uniqueX}); //TODO expire and reauth?
        var token = jwt.sign(SecretKey("super secret key"));
        return Response(200, body: jsonEncode(token));
      }
    }

    return Response(500);
  }

// Future<Response> logout(Request request) async {
//   // erst user dann admin tabelle checken? oder admin token schicken?
//   return Response(200);
// }
}
