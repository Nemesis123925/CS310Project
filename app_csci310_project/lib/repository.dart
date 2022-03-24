import 'package:app_csci310_project/message_dto.dart';

class Repository implements IRepository {
  Repository(this._api);

  final Api _api;

  @override
  Future<MessageDTO> retrieveMessage() => _api.retrieveMessage();

}
