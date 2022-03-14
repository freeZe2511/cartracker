import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

import 'package:flutter_background_geolocation/flutter_background_geolocation.dart'
    as bg;

class MapScreen extends StatefulWidget {
  const MapScreen({Key? key}) : super(key: key);

  static const routeName = '/mapscreen';

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  final LatLng _center = LatLng(50.5, 8.67);
  late MapController _mapController;
  late MapOptions _mapOptions;

  @override
  void initState() {
    super.initState();

    _mapOptions = MapOptions(
      onPositionChanged: _onPositionChanged,
      center: _center,
      zoom: 12.0,
    );
    _mapController = MapController();
  }

  void _onPositionChanged(MapPosition pos, bool hasGesture) {
    _mapOptions.crs.scale(_mapController.zoom);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Map"),
      ),
      body: FlutterMap(
        mapController: _mapController,
        options: _mapOptions,
        layers: [
          TileLayerOptions(
            urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            subdomains: ['a', 'b', 'c'],
          ),
        ],
      ),
    );
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
}
