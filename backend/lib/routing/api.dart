import 'package:cartracker_backend/controller/auth.dart';
import 'package:cartracker_backend/controller/position.dart';
import 'package:cartracker_backend/controller/users.dart';
import 'package:cartracker_backend/controller/zone.dart';
import 'package:shelf_plus/shelf_plus.dart';
import 'package:shelf_router/shelf_router.dart';

class Api {
  Router get router {
    // Controller to handle routes
    final authController = AuthenticationController();
    final posController = PositionController();
    final userController = UserController();
    final zoneController = ZoneController();

    // Router
    final router = Router();

    // Routes for Authentication
    router.post("/login", authController.login);
    // router.post("/logout", authController.logout);

    // Routes for GPS-related Data
    router.post(("/pos"), posController.createPos);
    router.get("/pos", posController.getLatestUserPos);
    router.get("/route/<id>&&<hours>&&<minutes>", posController.getRoute);

    // Routes for Zones
    router.post("/zone", zoneController.createZone);
    router.get("/zones", zoneController.getZones);
    router.put("/zone/<id>", zoneController.updateZone);
    router.delete("/zone/<id>", zoneController.deleteZone);

    // Routes for Users
    router.post("/user", userController.createUser);
    router.get("/users", userController.getUsers);
    router.put("/user/<id>", userController.updateUser);
    router.delete("/user/<id>", userController.deleteUser);

    return router;
  }
}
