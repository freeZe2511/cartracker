import 'dart:convert';

import 'package:cartracker_backend/database/coordinate_dao.dart';
import 'package:cartracker_backend/database/user_dao.dart';
import 'package:mongo_dart/mongo_dart.dart';
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
    var id = await UserDao.findOne(username, password);
    if (id != null) return Response(200, body: jsonEncode(id));
    return Response(404);
  }
}
