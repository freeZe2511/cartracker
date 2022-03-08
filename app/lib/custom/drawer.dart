import 'package:cartracker_app/screens/login_screen.dart';
import 'package:cartracker_app/screens/map_screen.dart';
import 'package:cartracker_app/screens/settings_screen.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:cartracker_app/services/http_service.dart' as http;

class CustomDrawer extends StatefulWidget {
  const CustomDrawer({Key? key}) : super(key: key);

  @override
  State<CustomDrawer> createState() => _CustomDrawerState();
}

class _CustomDrawerState extends State<CustomDrawer> {

  http.HttpService httpService = http.HttpService();

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: [
          Expanded(
            child: ListView(
              // Important: Remove any padding from the ListView.
              padding: EdgeInsets.zero,
              children: [
                const DrawerHeader(
                  decoration: BoxDecoration(
                    color: Colors.blue,
                  ),
                  child: Center(
                      child: Text(
                        'CarTracker',
                        style: TextStyle(color: Colors.white, fontSize: 30),
                      )),
                ),
                ListTile(
                  title: const Text("Map"),
                  leading: Icon(Icons.map),
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.pushNamed(context, MapScreen.routeName);
                  },
                ),
                ListTile(
                  title: const Text("Settings"),
                  leading: Icon(Icons.settings),
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.pushNamed(context, SettingsScreen.routeName);
                  },
                ),
              ],
            ),
          ),
          Align(
            alignment: FractionalOffset.bottomCenter,
            child: Column(
              children: [
                ListTile(
                  title: const Text("Help"),
                  leading: Icon(Icons.help),
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
                ListTile(
                  title: const Text("LogOut"),
                  leading: Icon(Icons.logout),
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.pushNamed(context, LoginScreen.routeName);
                    httpService.logOut();
                  },
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}