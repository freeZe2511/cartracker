import 'package:cartracker_backend/controller/auth.dart';
import 'package:shelf_plus/shelf_plus.dart';
import 'package:shelf_router/shelf_router.dart';

class Auth {
  Router get router {
    // Controller to handle routes
    final authController = AuthenticationController();

    // Router
    final router = Router();

    // Routes for Authentication
    router.post("/login", authController.login);
    // router.post("/logout", authController.logout);

    return router;
  }
}

