import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class InfoScreen extends StatefulWidget {
  const InfoScreen({Key? key}) : super(key: key);

  static const routeName = "/infoscreen";

  @override
  State<InfoScreen> createState() => _InfoScreenState();
}

class _InfoScreenState extends State<InfoScreen> {
  String userid = "";
  List<String> zoneList = [];
  String zoneId = "";
  String zoneName = "";
  String zoneRadius = "";
  String zonePos = "";
  String zonePosAmount = "";

  /// Get userid and zone from sharedPreferences
  _init() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    setState(() {
      zoneList = prefs.getStringList("zone")!;
      userid = prefs.getString("userid")!;

      zoneId = zoneList[0];
      zoneName = zoneList[1];
      zoneRadius = zoneList[2];
      zonePos = zoneList[3];
      zonePosAmount = zoneList[4];
    });
  }

  @override
  void initState() {
    super.initState();
    _init();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Info"),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "User: ",
            style: TextStyle(
                fontWeight: FontWeight.bold,
                decoration: TextDecoration.underline,
                decorationThickness: 2,
                fontSize: 20),
          ),
          Text(
            "ID: " + userid,
            style: TextStyle(
                fontSize: 15),
          ),
          Text(
            "Zone: ",
            style: TextStyle(
                fontWeight: FontWeight.bold,
                decoration: TextDecoration.underline,
                decorationThickness: 2,
                fontSize: 20),
          ),
          Text(
            "ID: " + zoneId,
            style: TextStyle(
                fontSize: 15),
          ),
          Text(
            "Name: " + zoneName,
            style: TextStyle(
                fontSize: 15),
          ),
          Text(
            "Radius: " + zoneRadius,
            style: TextStyle(
                fontSize: 15),
          ),
          Text(
            "Pos: " + zonePos,
            style: TextStyle(
                fontSize: 15),
          ),
        ],
      ),
    );
  }
}
