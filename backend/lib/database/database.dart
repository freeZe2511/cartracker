import 'package:mongo_dart/mongo_dart.dart';

/// MongoDB Database initialization
class Database {
  static const String host = "mongodb";
  static const String port = "27017";
  static const String dbName = "cartracker";
  static late Db db;
  static const String userName = "myuserAdmin";
  static const String password = "admin123";


  static Future<void> init() async {
    db = Db("mongodb://$host:$port/$dbName");
    await db.open();
    // TODO
    // await db.authenticate(userName, password);

  }
}
