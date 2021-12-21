import 'package:shelf/shelf.dart';

class AuthenticationController {
  Future<Response> login(Request request) async {
    // erst user dann admin tabelle checken? oder admin token schicken?
    return Response(200);
  }

  Future<Response> logout(Request request) async {
    // erst user dann admin tabelle checken? oder admin token schicken?
    return Response(200);
  }

// Future<Response> _login(Request request) async {
//   var body = jsonDecode(await request.readAsString());
//   String username = body["username"];
//   String password = body["password"];
//   var token = await UserDao.findOne(username, password);
//   if (token != null) return Response(200, body: jsonEncode(token));
//   return Response(404);
// }

}
