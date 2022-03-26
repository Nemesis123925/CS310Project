import 'package:flutter/material.dart';

enum InputType {
  Username,
  Password
}

class InputField extends StatefulWidget {
  final String text;
  final InputType type;
  final TextEditingController controller;

  const InputField({required this.text, required this.controller, required this.type});

  @override
  _InputFieldState createState() => _InputFieldState();
}

class _InputFieldState extends State<InputField> {
  bool _valid = true;
  List<String> vowels = ['a', 'e', 'i', 'o'];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: TextFormField(
        controller: widget.controller,
        decoration: InputDecoration(
          alignLabelWithHint: true,
          enabledBorder: OutlineInputBorder(
              borderSide: const BorderSide(width: 1.5, color: Colors.grey),
              borderRadius: BorderRadius.circular(32.0)
          ),
          border: OutlineInputBorder(
              borderSide: const BorderSide(width: 1.5, color: Colors.grey),
              borderRadius: BorderRadius.circular(32.0)
          ),
          focusedBorder: OutlineInputBorder(
              borderSide: const BorderSide(width: 1.5, color: Colors.grey),
              borderRadius: BorderRadius.circular(32.0)
          ),
          errorBorder: OutlineInputBorder(
              borderSide: BorderSide(width: 1.5, color: Theme.of(context).errorColor),
              borderRadius: BorderRadius.circular(32.0)
          ),
          contentPadding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 18.0),
          labelText: widget.text,
          labelStyle: _valid ? Theme.of(context).textTheme.headline5 : Theme.of(context).textTheme.headline5?.copyWith(color: Theme.of(context).errorColor),
        ),
        style: Theme.of(context).textTheme.headline5?.copyWith(height: 1.5),
        obscureText: widget.type == InputType.Password ? true : false,
        keyboardType: widget.type == InputType.Username ? TextInputType.text: TextInputType.text,
        cursorColor: Colors.black,
        cursorWidth: 2.0,
        showCursor: true,
        validator: (value) {
          if (value == null) {
            setState(() {
              _valid = false;
            });
            return !vowels.contains(widget.text.toLowerCase()[0]) ? 'Please enter a ${widget.text.toLowerCase()}.' : 'Please enter an ${widget.text.toLowerCase()}';
          }
          else if (widget.type == InputType.Password) {
            if (value.length < 6) {
              return 'Your password must be at least 6 characters.';
            }
          }
          setState(() {
            _valid = true;
          });
          return null;
        },
      ),
    );
  }
}