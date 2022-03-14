import 'package:cartracker_app/services/http_service.dart' as http;
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'home_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  static const routeName = '/loginscreen';

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  http.HttpService httpService = http.HttpService();

  bool _passwordObscure = true;
  final _formKey = GlobalKey<FormState>();
  late String _username;
  late String _password;

  @override
  void initState() {
    super.initState();
    init();
  }

  /// Check if jwt token is stored in sharedPreferences
  ///
  /// if so, navigate to homeScreen to keep user logged in
  init() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    if (prefs.getString("jwt") != null) {
      Navigator.of(context).popUntil((route) => route.isFirst); // TODO
      Navigator.of(context).pushReplacementNamed(HomeScreen.routeName);
    }
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
                  Container(
                      margin: EdgeInsets.all(25),
                      child:
                          Text("cartracker", style: TextStyle(fontSize: 35))),
                  TextFormField(
                    key: Key("username"),
                    decoration: InputDecoration(
                      prefixIcon: Icon(Icons.account_box),
                      hintText: "Username",
                      contentPadding: EdgeInsets.all(25),
                    ),
                    onSaved: (val) => _username = val!,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter Username';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    decoration: InputDecoration(
                      prefixIcon: Icon(Icons.lock),
                      hintText: "Password",
                      contentPadding: EdgeInsets.all(25),
                      suffixIcon: IconButton(
                        onPressed: () => _toggle(),
                        icon: Icon(_passwordObscure
                            ? Icons.visibility_off
                            : Icons.visibility),
                      ),
                    ),
                    onSaved: (val) => _password = val!,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter Password';
                      }
                      return null;
                    },
                    obscureText: _passwordObscure,
                  ),
                  Container(
                    margin: EdgeInsets.all(25),
                    child: ElevatedButton(
                      child: Text("Submit"),
                      onPressed: _handleSubmit,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  /// Handler when login form is submitted
  void _handleSubmit() async {
    final FormState form = _formKey.currentState!;

    // form validation check
    if (form.validate()) {
      form.save();
      // check if user valid from server
      bool authorized = await httpService.logIn(_username, _password);
      if (authorized) {
        // login and navigate to home
        Navigator.of(context).popUntil((route) => route.isFirst);
        Navigator.of(context).pushReplacementNamed(HomeScreen.routeName);
      } else {
        showSnackBar("Login failed", Colors.red);
      }
    } else {
      showSnackBar("Form incomplete", Colors.red);
    }
  }

  /// toggle to obscure password in login form
  void _toggle() {
    setState(() => _passwordObscure = !_passwordObscure);
  }

  /// show snackbar with message and color
  void showSnackBar(String msg, MaterialColor color){
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text(
        msg,
        textAlign: TextAlign.center,
      ),
      backgroundColor: color,
    ));
  }
}
