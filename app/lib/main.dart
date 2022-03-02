import 'package:cartracker_app/screens/login_screen.dart';
import 'package:cartracker_app/screens/map_screen.dart';
import 'package:cartracker_app/screens/position_screen.dart';
import 'package:flutter/material.dart';

void main() => runApp(CarTrackerApp());

class CarTrackerApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CarTracker',
      home: PositionScreen(),
      routes: {
        MapScreen.routeName: (context) => MapScreen(),
      },
    );
  }
}
