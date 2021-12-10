import 'dart:convert';

import 'package:cartracker_backend/database/zone_dao.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:shelf/shelf.dart';

class ZoneController {

  Future<Response> createZone(Request request) async {
    var body = jsonDecode(await request.readAsString());

    String id = Uuid().v4();
    String name = body["name"];
    double radius = body["radius"];
    List<dynamic> pos = body["pos"];

    List pos2 = []; // TODO List<Pos>
    for (var p in pos){
      pos2.add(p);
    }

    if(pos2.length == 1 || pos2.length >= 3){
      await ZoneDao.create(Zone(
          id: id,
          name: name,
          radius: radius,
          pos: pos2));

      return Response(201, body: jsonEncode(id));
    }
    return Response(400);

  }

  Future<Response> getZones(Request request) async {
    var res = await ZoneDao.readAll();
    return Response(200, body: jsonEncode(res));
  }

  Future<Response> getZoneByID(
      Request request, String id, String limit) async {
    return Response(200, body: jsonEncode(null));
  }


}