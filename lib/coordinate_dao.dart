import 'package:cartracker_backend/database.dart';
import 'package:mongo_dart/mongo_dart.dart';


class CoordinateDao {

  static const String _collection = "coords";

  CoordinateDao._();

  static insert(Coordinate c) async {
    await Database.db.collection(_collection).insert(c);
  }

  static Future<List<Map<String, dynamic>>?> get() async {
    try {
      return await Database.db.collection(_collection).find().toList();
    } catch (e) {
      print(e);
      return null;
    }
  }

  static delete(Coordinate c) async {
    await Database.db.collection(_collection).remove();
  }

}

class Coordinate {
  final int id;
  final double lat;
  final double lng;

  const Coordinate({required this.id, required this.lat, required this.lng});
}