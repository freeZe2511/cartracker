import 'package:cartracker_backend/positions.dart';
import 'package:shelf_router/shelf_router.dart';

import 'authentication.dart';

class Api {
  Router get router {
    final router = Router();

    router.mount('/user/', Authentication().router);
    router.mount('/pos/', Positions().router);

    return router;
  }
}
