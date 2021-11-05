import 'package:cartracker_backend/app/positions.dart';
import 'package:shelf_router/shelf_router.dart';

import '../website/admin_frontend.dart';
import '../app/user_authentication.dart';

class Api {
  Router get router {
    final router = Router();

    router.mount('/user/', UserAuthentication().router);
    router.mount('/pos/', Positions().router);
    router.mount('/admin/', AdminFrontend().router);

    return router;
  }
}
