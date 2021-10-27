import 'package:cartracker_backend/database.dart';
import 'package:mongo_dart/mongo_dart.dart';


class UserDao {

  static const String _collection = "coords";

  UserDao._();

  static insert(User c) async {
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

class User {
  final String id;
  final String username;
  final String password;

  const User({required this.id, required this.username, required this.password});

  User.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        username = json['username'],
        password = json['password'];

  Map<String, dynamic> toJson() => {
    'id': id,
    'username': username,
    'password': password,
  };
}