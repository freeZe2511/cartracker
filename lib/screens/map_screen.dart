import 'dart:async';
import 'dart:convert';

import 'package:cartracker_app/services/geolocator_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:uuid/uuid.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({Key? key}) : super(key: key);

  static const routeName = '/mapscreen';

  @override
  State<MapScreen> createState() => MapPageState();
}

class MapPageState extends State<MapScreen> {
  final Completer<GoogleMapController> _controller = Completer();
  final double zoom = 18.0;

  Map<MarkerId, Marker> markers = {};
  List<LatLng> latlng = [];
  Set<Polyline> polylines = {};

  @override
  void initState() {
    super.initState();
    GeolocationService.getPositionStream().listen(
      (position) async {
        var mapController = await _controller.future;
        mapController.animateCamera(
          CameraUpdate.newCameraPosition(
            CameraPosition(
              zoom: zoom,
              target: LatLng(
                position.latitude,
                position.longitude,
              ),
            ),
          ),
        );
        //getTest();
        addMarker(position, "userid");  // sharedpreferences
        addPolyline();
      },
    );
  }

  void addMarker(Position position, String userid) {
    LatLng pos = LatLng(position.latitude, position.longitude);
    MarkerId markerId = MarkerId(Uuid().v4());
    Marker marker = Marker(
      markerId: markerId,
      position: pos,
    );
    setState(() {
      markers[markerId] = marker;
      latlng.add(pos);
      createMarker(position.latitude, position.longitude, userid);
    });
  }

  void addPolyline() {
    PolylineId polylineId = PolylineId(Uuid().v4());
    Polyline polyline = Polyline(
        polylineId: polylineId,
        visible: true,
        color: Colors.blue,
        width: 5,
        points: latlng);
    setState(() {
      polylines.add(polyline);
    });
  }

  void createMarker(double lat, double lng, String userid) async {
    final uri =
        Uri.parse('http://h2876375.stratoserver.net:9090/api/v1/positions');
    final headers = {'Content-Type': 'application/json'};
    Map<String, dynamic> body = {'userid': userid, 'lat': lat, 'lng': lng};

    http.Response res = await http.post(
      uri,
      headers: headers,
      body: json.encode(body),
      encoding: Encoding.getByName('utf-8'),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Map"),
      ),
      body: FutureBuilder(
        future: GeolocationService.getInitialPosition(),
        builder: (context, snapshot) {
          if (snapshot.data == null) {
            return Center(
              child: LinearProgressIndicator(),
            );
          }
          Position initialLocation = snapshot.data! as Position;
          return GoogleMap(
            mapType: MapType.normal,
            myLocationEnabled: true,
            initialCameraPosition: CameraPosition(
              zoom: zoom,
              target: LatLng(
                initialLocation.latitude,
                initialLocation.longitude,
              ),
            ),
            onMapCreated: (GoogleMapController controller) {
              _controller.complete(controller);
            },
            markers: Set.of(markers.values),
            polylines: polylines,
          );
        },
      ),
    );
  }

  // SnapToRoad API Example TEST
  void getTest() async {
    var body = await rootBundle.loadString("assets/test");
    var json = jsonDecode(body);

    json["snappedPoints"].forEach((e) =>
        addTestMarker(e["location"]["latitude"], e["location"]["longitude"]));
  }

  void addTestMarker(double lat, double lng) {
    LatLng pos = LatLng(lat, lng);
    MarkerId markerId = MarkerId(Uuid().v4());
    Marker marker = Marker(
      markerId: markerId,
      position: pos,
    );
    setState(() {
      markers[markerId] = marker;
      latlng.add(pos);
    });
  }
}
