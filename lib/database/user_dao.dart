import 'package:cartracker_backend/database/database.dart';
import 'package:mongo_dart/mongo_dart.dart';

class UserDao {
  static const String _collection = "users";

  UserDao._();

  static Future<void> create(User u) async {
    await Database.db
        .collection(_collection)
        .insert(u.toJson()); // doppelte einträge?
  }

  // todo: read without token
  static Future<User> readOne(String username) async {
    var u =
        await Database.db.collection(_collection).findOne(where.eq('username', username));
    return User.fromJson(u!); //null?
  }

  static Future<List<User>> readMany(List<String> usernames) async {
    return Database.db
        .collection(_collection)
        .find({
          "username": {"\$in": usernames}
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
      if (u != null) return User.fromJson(u).token;
    } catch (e) {
      print(e);
      return null;
    }
  }

  static Future<String?> checkID(String userid) async {
    // todo other find method?
    try {
      var u = await Database.db
          .collection(_collection)
          .findOne(where.eq('id', userid));
      if (u != null) return userid;
    } catch (e) {
      print(e);
      return null;
    }
  }

  static Future<void> update(
      String id, String newUsername, String newPassword) async {
    // return user?
    var modifier = ModifierBuilder();
    modifier.set("username", newUsername);
    modifier.set("password", newPassword);
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
  final String token;

  const User({required this.id, required this.username, required this.password, required this.token});

  User.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        username = json['username'],
        password = json['password'],
        token = json['token'];

  Map<String, dynamic> toJson() => {
        'id': id,
        'username': username,
        'password': password,
        'token': token
      };
}
