import 'package:cartracker_app/screens/home_screen.dart';
import 'package:cartracker_app/screens/info_screen.dart';
import 'package:cartracker_app/screens/login_screen.dart';
import 'package:cartracker_app/screens/map_screen.dart';
import 'package:cartracker_app/screens/settings_screen.dart';
import 'package:flutter/material.dart';

void main() => runApp(CarTrackerApp());

class CarTrackerApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CarTracker',
      home: LoginScreen(), // TODO
      routes: {
        HomeScreen.routeName: (context) => HomeScreen(),
        LoginScreen.routeName: (context) => LoginScreen(),
        MapScreen.routeName: (context) => MapScreen(),
        SettingsScreen.routeName: (context) => SettingsScreen(),
        InfoScreen.routeName: (context) => InfoScreen(),
      },
    );
  }
}
