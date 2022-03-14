import 'package:flutter/material.dart';

import 'package:flutter_background_geolocation/flutter_background_geolocation.dart'
    as bg;

const INPUT_TYPE_SELECT = "select";
const INPUT_TYPE_TOGGLE = "toggle";
const INPUT_TYPE_TEXT = "text";

const PLUGIN_SETTINGS = {
  'common': [
// Geolocation
//     {
//       'name': 'desiredAccuracy',
//       'group': 'geolocation',
//       'dataType': 'integer',
//       'inputType': 'select',
//       'labels': ['NAVIGATION', 'HIGH', 'MEDIUM', 'LOW', 'MINIMUM'],
//       'values': [-2, -1, 10, 100, 1000],
//       'defaultValue': 0
//     },
//     {
//       'name': 'distanceFilter',
//       'group': 'geolocation',
//       'dataType': 'integer',
//       'inputType': 'select',
//       'values': [0, 10, 20, 50, 100, 500],
//       'defaultValue': 20
//     },
    {
      'name': 'stopOnTerminate',
      'group': 'application',
      'dataType': 'boolean',
      'inputType': 'toggle',
      'values': [true, false],
      'defaultValue': true
    }
  ]
};

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({Key? key}) : super(key: key);

  static const routeName = '/settingsscreen';

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _state = false;

  @override
  void initState() {
    super.initState();
    bg.BackgroundGeolocation.state.then((bg.State state) {
      setState(() {
        _state = state.map["stopOnTerminate"];
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    String name = "stopOnTerminate";
    bool value = _state;
    return Scaffold(
      appBar: AppBar(
        title: Text("Settings"),
      ),
      body: Column(
        children: [
          InputDecorator(
            decoration: InputDecoration(
              contentPadding:
                  EdgeInsets.only(top: 0.0, left: 10.0, bottom: 0.0),
              labelStyle: TextStyle(color: Colors.blue),
              //labelText: name
            ),
            child: Row(
              children: <Widget>[
                Expanded(
                  flex: 3,
                  child: Text(
                    name,
                    style: TextStyle(color: Colors.blue, fontSize: 15.0),
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: <Widget>[
                      Switch(
                        value: value,
                        onChanged: (bool value) {
                          bg.Config config = bg.Config().set(name, value);
                          bg.BackgroundGeolocation.setConfig(config)
                              .then((bg.State state) {
                            setState(() {
                              _state = state.map["stopOnTerminate"];
                            });
                          });
                        },
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
