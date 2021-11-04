import 'package:cartracker_backend/positions.dart';
import 'package:shelf_router/shelf_router.dart';

import 'admin_frontend.dart';
import 'user_authentication.dart';

class Api {
  Router get router {
    final router = Router();

    router.mount('/user/', UserAuthentication().router);
    router.mount('/pos/', Positions().router);
    router.mount('/admin/', AdminFrontend().router);

    return router;
  }
}
