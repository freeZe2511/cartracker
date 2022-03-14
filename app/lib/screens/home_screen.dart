import 'dart:convert';

import 'package:cartracker_app/custom/drawer.dart';
import 'package:flutter/material.dart';

import 'package:flutter_background_geolocation/flutter_background_geolocation.dart'
    as bg;

import 'package:cartracker_app/services/http_service.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

JsonEncoder encoder = JsonEncoder.withIndent("     ");

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  static const routeName = '/homescreen';

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {

  late int counter;
  http.HttpService httpService = http.HttpService();

  late bool _enabled;
  late String _content;

  late String userid;
  late List<String> zoneList;

  @override
  void initState() {
    super.initState();
    _content = "    Enable the switch to begin tracking.";
    _enabled = false;
    _content = '';

    counter = 0;
    userid = "";
    zoneList = [];
    _init();
    _initPlatformState();
    _onClickGetCurrentPosition();
  }

  @override
  void dispose() {
    super.dispose();
  }

  /// Get stored userid and zoneList from sharedPreferences
  _init() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    zoneList = prefs.getStringList("zone")!;
    userid = prefs.getString("userid")!;

  }

  /// Init GPS background location
  void _initPlatformState() {
    // 1.  Listen to events (See docs for all 12 available events).
    bg.BackgroundGeolocation.onLocation(_onLocation, _onLocationError);

    bg.BackgroundGeolocation.ready(bg.Config(
      desiredAccuracy: bg.Config.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10.0,
      stopOnTerminate: false, // false
      startOnBoot: true,
      // reset: true,
      // debug: true,
      // logLevel: bg.Config.LOG_LEVEL_VERBOSE
    )).then((bg.State state) {
      if (!state.enabled) {
        setState(() {
          _enabled = state.enabled;
        });
      }
    });
  }

  /// Start/ Stop GPS background location
  void _onClickEnable(enabled) {
    if (enabled) {
      // Reset odometer.
      bg.BackgroundGeolocation.start().then((bg.State state) {
        print('[start] success $state');
        setState(() {
          _enabled = state.enabled;
        });
      }).catchError((error) {
        print('[start] ERROR: $error');
      });
    } else {
      bg.BackgroundGeolocation.stop().then((bg.State state) {
        print('[stop] success: $state');

        setState(() {
          _enabled = state.enabled;
        });
      });
    }
  }

  /// Manually fetch the current position
  void _onClickGetCurrentPosition() {
    bg.BackgroundGeolocation.getCurrentPosition(
            persist: true, // <-- do persist this location
            desiredAccuracy: 0, // <-- desire best possible accuracy
            timeout: 30, // <-- wait 30s before giving up.
            samples: 1 // <-- sample 3 location before selecting best.
            )
        .then((bg.Location location) {
    }).catchError((error) {
    });
  }

  /// Handler when location detected
  void _onLocation(bg.Location location) {
    print('[location] - $location');

    if(mounted){
      setState(() {
        _content = encoder.convert(location.toMap());
        counter += 1;
      });
    }
    httpService.postPosition(location);

  }

  /// Handler when location error detected
  void _onLocationError(bg.LocationError error) {
    print('[location] ERROR - $error');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Home"),
      ),
      body: Text(_content),
      drawer: CustomDrawer(),
      floatingActionButton: FloatingActionButton(
        onPressed: _onClickGetCurrentPosition,
        child: Icon(Icons.gps_fixed),
        backgroundColor: Colors.redAccent,
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: BottomAppBar(
        color: Colors.blue,
        child: IconTheme(
          data: IconThemeData(color: Theme.of(context).colorScheme.onPrimary),
          child: Row(
            children: [
              Card(
                child: Padding(
                  padding: EdgeInsets.all(3.0),
                  child: Text('GPS: ' + counter.toString()),
                ),
              ),
              Spacer(),
              Text(
                "Tracking",
                style: TextStyle(color: Colors.white),
              ),
              Switch(
                value: _enabled,
                onChanged: _onClickEnable,
                activeColor: Colors.white,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
