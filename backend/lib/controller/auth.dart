import 'dart:async';
import 'dart:convert';

import 'package:cartracker_backend/database/admin_dao.dart';
import 'package:shelf/shelf.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';

class AuthenticationController {
  Future<Response> login(Request request) async {
    //TODO erst user dann admin tabelle checken? oder zsm tabelle mit role (auch für authorization dann)?
    var body = jsonDecode(await request.readAsString());
    String uniqueX = body["uniqueX"];
    String password = body["password"];
    var a = await AdminDao.findOne1(uniqueX); //TODO just unique name?
    if (a == null) return Response(401);
    if (password == a.password) {
      var jwt = JWT({"uniqueX": uniqueX});
      var token = jwt.sign(SecretKey("super secret key"));
      return Response(200, body: jsonEncode(token));
    }
    return Response(500);
  }

  Future<Response> logout(Request request) async {
    // erst user dann admin tabelle checken? oder admin token schicken?
    return Response(200);
  }

  // static FutureOr<Response?> handle(Request request) async {
  //   print(request.url.toString());
  //   (request.url.toString() == "api/v1/login")
  //       ? AuthenticationController.auth(request)
  //       : AuthenticationController.verify(request);
  // }
  //
  // static FutureOr<Response> auth(Request request) async {
  //   print("auth " + request.toString());
  //   try {
  //     var body = jsonDecode(await request.readAsString());
  //
  //     String uniqueX = body["uniqueX"];
  //     String password = body["password"];
  //
  //     var a = await AdminDao.findOne2(uniqueX, password);
  //     if (a == null) throw Exception();
  //
  //     var jwt = JWT({"uniqueX": uniqueX});
  //     var token = jwt.sign(SecretKey("super secret key"));
  //     return Response(200, body: jsonEncode(token));
  //
  //   } catch (e) {
  //     print("auth " + e.toString());
  //     return Response(401);
  //   }
  // }
  //
  // static FutureOr<Response?> verify(Request request) async {
  //   print("verify " + request.toString());
  //   try {
  //     String token = request.headers["Authorization"]!.replaceAll("Bearer ", "");
  //     var jwt = JWT.verify(token, SecretKey("super secret key"));
  //     return null;
  //   } catch (e) {
  //     print("verify " + e.toString());
  //     return Response.forbidden("nonono");
  //   }
  //
  // }
}
