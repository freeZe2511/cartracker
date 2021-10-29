import 'package:cartracker_backend/database.dart';
import 'package:mongo_dart/mongo_dart.dart';


class UserDao {

  static const String _collection = "users";

  UserDao._();

  static create(User u) async {
    await Database.db.collection(_collection).insert(u.toJson()); // doppelte einträge?
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
    await Database.db.collection(_collection).remove(where.eq('id', id));
  }

  static Future<String?> findOne(String username, String password) async {
    try {
      var u = await Database.db.collection(_collection).findOne(where.eq('username', username).eq('password', password));
      if(u != null) return User.fromJson(u).id;
    } catch (e) {
      print(e);
      return null;
    }
  }

  static update(){

  }

}

class User {
  final String id;
  final String username;
  final String token;

  const User({required this.id, required this.username, required this.token});

  User.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        username = json['username'],
        token = json['password'];

  Map<String, dynamic> toJson() => {
    'id': id,
    'username': username,
    'password': token,
  };
}