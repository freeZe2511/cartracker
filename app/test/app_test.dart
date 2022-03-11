import 'package:cartracker_app/custom/drawer.dart';
import 'package:cartracker_app/screens/home_screen.dart';
import 'package:cartracker_app/screens/login_screen.dart';
import 'package:cartracker_app/screens/map_screen.dart';
import 'package:cartracker_app/screens/settings_screen.dart';
import 'package:cartracker_app/services/http_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:mockito/mockito.dart';

class MockNavigatorObserver extends Mock implements NavigatorObserver {}

void main() {
  group('LoginScreen', () {
    testWidgets('Init', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(home: LoginScreen()));
      final titleFinder = find.text("cartracker");
      expect(titleFinder, findsOneWidget);

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

  group('SettingsScreen', () {
    // testWidgets('Init', (WidgetTester tester) async {
    //
    //   await tester.pumpWidget(MaterialApp(home: SettingsScreen()));
    //   final titleFinder = find.text("Settings");
    //   expect(titleFinder, findsOneWidget);
    //
    // });
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

    // testWidgets('Button is present and triggers navigation after tapped',
    //         (WidgetTester tester) async {
    //       final mockObserver = MockNavigatorObserver();
    //       await tester.pumpWidget(MaterialApp(home: CustomDrawer(), navigatorObservers: [mockObserver],));
    //
    //       expect(find.text("Help"), findsOneWidget);
    //       await tester.tap(find.text("Map"));
    //       await tester.pumpAndSettle();
    //
    //       /// Verify that a push event happened
    //       // verify(mockObserver.didPush(any, any));
    //
    //       /// You'd also want to be sure that your page is now
    //       /// present in the screen.
    //       expect(find.byType(MapScreen), findsOneWidget);
    //     });
  });

  group('HttpService', () {
    group('In Zone', () {
      test("No Zone", () {
        final httpService = HttpService();
        const String userid = "1234";
        List<String> zoneList = ["1", "None", "0", "", ""];
        bool res = httpService.isInZone(userid, 50.5, 8.5, zoneList);
        expect(res, true);
      });

      test("Circle Zone", () {
        final httpService = HttpService();
        const String userid = "1234";
        List<String> zoneList = ["c1", "circletest", "90000", "50", "8"];
        bool res = httpService.isInZone(userid, 50.5, 8.5, zoneList);
        expect(res, true);
      });

      test("Poly Zone", () {
        final httpService = HttpService();
        const String userid = "1234";
        List<String> zoneList = ["p1", "polytest", "0", "poslist"];
        bool res = httpService.isInZone(userid, 50.5, 8.5, zoneList);
        expect(res, false);
      });
    });

    group('Check Circle Zone', () {
      test("In Zone", () {
        final httpService = HttpService();
        List<String> zoneList = ["test", "Test-Zone", "10000", "50.51", "8.51"];
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

    group('Log In', () {
      test("In Zone", () {
        final httpService = HttpService();
        httpService.logIn("test", "123");

        const res = {"jwt":"0.0.1","zone":{"id":"01","name":"Gießen","radius":10000,
          "pos":[{"lat":50.58727,"lng":8.67554}]},"userid":"01"};

      });

      test("Out Zone", () {
        final httpService = HttpService();

      });
    });
  });
}
