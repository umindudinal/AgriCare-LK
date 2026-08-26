import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'http://192.168.8.129:3000/api';
  static Future<Map<String, dynamic>?> analyzePlant(
    File imageFile,
    String plantType,
  ) async {
    try {
      var request = http.MultipartRequest(
        'POST',
        Uri.parse('$baseUrl/analyze-plant'),
      );
      request.fields['plantType'] = plantType;

      request.files.add(
        await http.MultipartFile.fromPath('image', imageFile.path),
      );

      print("🚀 $plantType ඡායාරූපය API එක වෙත යවමින් පවතී...");

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
