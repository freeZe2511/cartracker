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

  Middleware checkAuth({
    FutureOr<Response?> Function(Request)? requestHandler,
    FutureOr<Response> Function(Response)? responseHandler,
    FutureOr<Response> Function(Object error, StackTrace)? errorHandler,
  }) {
    requestHandler ??= (request) => null;
    responseHandler ??= (response) => response;

    FutureOr<Response> Function(Object, StackTrace)? onError;
    if (errorHandler != null) {
      onError = (error, stackTrace) {
        if (error is HijackException) throw error;
        return errorHandler(error, stackTrace);
      };
    }

    return (Handler innerHandler) {
      return (request) {
        return Future.sync(() => requestHandler!(request)).then((response) {
          if (response != null) return response;

          return Future.sync(() => innerHandler(request))
              .then((response) => responseHandler!(response), onError: onError);
        });
      };
    };
  }
}
