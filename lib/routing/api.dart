import 'package:cartracker_backend/controller/auth.dart';
import 'package:cartracker_backend/controller/map.dart';
import 'package:cartracker_backend/controller/position.dart';
import 'package:cartracker_backend/controller/users.dart';
import 'package:cartracker_backend/controller/zone.dart';
import 'package:shelf_router/shelf_router.dart';

class Api {
  Router get router {
    final router = Router();
    final userController = UserController();
    final mapController = MapController();
    final posController = PositionController();
    final authController = AuthenticationController();
    final zoneController = ZoneController();

    router.post("/login", authController.login); //admin und user zsm
    // TODO logout

    router.post(("/pos"), posController.createPos);

    router.get("/route/<id>&&<hours>&&<minutes>", posController.getRoute);

    router.get("/map/<limit>", mapController.getMap);
    router.get("/map/<id>&<limit>", mapController.getMapUserByID); //TODO needed?

    router.post("/zone", zoneController.createZone);
    router.get("/zones", zoneController.getZones);
    router.get("/zones/<id>", zoneController.getZoneByID); // TODO needed?
    // TODO update + delete?

    router.post("/user", userController.createUser);
    router.get("/users", userController.getUsers);
    //router.get("users", userServive.getUsers); // by list und/oder id
    router.put("/user/<id>", userController.updateUser);
    router.delete("/user/<id>", userController.deleteUser);

    return router;
  }
}
