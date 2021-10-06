import 'package:geolocator/geolocator.dart';

// service pattern
class GeolocationService {
  static Stream<Position> getPositionStream() {
    return Geolocator.getPositionStream(
      desiredAccuracy: LocationAccuracy.high,
      distanceFilter: 10,
    );
  }

  static Future<Position> getInitialPosition() async {
    return Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );
  }
}
