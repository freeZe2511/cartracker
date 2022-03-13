import 'dart:convert';

import 'package:cartracker_backend/database/admin_data_dao.dart';
import 'package:cartracker_backend/database/coordinate_dao.dart';
import 'package:cartracker_backend/database/user_dao.dart';
import 'package:cartracker_backend/database/zone_dao.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:shelf/shelf.dart';

class UserController {
  Future<Response> createUser(Request request) async {
    if (request.isEmpty) return Response(400);
    var body = jsonDecode(await request.readAsString());
    String username = body["username"];
    String password = body["password"];
    String zone = body["zoneid"];
    String zoneid = await ZoneDao.findOne(zone);

    if (await UserDao.checkUsername(username) == null) {
      String userID = Uuid().v4();
      await UserDao.create(User(
          id: userID,
          username: username,
          password: password,
          token: Uuid().v4(),
          status: "inactive",
          zoneid: zoneid));
      return Response(201, body: jsonEncode(userID));
    } else {
      return Response.forbidden('User already exists');
    }
  }

  Future<Response> getUsers(Request request) async {
    var res = await AdminDataDao.readFullUsersWithLatestPos();
    // var res = await UserDao.readAll();
    return Response(200, body: jsonEncode(res));
  }

  Future<Response> updateUser(Request request, String id) async {
    if (request.isEmpty) return Response(400);
    var body = jsonDecode(await request.readAsString());
    String username = body["username"];
    String password = body["password"];
    String zoneid = body["zoneid"]; //TODO check again if zone

    var res = await UserDao.checkUsername(username);
    if (await UserDao.checkUsername(username) == null) {
      await UserDao.update(id, username, password, zoneid); // User
      return Response(200);
    } else {
      return Response.forbidden('User already exists');
    }
  }

  Future<Response> deleteUser(Request request, String id) async {
    await UserDao.delete(id);
    await CoordinateDao.delete(id); // delete all positions from user?
    return Response(200);
  }
}
