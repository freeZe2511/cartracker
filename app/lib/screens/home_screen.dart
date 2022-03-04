import 'dart:convert';

import 'package:cartracker_app/custom/drawer.dart';
import 'package:flutter/material.dart';

import 'package:flutter_background_geolocation/flutter_background_geolocation.dart'
    as bg;

JsonEncoder encoder = JsonEncoder.withIndent("     ");

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  static const routeName = '/homescreen';

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late double lat;
  late double lng;
  late int counter;

  late bool _isMoving;
  late bool _enabled;
  late String _motionActivity;
  late String _odometer;
  late String _content;

  @override
  void initState() {
    super.initState();
    _content = "    Enable the switch to begin tracking.";
    _isMoving = false;
    _enabled = false;
    _content = '';
    _motionActivity = 'UNKNOWN';
    _odometer = '0';

    counter = 0;
    _initPlatformState();
  }

  void _initPlatformState() {
    // 1.  Listen to events (See docs for all 12 available events).
    bg.BackgroundGeolocation.onLocation(_onLocation, _onLocationError);
    bg.BackgroundGeolocation.onMotionChange(_onMotionChange);
    bg.BackgroundGeolocation.onActivityChange(_onActivityChange);

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
          _isMoving = state.isMoving!;
        });
      }
    });
  }

  void _onClickEnable(enabled) {
    if (enabled) {
      // Reset odometer.
      bg.BackgroundGeolocation.start().then((bg.State state) {
        print('[start] success $state');
        setState(() {
          _enabled = state.enabled;
          _isMoving = state.isMoving!;
        });
      }).catchError((error) {
        print('[start] ERROR: $error');
      });
    } else {
      bg.BackgroundGeolocation.stop().then((bg.State state) {
        print('[stop] success: $state');

        setState(() {
          _enabled = state.enabled;
          _isMoving = state.isMoving!;
        });
      });
    }
  }

  // Manually fetch the current position.
  void _onClickGetCurrentPosition() {
    bg.BackgroundGeolocation.getCurrentPosition(
            persist: true, // <-- do persist this location
            desiredAccuracy: 0, // <-- desire best possible accuracy
            timeout: 30, // <-- wait 30s before giving up.
            samples: 3 // <-- sample 3 location before selecting best.
            )
        .then((bg.Location location) {
      print('[getCurrentPosition] - $location');
    }).catchError((error) {
      print('[getCurrentPosition] ERROR: $error');
    });
  }

  void _onLocation(bg.Location location) {
    print('[location] - $location');

    String odometerKM = (location.odometer / 1000.0).toStringAsFixed(1);

    setState(() {
      _content = encoder.convert(location.toMap());
      _odometer = odometerKM;
      counter += 1;
    });
  }

  void _onLocationError(bg.LocationError error) {
    print('[location] ERROR - $error');
  }

  void _onMotionChange(bg.Location location) {
    print('[motionchange] - $location');
  }

  void _onActivityChange(bg.ActivityChangeEvent event) {
    print('[activitychange] - $event');
    setState(() {
      _motionActivity = event.activity;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Home"),
      ),
      body: Column(
        children: [
          Text("$counter"),
          Text(_content),
        ],
      ),
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
