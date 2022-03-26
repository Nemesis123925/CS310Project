import 'package:app_csci310_project/models/login_model.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:app_csci310_project/components/buttons.dart';
import 'package:app_csci310_project/components/input_field.dart';
import 'package:app_csci310_project/models/user.dart';



class LoginPage extends StatefulWidget {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final GlobalKey<FormState> _loginKey = GlobalKey<FormState>();

  LoginPage({Key? key}) : super(key: key);
}

class _LoginPageState extends State<LoginPage> {
  bool isApiCallProcess = false;
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
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
        resizeToAvoidBottomInset: false,
        backgroundColor: Theme.of(context).colorScheme.secondary,
        key: _scaffoldKey,
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
                    key: globalFormKey,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: <Widget> [
                          const SizedBox(height: 19),
                          TextFormField(
                            keyboardType: TextInputType.text,
                            onSaved: (input) => loginRequestModel.username =
                              input!),
                          const SizedBox(height: 19),
                          TextFormField(
                            keyboardType: TextInputType.text,
                            onSaved: (input) => loginRequestModel.password =
                              input!),
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
                                  apiService.login(loginRequestModel).then(
                                  (value) {

    }
    }
  ],
  ),
  ),
  ),
  ),
  ),
  )
  )
  );
}

  bool validateAndSave() {
    final form = _loginKey.currentState;
    if (form.validate()) {
      form.save();
      return true;
    }
    return false;
  }
}
}