import 'package:cartracker_backend/controller/auth.dart';
import 'package:shelf_plus/shelf_plus.dart';
import 'package:shelf_router/shelf_router.dart';

/// Auth class handles auth requests
class Auth {
  Router get router {
    final authController = AuthenticationController();
    final router = Router();

    // Routes for Authentication
    router.post("/login", authController.login);

    return router;
  }
}

