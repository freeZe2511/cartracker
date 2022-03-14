import 'package:cartracker_app/custom/drawer.dart';
import 'package:cartracker_app/screens/home_screen.dart';
import 'package:cartracker_app/screens/info_screen.dart';
import 'package:cartracker_app/screens/login_screen.dart';
import 'package:cartracker_app/screens/map_screen.dart';
import 'package:cartracker_app/screens/settings_screen.dart';
import 'package:cartracker_app/services/http_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_background_geolocation/flutter_background_geolocation.dart'
    as bg;
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MockNavigatorObserver extends Mock implements NavigatorObserver {}

void main() {
  group('LoginScreen', () {
    testWidgets('Init', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(
        home: LoginScreen(),
        routes: {
          HomeScreen.routeName: (context) => HomeScreen(),
        },
      ));
      final titleFinder = find.text("cartracker");
      expect(titleFinder, findsOneWidget);
    });

    testWidgets('JWT set', (WidgetTester tester) async {
      SharedPreferences.setMockInitialValues({"jwt": "123124"});
      SharedPreferences prefs = await SharedPreferences.getInstance();
      expect(prefs.getKeys().length, 1);
      await tester.pumpWidget(MaterialApp(
        home: LoginScreen(),
        routes: {
          HomeScreen.routeName: (context) => HomeScreen(),
        },
      ));
      prefs.clear();
    });

    testWidgets('JWT not set', (WidgetTester tester) async {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.clear();
      expect(prefs.getKeys().length, 0);
      await tester.pumpWidget(MaterialApp(home: LoginScreen()));
      prefs.clear();

      // tester.tap(find.widgetWithIcon(TextFormField, Icons.account_box));
    });

    testWidgets('Input', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(home: LoginScreen()));

      var txtForm = find.byKey(Key('username'));
      await tester.enterText(txtForm, 'test');

      expect(find.text('test1'), findsNothing);
      expect(find.text('test'), findsOneWidget);
    });

    test('Logout clears SharedPrefs', () async {
      final httpService = HttpService();

      SharedPreferences.setMockInitialValues({"test": "true"});
      SharedPreferences prefs = await SharedPreferences.getInstance();
      expect(prefs.getKeys().length, 1);
      await httpService.logOut();
      expect(prefs.getKeys().length, 0);
    });
  });

  group('HomeScreen', () {
    testWidgets('Init', (WidgetTester tester) async {
      SharedPreferences.setMockInitialValues({
        "zone": [""],
        "userid": "1234"
      });

      await tester.pumpWidget(MaterialApp(home: HomeScreen()));
      final titleFinder = find.text("Home");
      expect(titleFinder, findsOneWidget);
    });
  });

  group('MapScreen', () {
    testWidgets('Init', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(home: MapScreen()));
      final titleFinder = find.text("Map");
      expect(titleFinder, findsOneWidget);
    });
  });

  group('InfoScreen', () {
    testWidgets('Init', (WidgetTester tester) async {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString("userid", "119274");
      prefs.setStringList("zone", ["123", "test", "100", "[]", "0"]);

      await tester.pumpWidget(MaterialApp(home: InfoScreen()));
      final titleFinder = find.text("Info");
      expect(titleFinder, findsOneWidget);
      prefs.clear();
    });

    testWidgets('ZoneList', (WidgetTester tester) async {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString("userid", "119274");
      prefs.setStringList("zone", ["123", "test", "100", "[]", "0"]);

      await tester.pumpWidget(MaterialApp(home: InfoScreen()));
      final titleFinder = find.text("Info");
      expect(titleFinder, findsOneWidget);

      prefs.clear();
    });
  });

  group('SettingsScreen', () {
    testWidgets('Init', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(home: SettingsScreen()));
      final titleFinder = find.text("Settings");
      expect(titleFinder, findsOneWidget);
    });
  });

  group('CustomDrawer', () {
    testWidgets('Init', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(home: CustomDrawer()));
      final titleFinder = find.text("CarTracker");
      final helpFinder = find.text("Help");
      final logOutFinder = find.text("LogOut");
      final mapFinder = find.text("Map");
      final mapIconFinder = find.widgetWithIcon(ListTile, Icons.map);
      final settingsFinder = find.text("Settings");

      expect(titleFinder, findsOneWidget);
      expect(helpFinder, findsOneWidget);
      expect(logOutFinder, findsOneWidget);
      expect(mapFinder, findsOneWidget);
      expect(mapIconFinder, findsOneWidget);
      expect(settingsFinder, findsOneWidget);
    });

    testWidgets('test onTap Map', (WidgetTester tester) async {
      final mockObserver = MockNavigatorObserver();
      await tester.pumpWidget(MaterialApp(
        home: CustomDrawer(),
        routes: {
          MapScreen.routeName: (context) => MapScreen(),
        },
        navigatorObservers: [mockObserver],
      ));

      await tester.tap(find.text("Map"));
      await tester.pumpAndSettle();

      expect(find.byType(MapScreen), findsOneWidget);
    });

    testWidgets('test onTap Info', (WidgetTester tester) async {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString("userid", "119274");
      prefs.setStringList("zone", ["123", "test", "100", "[]", "0"]);
      final mockObserver = MockNavigatorObserver();
      await tester.pumpWidget(MaterialApp(
        home: CustomDrawer(),
        routes: {
          InfoScreen.routeName: (context) => InfoScreen(),
        },
        navigatorObservers: [mockObserver],
      ));

      await tester.tap(find.text("Info"));
      await tester.pumpAndSettle();

      expect(find.byType(InfoScreen), findsOneWidget);
      prefs.clear();
    });

    testWidgets('test onTap Settings', (WidgetTester tester) async {
      final mockObserver = MockNavigatorObserver();
      await tester.pumpWidget(MaterialApp(
        home: CustomDrawer(),
        routes: {
          SettingsScreen.routeName: (context) => SettingsScreen(),
        },
        navigatorObservers: [mockObserver],
      ));

      await tester.tap(find.text("Settings"));
      await tester.pumpAndSettle();

      expect(find.byType(SettingsScreen), findsOneWidget);
    });

    testWidgets('test onTap Logout', (WidgetTester tester) async {
      final mockObserver = MockNavigatorObserver();
      await tester.pumpWidget(MaterialApp(
        home: CustomDrawer(),
        routes: {
          LoginScreen.routeName: (context) => LoginScreen(),
        },
        navigatorObservers: [mockObserver],
      ));

      await tester.tap(find.text("LogOut"));
      await tester.pumpAndSettle();

      expect(find.byType(LoginScreen), findsOneWidget);
    });

    testWidgets('test onTap Help', (WidgetTester tester) async {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString("userid", "119274");
      prefs.setStringList("zone", ["123", "test", "100", "[]", "0"]);
      final mockObserver = MockNavigatorObserver();
      await tester.pumpWidget(MaterialApp(
        home: CustomDrawer(),
        routes: {
          HomeScreen.routeName: (context) => HomeScreen(),
        },
        navigatorObservers: [mockObserver],
      ));

      await tester.tap(find.text("Help"));
      await tester.pumpAndSettle();

      expect(find.byType(HomeScreen), findsOneWidget);
    });
  });

  group('HttpService', () {
    test("Authorize", () async {
      final httpService = HttpService();

      const code = 200;
      const res = {
        "jwt": "0.0.1",
        "zone": {
          "id": "01",
          "name": "Gießen",
          "radius": 10000,
          "pos": [
            {"lat": 50.58727, "lng": 8.67554}
          ]
        },
        "userid": "01"
      };

      var status = await httpService.authorize(code, res);
      expect(status, true);
    });

    test("Post Position", () async {
      final httpService = HttpService();

      var mockLocation = bg.Location({
        "odometer": 38968.19921875,
        "activity": {"confidence": 100, "type": "still"},
        "extras": {},
        "battery": {"level": 0.96, "is_charging": true},
        "uuid": "5d6e8819-40a4-4e7b-ae27-9fe09dc0fd66",
        "coords": {
          "altitude": 267.2,
          "heading": -1.0,
          "latitude": 50.4892082,
          "accuracy": 15.7,
          "heading_accuracy": -1.0,
          "altitude_accuracy": 1.0,
          "speed_accuracy": -1.0,
          "speed": -1.0,
          "longitude": 8.6726922
        },
        "is_moving": false,
        "timestamp": "2022-03-13T21:58:44.314Z"
      });

      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString("userid", "119274");
      prefs.setString("jwt", "12i4i12v4");
      prefs.setStringList("zone", ["123", "test", "100", "[[50.0, 8.0]]", "1"]);

      httpService.postPosition(mockLocation);
    });

    group('In Zone', () {
      test("No Zone", () {
        final httpService = HttpService();
        const String userid = "1234";
        List<String> zoneList = ["1", "None", "0", "[[50.0, 8.0]]", "0"];
        bool res = httpService.isInZone(userid, 50.5, 8.5, zoneList);
        expect(res, true);
      });

      test("Circle Zone", () {
        final httpService = HttpService();
        const String userid = "1234";
        List<String> zoneList = [
          "c1",
          "circletest",
          "90000",
          "[[50.0, 3.0]]",
          "1"
        ];
        bool res = httpService.isInZone(userid, 50.5, 8.5, zoneList);
        expect(res, false);
      });

      test("Poly Zone", () {
        final httpService = HttpService();
        const String userid = "1234";
        List<String> zoneList = [
          "p1",
          "polytest",
          "0",
          "[[50.0, 3.0], [51.0, 6.0], [53.9, 10.0]]",
          "3"
        ];
        bool res = httpService.isInZone(userid, 50.5, 8.5, zoneList);
        expect(res, false);
      });
    });

    group('Check Circle Zone', () {
      test("In Zone", () {
        final httpService = HttpService();
        List<String> zoneList = ["test", "Test-Zone", "50000", "50.4", "8.4"];
        double lat = 50.5;
        double lng = 8.5;
        bool res = httpService.checkCircleZone(double.parse(zoneList[3]),
            double.parse(zoneList[4]), lat, lng, num.parse(zoneList[2]));
        expect(res, true);
      });

      test("Out Zone", () {
        final httpService = HttpService();
        List<String> zoneList = ["test", "Test-Zone", "10", "50.51", "8.51"];
        double lat = 50.5;
        double lng = 8.5;
        bool res = httpService.checkCircleZone(double.parse(zoneList[3]),
            double.parse(zoneList[4]), lat, lng, num.parse(zoneList[2]));
        expect(res, false);
      });
    });
  });
}
