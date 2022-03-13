import 'package:cartracker_backend/database/database.dart';
import 'package:mongo_dart/mongo_dart.dart';

class AdminDataDao {
  static const String _collectionUser = "users";
  static const String _collectionCoords = "coords";

  AdminDataDao._(); // TODO maybe rename, maybe complete refactor

  static Future<List<Map<String, dynamic>>> readFullUsersWithLatestPos() async {
    final pipeline = AggregationPipelineBuilder()
        .addStage(Lookup.withPipeline(
          from: _collectionCoords,
          let: {"u_id": Field("id")},
          pipeline: [
            Match(Expr(Eq(Field("id"), Var("u_id")))),
            Sort({
              '_id': -1,
            }),
            Limit(1)
          ],
          as: "latestPositions",
        ))
        .addStage(Project({"token": 0}))
        .build();

    return await Database.db
        .collection(_collectionUser)
        .aggregateToStream(pipeline)
        .toList();

    // return AdminData(data: data);
  }

  static Future<List<Map<String, dynamic>>> readBasicUsersWithLatestPositions(
      int limit) async {
    final pipeline = AggregationPipelineBuilder()
        .addStage(Lookup.withPipeline(
          from: _collectionCoords,
          let: {"u_id": Field("id")},
          pipeline: [
            Match(Expr(Eq(Field("id"), Var("u_id")))),
            Sort({
              '_id': -1,
            }),
            Limit(limit)
          ],
          as: "latestPositions",
        ))
        .addStage(Project({"_id": 0, "password": 0, "token": 0}))
        .build();

    return await Database.db
        .collection(_collectionUser)
        .aggregateToStream(pipeline)
        .toList();

    // return AdminData(data: data);
  }

  static Future<List<Map<String, dynamic>>> readBasicUserByID(
      String id, int limit) async {
    final pipeline = AggregationPipelineBuilder()
        .addStage(Match(Expr(Eq(Field("id"), id))))
        .addStage(Lookup.withPipeline(
          from: _collectionCoords,
          let: {"u_id": Field("id")},
          pipeline: [
            Match(Expr(Eq(Field("id"), Var("u_id")))),
            Sort({
              '_id': -1,
            }),
            Limit(limit)
          ],
          as: "latestPositions",
        ))
        .addStage(Project({"_id": 0, "password": 0, "token": 0}))
        .build();

    return await Database.db
        .collection(_collectionUser)
        .aggregateToStream(pipeline)
        .toList();

    // return AdminData(data: data);
  }
}

// class AdminData {
//   final Object data;
//
//   const AdminData({required this.data});
//
//   AdminData.fromJson(Object json)
//       : data = json;
//
//   Map<String, dynamic> toJson() => {
//     'data': data,
//   };
// }
