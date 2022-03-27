import 'package:app_csci310_project/models/login_model.dart';
import 'package:flutter_http_post_request/api/api_service.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:app_csci310_project/components/buttons.dart';
import 'package:app_csci310_project/components/input_field.dart';
import 'package:app_csci310_project/models/user.dart';
import 'package:flutter_progress_hud/flutter_progress_hud.dart';



class LoginPage extends StatefulWidget {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final GlobalKey<FormState> _loginKey = GlobalKey<FormState>();

  LoginPage({Key? key}) : super(key: key);
  _LoginPageState create() => _LoginPageState();
}


class _LoginPageState extends State<LoginPage> {
  bool isApiCallProcess = false;
  GlobalKey<FormState> _globalFormKey = GlobalKey<FormState>();
  LoginRequestModel loginRequestModel;
  final _scaffoldKey = GlobalKey<ScaffoldState>();
  @override
  void initState() {
    super.initState();
    loginRequestModel = new LoginRequestModel();
  }

  @override
  Widget build(BuildContext context) {
    return ProgressHUD(
      child: _uiSetup(context),
      inAsyncCall: isApiCallProcess,
      opacity: 0.3,
    );
  }

  Widget _uiSetup(BuildContext context) {
    return Scaffold(
        key: _scaffoldKey,
        resizeToAvoidBottomInset: false,
        backgroundColor: Theme.of(context).colorScheme.secondary,
        appBar: AppBar (
          title: const Text("Login")
        ),
        body: SingleChildScrollView(
            child: Center(
              child: Card(
                elevation: 3.0,
                child: ConstrainedBox(
                  constraints: const BoxConstraints(
                    maxWidth: 400,
                  ),
                  child: Form(
                    key: _globalFormKey,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: <Widget> [
                          // const SizedBox(height: 19),
                          TextFormField(
                            keyboardType: TextInputType.text,
                            onSaved: (input) => loginRequestModel.username =
                              input!,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter a username';
                              }
                              return null;
                              },
                          ),
                          // const SizedBox(height: 19),
                          TextFormField(
                            keyboardType: TextInputType.text,
                            onSaved: (input) => loginRequestModel.password =
                              input!,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter a password';
                              }
                              return null;
                            },
                          ),
                  //
                          PrimaryButton(
                              title: 'LOG IN',
                              onPressed: () {
                                if (validateAndSave()) {
                                  print(loginRequestModel.toJson());

                                  setState(() {
                                    isApiCallProcess = true;
                                  });

                                  APIService apiService = new APIService();
                                  apiService.login(loginRequestModel).then((value) {
                                    if (value != null) {
                                      setState(() {
                                        isApiCallProcess = false;
                                      });

                                      if (value.token.isNotEmpty) {
                                        const snackBar = SnackBar(
                                            content: Text('Login Successful'));
                                        ScaffoldMessenger.of(context).showSnackBar(snackBar);
                                      } else {
                                        const snackBar = SnackBar(
                                            content: Text('Login Unsuccessful'));
                                        ScaffoldMessenger.of(context).showSnackBar(snackBar);
                                      }
                                    }
                                  });
                                }
                                },
                            ],
                          ),
                  ),
                ),
              ),
            ),
        )
    );
  }

  // validating the login and saving the validated state
  bool validateAndSave() {
    if (_globalFormKey.currentState!.validate()) {
      _globalFormKey.currentState!.save();
      return true;
    }
    return false;
  }
}
}