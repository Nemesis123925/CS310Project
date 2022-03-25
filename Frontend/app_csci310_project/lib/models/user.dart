import 'package:meta/meta.dart';

@immutable
class UserModel {
  final String username;
  final String password;

  const UserModel({
    required this.username,
    required this.password
  });
