import 'package:cartracker_backend/database/database.dart';
import 'package:mongo_dart/mongo_dart.dart';

class AdminDao {
  static const String _collection = "admins";

  AdminDao._();

  static Future<void> create(Admin a) async {
    await Database.db
        .collection(_collection)
        .insert(a.toJson()); // doppelte einträge?
  }

  // static Future<Admin> readOne(String id) async {
  //   var a =
  //   await Database.db.collection(_collection).findOne(where.eq('id', id));
  //   return Admin.fromJson(a!); //null?
  // }
  //
  // static Future<List<Admin>> readMany(List<String> ids) async {
  //   return Database.db
  //       .collection(_collection)
  //       .find({
  //     "id": {"\$in": ids}
  //   })
  //       .map((doc) => Admin.fromJson(doc))
  //       .toList();
  // }
  //
  // static Future<List<Admin>> readAll() async {
  //   return Database.db
  //       .collection(_collection)
  //       .find()
  //       .map((doc) => Admin.fromJson(doc))
  //       .toList();
  // }

  static Future<Admin?> findOne(String username, String password) async {
    try {
      var u = await Database.db
          .collection(_collection)
          .findOne(where.eq('username', username).eq('password', password));
      if (u != null) return Admin.fromJson(u);
    } catch (e) {
      print(e);
      return null;
    }
  }

  static Future<Admin?> findOne1(String uniqueID) async {
    try {
      var u = await Database.db
          .collection(_collection)
          .findOne(where.eq('id', uniqueID));
      if (u != null) return Admin.fromJson(u);
    } catch (e) {
      print(e);
      return null;
    }
  }

  static Future<Admin?> findOne2(String id, String password) async {
    try {
      var u = await Database.db
          .collection(_collection)
          .findOne(where.eq('id', id).eq('password', password));
      if (u != null) return Admin.fromJson(u);
    } catch (e) {
      print(e);
      return null;
    }
  }

  // static Future<void> update(
  //     String id, String username, String password) async {
  //   // return user?
  //   var modifier = ModifierBuilder();
  //   modifier.set("username", username);
  //   modifier.set("password", password);
  //   print(modifier);
  //   await Database.db
  //       .collection(_collection)
  //       .updateOne(where.eq('id', id), modifier);
  // }
  //
  // static Future<void> delete(String id) async {
  //   await Database.db
  //       .collection(_collection)
  //       .remove(where.eq('id', id)); // return user?
  // }
}

class Admin {
  final String id;
  final String username;
  final String password;

  const Admin({required this.id, required this.username, required this.password});

  Admin.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        username = json['username'],
        password = json['password'];

  Map<String, dynamic> toJson() => {
    'id': id,
    'username': username,
    'password': password,
  };
}
