import 'dart:convert';
import 'dart:io';

import 'package:cartracker_app/screens/map_screen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _passwordVisible = false;
  final _formKey = GlobalKey<FormState>();
  var _username;
  var _password;
  var userid;

  void _toggle() {
    setState(() => _passwordVisible = !_passwordVisible);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SizedBox(
          height: 400,
          width: 300,
          child: Form(
            key: _formKey,
            child: SingleChildScrollView(
              child: Column(
                children: [
                  TextFormField(
                    key: Key("username"),
                    decoration: InputDecoration(
                      prefixIcon: Icon(Icons.account_box),
                      hintText: "Username",
                    ),
                    onSaved: (val) => _username = val,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 't';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    decoration: InputDecoration(
                      prefixIcon: Icon(Icons.lock),
                      hintText: "Password",
                      suffixIcon: IconButton(
                        onPressed: () => _toggle(),
                        icon: Icon(_passwordVisible
                            ? Icons.visibility_off
                            : Icons.visibility),
                      ),
                    ),
                    onSaved: (val) => _password = val,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 't';
                      }
                      return null;
                    },
                    obscureText: _passwordVisible,
                  ),
                  ElevatedButton(
                    child: Text("Submit"),
                    onPressed: _handleSubmit,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  void _handleSubmit() async {
    final FormState form = _formKey.currentState!;
    bool authorized = false;

    if (!form.validate()) {
    } else {
      form.save();
      authorized = await authUser(_username, _password);
      if (authorized) {
        Navigator.pushNamed(
            context, MapScreen.routeName, arguments: userid);
      }
    }
  }

  Future<bool> authUser(String username, String password) async {
    bool authorized = false;

    final uri = Uri.parse('http://h2876375.stratoserver.net:9090/api/user/login');
    final headers = {'Content-Type': 'application/json'};
    Map<String, dynamic> body = {
      'username': username,
      'password': password
    }; // id?

    http.Response res = await http.post(
      uri,
      headers: headers,
      body: json.encode(body),
      encoding: Encoding.getByName('utf-8'),
    );

    switch (res.statusCode) {
      case 200:
        authorized = !authorized;
        userid = User.fromJson(jsonDecode(res.body))._userid;
        break;
      default:
        _authFail();
        break;
    }

    return authorized;
  }

  void _authFail() {}
}

class User {
  final String _userid;

  User.fromJson(Map<String, dynamic> json) : _userid = json['_userid'];

  Map<String, dynamic> toJson() => {
        '_userid': _userid,
      };
}
