import 'dart:convert';

import 'package:cartracker_backend/database/user_dao.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

class UserAuthentication {
  Router get router {
    final router = Router();

    router.post("/login", _login); // log out?

    return router;
  }

  Future<Response> _login(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String username = body["username"];
    String password = body["password"];
    var token = await UserDao.findOne(username, password);
    if (token != null) return Response(200, body: jsonEncode(token));
    return Response(404);
  }
}
