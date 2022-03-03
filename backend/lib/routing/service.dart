import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

import 'api.dart';
import 'auth.dart';

class Service {
  Handler get handler {
    final router = Router();


    router.mount('/auth/', Auth().router);
    router.mount('/api/', Api().router);

    return router;
  }
}
