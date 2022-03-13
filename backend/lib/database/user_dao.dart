import 'package:cartracker_backend/database/database.dart';
import 'package:mongo_dart/mongo_dart.dart';

class UserDao {
  static const String _collection = "users";

  UserDao._();

  static Future<void> create(User u) async {
    await Database.db
        .collection(_collection)
        .insert(u.toJson());
  }

  // todo: read without token
  static Future<User> readOne(String username) async {
    var u =
        await Database.db.collection(_collection).findOne(where.eq('username', username));
    return User.fromJson(u!); //null?
  }

  static Future<User> readOneByID(String userid) async {
    var u =
    await Database.db.collection(_collection).findOne(where.eq('id', userid));
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

  static Future<User?> findOne(String username, String password) async {
    try {
      var u = await Database.db
          .collection(_collection)
          .findOne(where.eq('username', username).eq('password', password));
      if (u != null) return User.fromJson(u);
    } catch (e) {
      print(e);
      return null;
    }
  }

  static Future<User?> findOne1(String uniqueID) async {
    try {
      var u = await Database.db
          .collection(_collection)
          .findOne(where.eq('id', uniqueID));
      if (u != null) return User.fromJson(u);
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

  static Future<String?> checkUsername(String username) async {
    try {
      var u = await Database.db
          .collection(_collection)
          .findOne(where.eq('username', username));
      if (u != null) return username;
    } catch (e) {
      print(e);
      return null;
    }
  }

  static Future<void> update(
      String id, String newUsername, String newPassword, String newZone) async {
    // return user?
    var modifier = ModifierBuilder();
    modifier.set("username", newUsername);
    modifier.set("password", newPassword);
    modifier.set("zoneid", newZone);
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
  final String status;
  final String zoneid;

  const User({required this.id, required this.username, required this.password, required this.token, required this.status, required this.zoneid});

  User.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        username = json['username'],
        password = json['password'],
        token = json['token'],
        status = json['status'],
        zoneid = json['zoneid'];

  Map<String, dynamic> toJson() => {
        'id': id,
        'username': username,
        'password': password,
        'token': token,
        'status': status,
        'zoneid': zoneid
      };
}
