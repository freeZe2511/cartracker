import 'dart:io';

import 'package:cartracker_backend/website/admin_users.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:shelf/shelf_io.dart' as io;
import 'package:shelf_static/shelf_static.dart';

import 'admin_authentication.dart';
import 'admin_map.dart';

class AdminFrontend {
  Router get router {
    final router = Router();

    router.mount("/auth/", AdminAuthentication().router);
    router.mount("/user/", AdminUsers().router);
    router.mount("/map/", AdminMap().router);

    return router;
  }

}
