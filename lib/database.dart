import 'package:mongo_dart/mongo_dart.dart';

class Database {

  static late Database instance;
  final String host = "mongodb";
  final String port = "27017";
  final String dbName = "cartracker";
  late Db db;

  static getInstance() {
    return instance;
  }

  Future<Db> getConnection() async {
    try {
      db = Db("mongodb://$host:$port/$dbName");
      await db.open();
    } catch (e) {
      print(e);
    }
    return db;
  }

  closeConnection() {
    db.close();
  }
}