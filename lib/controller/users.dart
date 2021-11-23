import 'dart:convert';

import 'package:cartracker_backend/database/admin_data_dao.dart';
import 'package:cartracker_backend/database/coordinate_dao.dart';
import 'package:cartracker_backend/database/user_dao.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:shelf/shelf.dart';

class UserController {
  Future<Response> createUser(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String username = body["username"];
    String password = body["password"];
    await UserDao.create(User(
        id: Uuid().v4(),
        username: username,
        password: password,
        token: Uuid().v4())); // user id?
    return Response(201, body: jsonEncode(username));
  }

  Future<Response> getUsers(Request request) async {
    var res = await AdminDataDao.readFullUsersWithLatestPos();
    return Response(200, body: jsonEncode(res));
  }

  Future<Response> updateUser(Request request, String id) async {
    // auth?
    var body = jsonDecode(await request.readAsString());
    String username = body["username"];
    String password = body["password"];
    await UserDao.update(id, username, password); // User
    return Response(200);
  }

  Future<Response> deleteUser(Request request, String id) async {
    // auth?
    await UserDao.delete(id);
    await CoordinateDao.delete(id); // delete all positions from user?
    return Response(200);
  }
}
