import 'package:cartracker_backend/database/database.dart';
import 'package:mongo_dart/mongo_dart.dart';

class CoordinateDao {
  static const String _collection = "coords";

  CoordinateDao._();

  static Future<void> create(Coordinate c) async {
    await Database.db.collection(_collection).insert(c.toJson());
  }

  static Future<List<Coordinate>> readMany(String id, int limit) async {
    return Database.db
        .collection(_collection)
        .find(where.eq('id', id).limit(limit)) //limit?
        .map((doc) => Coordinate.fromJson(doc))
        .toList();
  }

  static Future<List<Coordinate>> readRoute(
      String id, int timeInHours, int timeInMinutes) async {
    DateTime timestamp = DateTime.now()
        .subtract(Duration(hours: timeInHours, minutes: timeInMinutes));

    int seconds = timestamp.millisecondsSinceEpoch ~/ 1000;
    String secondsInHex = seconds.toRadixString(16);

    return Database.db
        .collection(_collection)
        .find({
          'id': {'\$eq': id},
          '_id': {'\$gt': ObjectId.parse(secondsInHex + "0000000000000000")}
        })
        .map((doc) => Coordinate.fromJson(doc))
        .toList();
  }

  static Future<List<Coordinate>> readAll() async {
    return Database.db
        .collection(_collection)
        .find()
        .map((doc) => Coordinate.fromJson(doc))
        .toList();
  }

  static Future<void> delete(String id) async {
    //return coord?
    await Database.db.collection(_collection).remove(where.eq('id', id));
  }
}

class Coordinate {
  final String id;
  final double lat;
  final double lng;
  final bool inZone;
  final double speed;

  const Coordinate(
      {required this.id,
      required this.lat,
      required this.lng,
      required this.inZone,
      required this.speed});

  Coordinate.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        lat = json['lat'],
        lng = json['lng'],
        inZone = json['inZone'],
        speed = json['speed'];

  Map<String, dynamic> toJson() =>
      {'id': id, 'lat': lat, 'lng': lng, 'inZone': inZone, 'speed': speed};
}
