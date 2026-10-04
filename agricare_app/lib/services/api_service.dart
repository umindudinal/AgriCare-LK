import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

class ApiService {
  // Web (Chrome) uses localhost, physical mobile devices use machine LAN IP
  static String get baseUrl {
    if (kIsWeb) {
      return 'http://localhost:3000/api';
    }
    return 'http://192.168.43.193:3000/api';
  }

  static Future<Map<String, dynamic>?> analyzePlant({
    required Uint8List imageBytes,
    required String filename,
    required String plantType,
  }) async {
    try {
      var request = http.MultipartRequest(
        'POST',
        Uri.parse('$baseUrl/analyze-plant'),
      );
      request.fields['plantType'] = plantType;

      request.files.add(
        http.MultipartFile.fromBytes(
          'image',
          imageBytes,
          filename: filename,
        ),
      );

      print("🚀 $plantType ඡායාරූපය API එක වෙත යවමින් පවතී ($baseUrl)...");

      var streamedResponse = await request.send();
      var response = await http.Response.fromStream(streamedResponse);

      if (response.statusCode == 200) {
        print("✅ සාර්ථකව ප්‍රතිඵල ලැබුණා!");
        return json.decode(response.body);
      } else {
        print("❌ API Error: ${response.statusCode}");
        return null;
      }
    } catch (e) {
      print("⚠️ Network Error: $e");
      return null;
    }
  }
}
