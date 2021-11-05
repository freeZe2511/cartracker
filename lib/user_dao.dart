import 'package:cartracker_backend/database.dart';
import 'package:mongo_dart/mongo_dart.dart';

class UserDao {
  static const String _collection = "users";

  UserDao._();

  static Future<void> create(User u) async {
    await Database.db
        .collection(_collection)
        .insert(u.toJson()); // doppelte einträge?
  }

  static Future<User> readOne(String id) async {
    var u =
        await Database.db.collection(_collection).findOne(where.eq('id', id));
    return User.fromJson(u!); //null?
  }

  static Future<List<User>> readMany(List<String> ids) async {
    return Database.db
        .collection(_collection)
        .find({
          "id": {"\$in": ids}
        })
        .map((doc) => User.fromJson(doc))
        .toList();
  }

  static Future<List<User>> readAll() async {
    return Database.db
        .collection(_collection)
        .find()
        .map((doc) => User.fromJson(doc))
        .toList();
  }

  static Future<String?> findOne(String username, String password) async {
    try {
      var u = await Database.db
          .collection(_collection)
          .findOne(where.eq('username', username).eq('password', password));
      if (u != null) return User.fromJson(u).id;
    } catch (e) {
      print(e);
      return null;
    }
  }

  static Future<void> update(
      String id, String username, String password) async {
    // return user?
    var modifier = ModifierBuilder();
    modifier.set("username", username);
    modifier.set("password", password);
    print(modifier);
    await Database.db
        .collection(_collection)
        .updateOne(where.eq('id', id), modifier);
  }

  static Future<void> delete(String id) async {
    await Database.db
        .collection(_collection)
        .remove(where.eq('id', id)); // return user?
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
