import 'package:mongo_dart/mongo_dart.dart';

class Database {
  static const String host = "mongodb";
  static const String port = "27017";
  static const String dbName = "cartracker";
  static late Db db;

  static Future<void> init() async {
    db = Db("mongodb://$host:$port/$dbName");
    await db.open();
  }
}
