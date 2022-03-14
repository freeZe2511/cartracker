import 'dart:convert';

import 'package:cartracker_backend/database/zone_dao.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:shelf/shelf.dart';

class ZoneController {
  /// Function to create zone and store in database
  Future<Response> createZone(Request request) async {
    var body = jsonDecode(await request.readAsString());

    String id = Uuid().v4();
    String name = body["name"];
    int radius = body["radius"];
    List<dynamic> pos = body["pos"];

    // fill temp position array
    List pos2 = []; // TODO List<Pos>
    for (var p in pos) {
      pos2.add(p);
    }

    // if zone is valid (either circle or polygon)
    if ((pos2.length == 1 && radius > 0) ||
        (pos2.length >= 3 && radius == 0)) {
      await ZoneDao.create(Zone(id: id, name: name, radius: radius, pos: pos2));

      return Response(201, body: jsonEncode(id));
    }
    return Response(400);
  }

  /// Function to get all zones from database
  Future<Response> getZones(Request request) async {
    var res = await ZoneDao.readAll();
    return Response(200, body: jsonEncode(res));
  }

  // Future<Response> getZoneByID(Request request, String id) async {
  //   return Response(200, body: jsonEncode(null));
  // }

  /// Function to update specific zone by id
  Future<Response> updateZone(Request request, String id) async {
    var body = jsonDecode(await request.readAsString());

    String name = body["name"];
    int radius = body["radius"];
    List<dynamic> pos = body["pos"];

    // fill temp position array
    List pos2 = []; // TODO List<Pos>
    for (var p in pos) {
      pos2.add(p);
    }

    // if zone is valid (either circle or polygon)
    if ((pos2.length == 1 && radius > 0) ||
        (pos2.length >= 3 && radius == 0)) {
      await ZoneDao.update(id, name, radius, pos2);
      return Response(200, body: jsonEncode(body));
    }
    return Response(400);
  }

  /// Function to delete specific zone by id
  Future<Response> deleteZone(Request request, String id) async {
    await ZoneDao.delete(id); //TODO was wenn user dieser zone zugeordnet ist? -> none
    return Response(200, body: jsonEncode(id));
  }
}
