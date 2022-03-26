import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:app_csci310_project/models/login_model.dart';

class HttpService {
  Future<LoginResponseModel> login(LoginRequestModel requestModel) async {
    String url = 'http://localhost:3001/';

    final response = await http.post(url, body: requestModel.toJson());
    if (response.statusCode == 200 || response.statusCode == 400) {
      return LoginResponseModel.fromJson(
        json.decode(response.body),
      );
    } else {
      throw Exception('Failed to load data!');
    }
  }

}