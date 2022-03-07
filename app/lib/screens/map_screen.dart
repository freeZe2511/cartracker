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

  final List<CircleMarker> _currentPosition = [];

  late bg.Location _stationaryLocation;

  @override
  void initState() {
    super.initState();

    _mapOptions = MapOptions(
      onPositionChanged: _onPositionChanged,
      center: _center,
      zoom: 16.0,
    );
    _mapController = MapController();

    // bg.BackgroundGeolocation.onLocation(_onLocation);
    // bg.BackgroundGeolocation.onMotionChange(_onMotionChange);
    // bg.BackgroundGeolocation.onGeofence(_onGeofence);
    // bg.BackgroundGeolocation.onGeofencesChange(_onGeofencesChange);
    // bg.BackgroundGeolocation.onEnabledChange(_onEnabledChange);
  }

  void _onPositionChanged(MapPosition pos, bool hasGesture) {
    _mapOptions.crs.scale(_mapController.zoom);
  }

  void _onLocation(bg.Location location) {
    LatLng l1 = LatLng(location.coords.latitude, location.coords.longitude);
    _mapController.move(l1, _mapController.zoom);
    _updateCurrentPositionMarker(l1);
  }

  void _updateCurrentPositionMarker(LatLng ll) {
    _currentPosition.clear();

    // White background
    _currentPosition
        .add(CircleMarker(point: ll, color: Colors.white, radius: 10));
    // Blue foreground
    _currentPosition
        .add(CircleMarker(point: ll, color: Colors.blue, radius: 7));
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
          MarkerLayerOptions(
            markers: [],
          ),
          CircleLayerOptions(circles: _currentPosition),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _onClickGetCurrentPosition,
        child: Icon(Icons.gps_fixed),
        backgroundColor: Colors.redAccent,
      ),
      bottomNavigationBar: BottomAppBar(
        color: Colors.blue,
        child: IconTheme(
          data: IconThemeData(color: Theme.of(context).colorScheme.onPrimary),
          child: Row(
            children: const [
              Text(
                "test",
                style: TextStyle(color: Colors.white),
              ),
            ],
          ),
        ),
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
