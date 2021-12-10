import 'dart:ffi';

import 'package:cartracker_backend/database/database.dart';
import 'package:mongo_dart/mongo_dart.dart';

class ZoneDao {
  static const String _collection = "zones";

  ZoneDao._();

  static Future<void> create(Zone z) async {
    await Database.db
        .collection(_collection)
        .insert(z.toJson());
  }

  static Future<List<Zone>> readAll() async {
    return Database.db
        .collection(_collection)
        .find()
        .map((doc) => Zone.fromJson(doc))
        .toList();
  }

  static Future<void> delete(String id) async {
    await Database.db
        .collection(_collection)
        .remove(where.eq('id', id));
  }
}

class Zone {
  final String id;
  final String name;
  final double radius;
  final List pos;  //TODO

  const Zone({required this.id, required this.name, required this.radius, required this.pos});

  Zone.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        name = json['name'],
        radius = json['radius'],
        pos = json['pos'];

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'radius': radius,
    'pos': pos
  };
}

class Pos {
  final double lat;
  final double lng;

  const Pos({required this.lat, required this.lng});

  Pos.fromJson(Map<String, dynamic> json)
      : lat = json['lat'],
        lng = json['lng'];

  Map<String, dynamic> toJson() => {
    'lat': lat,
    'lng': lng
  };
}
