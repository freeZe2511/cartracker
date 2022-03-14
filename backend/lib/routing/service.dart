import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

import 'api.dart';
import 'auth.dart';

/// Service class to mount api routes
/// Separation for auth and api data for Authentication Middleware
class Service {
  Handler get handler {
    final router = Router();

    router.mount('/auth/', Auth().router);
    router.mount('/api/v1/', Api().router);

    return router;
  }
}
