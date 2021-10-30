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
    
    router.get("/get/:id", _getUserByID);
    router.get("/get/list", _getUserByIDList);
    router.get("/get", _getAllUsers);
    router.delete("/delete", _deleteUserByID);
    // router.delete("/delete/:id", _deleteUserByID);
    // router.put("/update/:id", _updateUserByID);
    router.put("/update", _updateUserByID);

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
    await UserDao.create(User(id: Uuid().v4(), username: username, token: password));   // user id?
    return Response(201, body: jsonEncode(username));
  }
  
  Future<Response> _getUserByID(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String id = body["id"];
    User? user = await UserDao.readOne(id);
    return Response(200,body: jsonEncode(user));
  }

  Future<Response> _getUserByIDList(Request request) async {
    var body = jsonDecode(await request.readAsString());

    List<User> users = await UserDao.readMany(["1", "2"]);  //todo
    return Response(200,body: jsonEncode(users));
  }

  Future<Response> _getAllUsers(Request request) async {
    List<User> users = await UserDao.readAll();
    return Response(200, body: jsonEncode(users));
  }

  Future<Response> _deleteUserByID(Request request) async {
    // var param = request.params.entries.first;
    var body = jsonDecode(await request.readAsString());
    String id = body["id"];
    await UserDao.delete(id);
    return Response(200);
  }

  Future<Response> _updateUserByID(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String id = body["id"];
    String username = body["username"];
    String password = body["password"];
    await UserDao.update(id, username, password); // User
    return Response(200);
  }


}
