import 'dart:convert';

import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

import '../database/admin_dao.dart';

class AdminAuthentication {
  Router get router {
    final router = Router();

    router.post("/login", _login); // log out?

    // router.post("/create", _createUser);
    // router.get("/get/:id", _getUserByID);
    // router.get("/get/list", _getUserByIDList);
    // router.get("/get/all", _getAllUsers);
    // // router.put("/update/:id", _updateUserByID);
    // router.put("/update", _updateUserByID);
    // router.delete("/delete", _deleteUserByID); // delete by id list?
    // // router.delete("/delete/:id", _deleteUserByID);

    return router;
  }

  Future<Response> _login(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String username = body["username"];
    String password = body["password"];
    var id = await AdminDao.findOne(username, password);
    if (id != null) return Response(200, body: jsonEncode(id));
    return Response(404);
  }

// Future<Response> _createUser(Request request) async {
//   var body = jsonDecode(await request.readAsString());
//   String username = body["username"];
//   String password = body["password"];
//   await AdminDao.create(
//       Admin(id: Uuid().v4(), username: username, password: password)); // user id?
//   return Response(201, body: jsonEncode(username));
// }
//
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
//
// Future<Response> _updateUserByID(Request request) async {
//   var body = jsonDecode(await request.readAsString());
//   String id = body["id"];
//   String username = body["username"];
//   String password = body["password"];
//   await UserDao.update(id, username, password); // User
//   return Response(200);
// }
//
// Future<Response> _deleteUserByID(Request request) async {
//   // var param = request.params.entries.first;
//   var body = jsonDecode(await request.readAsString());
//   String id = body["id"];
//   await UserDao.delete(id);
//   await CoordinateDao.delete(id);   // delete all positions from user?
//   return Response(200);
// }
}
