class LoginResponseModel {
  final String token;
  final String error;

 LoginResponseModel({required this.token, required this.error});

  factory LoginResponseModel.fromJson(Map<String, dynamic> json) {
    return LoginResponseModel(
      token: json['token'] ?? '',
      error: json['error'] ?? '',
    );
  }
}

class LoginRequestModel {
  String username;
  String password;

  LoginRequestModel({
    required this.username,
    required this.password,
  });

  Map<String, dynamic> toJson() {
    Map<String, dynamic> jmap = {
      'username': username.trim(),
      'password': password.trim(),
    };

    return jmap;
  }
}
