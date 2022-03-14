import 'package:mongo_dart/mongo_dart.dart';
import 'package:cartracker_backend/config.dart';

/// MongoDB Database initialization
class Database {
  static late Db db;

  static Future<void> init() async {
    var host = Config.config["host"];
    var port = Config.config["port"];
    var dbName = Config.config["dbName"];
    var userName = Config.config["userName"];
    var password = Config.config["password"];

    db = Db("mongodb://$host:$port/$dbName?authSource=$dbName");
    await db.open();
    await db.authenticate(userName!, password!);

  }
}
