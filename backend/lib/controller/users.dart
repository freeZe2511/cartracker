import 'dart:convert';

import 'package:cartracker_backend/controller/auth.dart';
import 'package:cartracker_backend/database/admin_data_dao.dart';
import 'package:cartracker_backend/database/coordinate_dao.dart';
import 'package:cartracker_backend/database/user_dao.dart';
import 'package:cartracker_backend/database/zone_dao.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:shelf/shelf.dart';

class UserController {
  Future<Response> createUser(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String username = body["username"];
    String password = body["password"];
    String zoneid = await ZoneDao.findOne(body["zoneid"]);

    String userID = Uuid().v4();
    await UserDao.create(User(
        id: userID,
        username: username,
        password: password,
        token: Uuid().v4(),
        status: "inactive",
        zoneid: zoneid));
    return Response(201, body: jsonEncode(userID));
  }

  Future<Response> getUsers(Request request) async {
    if(await AuthenticationController.verify(request)){
      var res = await AdminDataDao.readFullUsersWithLatestPos();
      // var res = await UserDao.readAll();
      return Response(200, body: jsonEncode(res));
    }
    return Response(401);

  }

  Future<Response> updateUser(Request request, String id) async {
    // auth?
    var body = jsonDecode(await request.readAsString());
    String username = body["username"];
    String password = body["password"];
    String zoneid = body["zoneid"]; //TODO check again if zone
    await UserDao.update(id, username, password, zoneid); // User
    return Response(200);
  }

  Future<Response> deleteUser(Request request, String id) async {
    // auth?
    await UserDao.delete(id);
    await CoordinateDao.delete(id); // delete all positions from user?
    return Response(200);
  }
}
