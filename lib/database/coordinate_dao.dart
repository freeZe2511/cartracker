import 'package:cartracker_backend/database/database.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:objectid/objectid.dart' as obj_id;

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

  //TODO: Has to be tested
  static Future<List<Coordinate>> readRoute(String id, int timeInHours, int timeInMinutes) async {
    obj_id.ObjectId myObjID = obj_id.ObjectId.fromTimestamp(
        DateTime.now().subtract(Duration(hours: timeInHours, minutes: timeInMinutes)));
    print(myObjID);
    return Database.db
        .collection(_collection)
        .find(
          {
            'id': { '\$eq': id},
            '_id': { '\$gt': myObjID} // TODO
          }
        )
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
