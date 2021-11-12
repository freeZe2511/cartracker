import 'package:cartracker_backend/database/database.dart';
import 'package:mongo_dart/mongo_dart.dart';

class AdminData {
  static const String _collectionUser = "users";
  static const String _collectionCoords = "coords";

  AdminData._();

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

  static Future<List<Map<String, dynamic>>> readAllUsers() async {
    // final pipeline = AggregationPipelineBuilder()
    //     .addStage(Lookup(
    //         from: "coords",
    //         localField: "id",
    //         foreignField: "id",
    //         as: "positions",))
    //     .build();

    final pipeline = AggregationPipelineBuilder()
        .addStage(Lookup.withPipeline(
          from: "coords",
          let: {"u_id": Field("id")},
          pipeline: [
            Match(Expr(Eq(Field("id"), Var("u_id")))),
            Sort({
              '_id': -1,
            }),
            Limit(1)
          ],
          as: "latest-pos",
        )).build();

    var a = await Database.db
        .collection(_collectionUser)
        .aggregateToStream(pipeline)
        .toList();
    return a;
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
