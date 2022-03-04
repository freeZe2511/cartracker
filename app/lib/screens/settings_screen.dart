import 'package:flutter/material.dart';

import 'package:flutter_background_geolocation/flutter_background_geolocation.dart'
    as bg;

const INPUT_TYPE_SELECT = "select";
const INPUT_TYPE_TOGGLE = "toggle";
const INPUT_TYPE_TEXT = "text";

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({Key? key}) : super(key: key);

  static const routeName = '/settingsscreen';

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  late bg.State _state;

  List<Map> commonSettings = [];

  @override
  void initState() {
    super.initState();
    for (var item in PLUGIN_SETTINGS["common"]!) {
      commonSettings.add(item);
    }
    bg.BackgroundGeolocation.state.then((bg.State state) {
      setState(() {
        _state = state;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Settings"),
      ),
      body: _buildList(commonSettings),
    );
  }

  Widget _buildList(List<Map> settings) {
    return ListView.builder(
      itemExtent: 60,
      itemCount: settings.length,
      itemBuilder: (BuildContext context, int index) {
        return _buildField(settings[index]);
      },
    );
  }

  Widget _buildField(Map<dynamic, dynamic> setting) {
    String name = setting['name'];
    String inputType = setting['inputType'];
    print('[buildField] - $name: $inputType');
    Widget field;
    print(_state);
    switch (inputType) {
      case INPUT_TYPE_SELECT:
        field = _buildSelectField(setting);
        break;
      case INPUT_TYPE_TOGGLE:
        field = _buildSwitchField(setting);
        break;
      // case INPUT_TYPE_TEXT:
      //   field = _buildTextField(setting);
      //   break;
      default:
        field = Text('field: $name - Unsupported inputType: $inputType');
        break;
    }
    return field;
  }

  // TODO (now just placeholder)
  Widget _buildSelectField(Map<dynamic, dynamic> setting) {
    String name = setting['name'];

    return InputDecorator(
      decoration: InputDecoration(
        contentPadding: EdgeInsets.only(top: 0.0, left: 10.0, bottom: 0.0),
        labelStyle: TextStyle(color: Colors.blue),
        //labelText: name
      ),
      child: Row(
        children: <Widget>[
          Expanded(flex: 3, child: _buildLabel(name)),
          Expanded(
            flex: 1,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: const <Widget>[
                Text("select to do ")
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildSwitchField(Map<dynamic, dynamic> setting) {
    String name = setting['name'];
    bool value = _state.map[name];
    return InputDecorator(
      decoration: InputDecoration(
        contentPadding: EdgeInsets.only(top: 0.0, left: 10.0, bottom: 0.0),
        labelStyle: TextStyle(color: Colors.blue),
        //labelText: name
      ),
      child: Row(
        children: <Widget>[
          Expanded(flex: 3, child: _buildLabel(name)),
          Expanded(
            flex: 1,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: <Widget>[
                Switch(
                    value: value, onChanged: _createSwitchChangeHandler(name))
              ],
            ),
          )
        ],
      ),
    );
  }

  Text _buildLabel(String label) {
    return Text(label, style: TextStyle(color: Colors.blue, fontSize: 15.0));
  }

  Function(bool) _createSwitchChangeHandler(String field) {
    return (bool value) {
      bg.Config config = bg.Config().set(field, value);
      bg.BackgroundGeolocation.setConfig(config).then((bg.State state) {
        setState(() {
          _state = state;
        });
      });
    };
  }
}

const PLUGIN_SETTINGS = {
  'common': [
// Geolocation
    {
      'name': 'desiredAccuracy',
      'group': 'geolocation',
      'dataType': 'integer',
      'inputType': 'select',
      'labels': ['NAVIGATION', 'HIGH', 'MEDIUM', 'LOW', 'MINIMUM'],
      'values': [-2, -1, 10, 100, 1000],
      'defaultValue': 0
    },
    {
      'name': 'distanceFilter',
      'group': 'geolocation',
      'dataType': 'integer',
      'inputType': 'select',
      'values': [0, 10, 20, 50, 100, 500],
      'defaultValue': 20
    },
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
