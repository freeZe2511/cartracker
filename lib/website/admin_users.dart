import 'dart:convert';

import 'package:cartracker_backend/database/coordinate_dao.dart';
import 'package:cartracker_backend/database/user_dao.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

import '../database/admin_dao.dart';

class AdminUsers {
  Router get router {
    final router = Router();

    // router.get("/user/:id", _getUserByID);
    // router.get("/userlist", _getUserByIDList);
    router.get("/users", _getAllUsers);
    // // router.put("/update/:id", _updateUserByID);
    // router.put("/update", _updateUserByID);
    // router.delete("/delete", _deleteUserByID); // delete by id list?
    // // router.delete("/delete/:id", _deleteUserByID);

    router.post("/create", _createUser);
    // router.get("/get/:id", _getUserByID);
    // router.get("/get/list", _getUserByIDList);
    // router.get("/get/all", _getAllUsers);
    // router.put("/update/:id", _updateUserByID);
    router.put("/update", _updateUserByID);
    router.delete("/delete", _deleteUserByID); // delete by id list?
    // router.delete("/delete/:id", _deleteUserByID);

    return router;
  }

  Future<Response> _getAllUsers(Request request) async {
    var body = jsonDecode(await request.readAsString());

    // username pw

    return Response(200);
  }

// Future<Response> _getUserByID(Request request) async {
//   var body = jsonDecode(await request.readAsString());
//   String id = body["id"]; // from parameter!
//   User user = await UserDao.readOne(id);
//   return Response(200, body: jsonEncode(user));
// }

  Future<Response> _createUser(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String username = body["username"];
    String password = body["password"];
    await UserDao.create(
        User(id: Uuid().v4(), username: username, password: password)); // user id?
    return Response(201, body: jsonEncode(username));
  }

  // Future<Response> _getUserByID(Request request) async {
  //   var body = jsonDecode(await request.readAsString());
  //   String id = body["id"]; // from parameter!
  //   User user = await UserDao.readOne(id);
  //   return Response(200, body: jsonEncode(user));
  // }
  //
  // Future<Response> _getUserByIDList(Request request) async {
  //   var body = jsonDecode(await request.readAsString());
  //   //todo
  //   List<User> users = await UserDao.readMany(["1", "2"]);
  //   return Response(200, body: jsonEncode(users));
  // }
  //
  // Future<Response> _getAllUsers(Request request) async {
  //   List<User> users = await UserDao.readAll();
  //   return Response(200, body: jsonEncode(users));
  // }

  Future<Response> _updateUserByID(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String id = body["id"];
    String username = body["username"];
    String password = body["password"];
    await UserDao.update(id, username, password); // User
    return Response(200);
  }

  Future<Response> _deleteUserByID(Request request) async {
    // var param = request.params.entries.first;
    var body = jsonDecode(await request.readAsString());
    String id = body["id"];
    await UserDao.delete(id);
    await CoordinateDao.delete(id);   // delete all positions from user?
    return Response(200);
  }

}
