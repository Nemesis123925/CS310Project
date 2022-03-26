import 'package:app_csci310_project/pages/login_page.dart';
import 'package:app_csci310_project/pages/map_page.dart';
import 'package:app_csci310_project/pages/menu_page.dart';
import 'package:app_csci310_project/pages/order_confirmation_page.dart';
import 'package:app_csci310_project/pages/prev_purchases_page.dart';
import 'package:flutter/material.dart';

const String loginRoute = '/';
const String mapRoute = '/map_route';
const String menuRoute = '/menu_route';
const String orderConfirmRoute = '/order_confirm_route';
const String prevPurchasesRoute = '/prev_purchases_route';


Route<dynamic> generateRoute(RouteSettings settings) {
  switch (settings.name) {
    case loginRoute:
      return MaterialPageRoute(
        settings : settings,
        builder: (_) => LoginPage(),
      );

    case mapRoute:
      return MaterialPageRoute(
        settings : settings,
        builder: (_) => MapPage(),
      );

    case menuRoute:
      return MaterialPageRoute(
        settings : settings,
        builder: (_) => MenuPage(),
      );

    case orderConfirmRoute:
      return MaterialPageRoute(
        settings : settings,
        builder: (_) => orderConfirmPage(),
      );

    case prevPurchasesRoute:
      return MaterialPageRoute(
        settings : settings,
        builder: (_) => PrevPurchasesPage(),
      );

    default:
      return null;
  }
}