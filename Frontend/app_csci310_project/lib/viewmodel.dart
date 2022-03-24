import 'package:app_csci310_project/api.dart';
import 'package:app_csci310_project/dio_provider.dart';
import 'package:app_csci310_project/irepository.dart';
import 'package:app_csci310_project/message_dto.dart';
import 'package:app_csci310_project/repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final viewModelProvider = StateNotifierProvider<ViewModel, AsyncValue<MessageDTO>>((ref) => ViewModel(Repository(Api(ref.watch(dioProvider)))),); // StateNotifierProvider

class ViewModel extends StateNotifier<AsyncValue<MessageDTO>> {
  ViewModel(this._repository) : super(const AsyncLoading());

  final IRepository _repository;

  Future<void> retrieveMessage() async {
    state = const AsyncLoading();
    final MessageDTO message = await _repository.retrieveMessage();
    state = AsyncValue.data(message);
  }
}