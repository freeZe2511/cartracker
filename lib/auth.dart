import 'dart:convert';

import 'package:cartracker_backend/user_dao.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

class Auth {
  Router get router {
    final router = Router();

    router.post("/login", _login);

    router.post("/create", _createUser);

    return router;
  }

  Future<Response> _login(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String username = body["username"];
    String password = body["password"];
    var id = await UserDao.findOne(username, password);
    if(id != null) return Response(200, body: jsonEncode(id));
    return Response(404);
  }

  Future<Response> _createUser(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String username = body["username"];
    String password = body["password"];
    await UserDao.create(User(id: Uuid().v4(), username: username, token: password));
    return Response(201, body: jsonEncode(username));
  }


}
