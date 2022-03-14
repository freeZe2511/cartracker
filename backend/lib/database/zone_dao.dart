import 'package:cartracker_backend/database/database.dart';
import 'package:mongo_dart/mongo_dart.dart';

class ZoneDao {
  static const String _collection = "zones";

  ZoneDao._();

  /// Insert zone into database
  static Future<void> create(Zone z) async {
    await Database.db
        .collection(_collection)
        .insert(z.toJson());
  }

  /// Read specific zone by id
  ///
  /// Returns Zone or null
  static Future<Zone?> readOneByID(String zoneid) async {
    var z =
    await Database.db.collection(_collection).findOne(where.eq('id', zoneid));
    if(z != null) return Zone.fromJson(z); //null?
    return null;
  }

  /// Read all zones in database
  ///
  /// Return list of zones
  static Future<List<Zone>> readAll() async {
    return Database.db
        .collection(_collection)
        .find()
        .map((doc) => Zone.fromJson(doc))
        .toList();
  }

  ///  Update zone with given parameters
  static Future<void> update(String id, String newName, int newRadius, List newPos) async {
    var modifier = ModifierBuilder();
    modifier.set("name", newName);
    modifier.set("radius", newRadius);
    modifier.set("pos", newPos);
    print(modifier);
    await Database.db
        .collection(_collection)
        .updateOne(where.eq('id', id), modifier);
  }

  /// Delete zone by id
  static Future<void> delete(String id) async {
    await Database.db
        .collection(_collection)
        .remove(where.eq('id', id));
  }

  /// Check if given zone is in database
  ///
  /// Returns zone id or null
  static Future<String> findOne(String id) async {
    try {
      var z = await Database.db
          .collection(_collection)
          .findOne(where.eq('id', id));
      if (z != null) {
        return Zone.fromJson(z).id;
      }
      return "1";
    } catch (e) {
      print(e);
      return "2";
    }
  }
}

/// Zone class with JSON de/encoding
class Zone {
  final String id;
  final String name;
  final int radius;
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

/// Pos class with JSON de/encoding
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
