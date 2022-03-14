import 'package:cartracker_backend/database/database.dart';
import 'package:mongo_dart/mongo_dart.dart';

class AdminDao {
  static const String _collection = "admins";

  AdminDao._();

  // TODO sub admins?
  static Future<void> create(Admin a) async {
    await Database.db
        .collection(_collection)
        .insert(a.toJson());
  }

  /// Function to check if given username and password match in database
  ///
  /// If valid return id, else null
  static Future<String?> findOne(String username, String password) async {
    try {
      var u = await Database.db
          .collection(_collection)
          .findOne(where.eq('username', username).eq('password', password));
      if (u != null) return Admin.fromJson(u).id;
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
