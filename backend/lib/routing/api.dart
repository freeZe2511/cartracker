import 'package:cartracker_backend/controller/position.dart';
import 'package:cartracker_backend/controller/users.dart';
import 'package:cartracker_backend/controller/zone.dart';
import 'package:cartracker_backend/routing/utils.dart';
import 'package:shelf_plus/shelf_plus.dart';
import 'package:shelf_router/shelf_router.dart';

class Api {
  Handler get router {
    // Controller to handle routes
    final posController = PositionController();
    final userController = UserController();
    final zoneController = ZoneController();

    // Router
    final router = Router();

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

    // Check Authentication
    final handler = Pipeline().addMiddleware(checkAuth()).addHandler(router);

    return handler;
  }
}
