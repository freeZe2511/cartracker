import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class InfoScreen extends StatefulWidget {
  const InfoScreen({Key? key}) : super(key: key);

  static const routeName = "/infoscreen";

  @override
  State<InfoScreen> createState() => _InfoScreenState();
}

class _InfoScreenState extends State<InfoScreen> {

  late String userid;
  late List<String> zoneList;

  _init() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    setState(() {
      zoneList = prefs.getStringList("zone")!;
      userid = prefs.getString("userid")!;
    });
  }

  @override
  void initState() {
    super.initState();
    userid = "";
    zoneList = [];
    _init();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Info"),
      ),
      body: Center(
        child: Column(
          children: [
            Text("User: " + userid),
            // TODO bug???
            if (zoneList.isNotEmpty) Text("Zone: " + zoneList[1]),
            if (zoneList.isNotEmpty && zoneList[1] != "None")
              Text("Radius: " + zoneList[2] + "m"),
            if (zoneList.isNotEmpty && zoneList.length > 3)
              Text("Center: " + zoneList[3] + " " + zoneList[4]),
          ],
        ),
      ),
    );
  }
}
