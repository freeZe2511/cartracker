
import 'package:cartracker_app/services/http_service.dart' as http;
import 'package:flutter/material.dart';

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
  var _username;
  var _password;

  void _toggle() {
    setState(() => _passwordObscure = !_passwordObscure);
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
                          Text("CarTracker", style: TextStyle(fontSize: 35))),
                  TextFormField(
                    key: Key("username"),
                    decoration: InputDecoration(
                      prefixIcon: Icon(Icons.account_box),
                      hintText: "Username",
                      contentPadding: EdgeInsets.all(25),
                    ),
                    onSaved: (val) => _username = val,
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
                    onSaved: (val) => _password = val,
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
      bool authorized = await authUser(_username, _password);
      if (authorized) {
        Navigator.pushNamed(context, HomeScreen.routeName);
      }
    }
  }

  Future<bool> authUser(String username, String password) async {
    bool authorized = false; // for testing

    httpService.logIn(username, password);

    // final uri =
    //     Uri.parse('https://h2876375.stratoserver.net:9090/auth/login');
    // final headers = {'Content-Type': 'application/json'};
    // Map<String, dynamic> body = {
    //   'username': username,
    //   'password': password
    // }; // id?
    //
    // http.Response res = await http.post(
    //   uri,
    //   headers: headers,
    //   body: json.encode(body),
    //   encoding: Encoding.getByName('utf-8'),
    // );
    //
    // switch (res.statusCode) {
    //   case 200:
    //     authorized = !authorized;
    //     SharedPreferences prefs = await SharedPreferences.getInstance();
    //     prefs.setString("userid", jsonDecode(res.body));
    //     break;
    //   default:
    //     _authFail();
    //     break;
    // }

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

//TODO addGeoFence from response
// jwt token in prefs
