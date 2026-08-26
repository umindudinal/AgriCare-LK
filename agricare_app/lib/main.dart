import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const AgriCareApp());
}

class AgriCareApp extends StatelessWidget {
  const AgriCareApp({super.key});

  @override
  Widget build(BuildContext context) {
    const primaryEmerald = Color(0xFF0F5A29);
    const secondaryLime = Color(0xFF388E3C);
    const surfaceLight = Color(0xFFF3F7F3);

    return MaterialApp(
      title: 'AgriCare LK',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        fontFamily: 'Iskoola Pota',
        colorScheme: ColorScheme.fromSeed(
          seedColor: primaryEmerald,
          primary: primaryEmerald,
          secondary: secondaryLime,
          surface: surfaceLight,
          brightness: Brightness.light,
        ),
        scaffoldBackgroundColor: surfaceLight,
        appBarTheme: const AppBarTheme(
          centerTitle: true,
          elevation: 0,
          scrolledUnderElevation: 2,
          backgroundColor: primaryEmerald,
          foregroundColor: Colors.white,
          titleTextStyle: TextStyle(
            fontFamily: 'Iskoola Pota',
            fontSize: 22,
            fontWeight: FontWeight.bold,
            letterSpacing: 0.5,
            color: Colors.white,
          ),
        ),
        cardTheme: CardThemeData(
          elevation: 4,
          shadowColor: Colors.black.withValues(alpha: 0.06),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          color: Colors.white,
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            elevation: 3,
            shadowColor: primaryEmerald.withValues(alpha: 0.3),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            textStyle: const TextStyle(
              fontFamily: 'Iskoola Pota',
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
      home: const HomeScreen(),
    );
  }
}
