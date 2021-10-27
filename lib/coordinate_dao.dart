import 'package:cartracker_backend/database.dart';
import 'package:mongo_dart/mongo_dart.dart';


class CoordinateDao {

  static const String _collection = "coords";

  CoordinateDao._();

  static insert(Coordinate c) async {
    await Database.db.collection(_collection).insert(c.toJson());
  }

  static Future<List<Map<String, dynamic>>?> getAll() async {
    try {
      return Database.db.collection(_collection).find().toList();
    } catch (e) {
      print(e);
      return null;
    }
  }

  static delete(String id) async {
    await Database.db.collection(_collection).remove(where.eq('_id', id));
  }

}

class Coordinate {
  final String id;
  final double lat;
  final double lng;

  const Coordinate({required this.id, required this.lat, required this.lng});

  Coordinate.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        lat = json['lat'],
        lng = json['lng'];

  Map<String, dynamic> toJson() => {
    'id': id,
    'lat': lat,
    'lng': lng,
  };
}