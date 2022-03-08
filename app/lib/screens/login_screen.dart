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

  // bool loading = true;

  @override
  void initState() {
    super.initState();
    init();
  }

  init() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    if (prefs.getString("jwt") != null) {
      Navigator.pushNamed(context, HomeScreen.routeName);
    }
  }

  @override
  Widget build(BuildContext context) {
    // if (loading) {
    //   return Center(
    //     child: CircularProgressIndicator(),
    //   );
    // } else {
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
                          Text("CarTracker", style: TextStyle(fontSize: 35))),
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

  void _handleSubmit() async {
    final FormState form = _formKey.currentState!;

    if (!form.validate()) {
    } else {
      form.save();
      bool authorized = await httpService.logIn(_username, _password);
      if (authorized) {
        Navigator.pushNamed(context, HomeScreen.routeName);
      }
    }
  }

  void _toggle() {
    setState(() => _passwordObscure = !_passwordObscure);
  }
}

//TODO addGeoFence from response
// jwt token in prefs
