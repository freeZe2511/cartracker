import 'dart:io';

import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:shelf/shelf_io.dart' as io;
import 'package:shelf_static/shelf_static.dart';

import 'admin_authentication.dart';

class AdminFrontend {
  Router get router {
    final router = Router();

    router.mount("/auth/", AdminAuthentication().router);
    // router.mount("/data/", Data().router);

    router.get("/assets/<file|.*>", createStaticHandler('admin_frontend_files'));
    router.get("/node_modules/<file|.*>", createStaticHandler('admin_frontend_files'));
    router.get("/", _indexing);
    router.get("/home", _homeing);

    return router;
  }

  Response _indexing(Request request) {
    final indexFile = File('admin_frontend_files/index.html').readAsStringSync();
    return Response(200, body: indexFile, headers: {'content-type':'text/html'});
  }

  Response _homeing(Request request) {
    final indexFile = File('admin_frontend_files/home.html').readAsStringSync();
    return Response(200, body: indexFile, headers: {'content-type':'text/html'});
  }
}
