import 'package:cartracker_app/screens/map_screen.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          height: 400,
          width: 300,
          child: Column(
            children: [
              TextField(
                controller: TextEditingController(),
                decoration: InputDecoration(
                    prefixIcon: Icon(Icons.account_box), hintText: "Username"),
              ),
              TextField(
                controller: TextEditingController(),
                decoration: InputDecoration(
                    prefixIcon: Icon(Icons.apps), hintText: "Password"),
              ),
              ElevatedButton(
                child: Text("Submit"),
                onPressed: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => MapScreen()));
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
