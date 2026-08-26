import 'package:flutter/material.dart';

class InfoScreen extends StatelessWidget {
  const InfoScreen({super.key});

  @override
  Widget build(BuildContext context) {
    const primaryEmerald = Color(0xFF0F5A29);
    const secondaryLime = Color(0xFF2E7D32);

    return Scaffold(
      backgroundColor: const Color(0xFFF3F7F3),
      appBar: AppBar(
        title: const Text(
          'ඇප් එක ගැන (About App)',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        backgroundColor: primaryEmerald,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [primaryEmerald, secondaryLime, Color(0xFF388E3C)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(26),
                  boxShadow: [
                    BoxShadow(
                      color: primaryEmerald.withValues(alpha: 0.38),
                      blurRadius: 18,
                      offset: const Offset(0, 7),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(18),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.22),
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.12),
                            blurRadius: 12,
                          ),
                        ],
                      ),
                      child: const Icon(
                        Icons.eco_rounded,
                        color: Colors.white,
                        size: 56,
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'AgriCare LK',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 0.6,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 14,
                        vertical: 5,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.25),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: const Text(
                        'v2.0.0 (Smart Agro AI Pro Edition)',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    const SizedBox(height: 14),
                    Text(
                      'ශ්‍රී ලංකා කෘෂිකර්මාන්තය උදෙසා නිර්මාණය කළ AI ශාක සෞඛ්‍ය සහකරු',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white.withValues(alpha: 0.94),
                        fontSize: 14,
                        height: 1.45,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildDiagnosticBadge(
                    icon: Icons.memory_rounded,
                    title: 'AI Engine',
                    status: 'Ready ⚡',
                    color: Colors.purple.shade700,
                  ),
                  _buildDiagnosticBadge(
                    icon: Icons.dns_rounded,
                    title: 'Backend API',
                    status: 'Connected 🟢',
                    color: Colors.green.shade700,
                  ),
                  _buildDiagnosticBadge(
                    icon: Icons.translate_rounded,
                    title: 'Language',
                    status: '100% සිංහල 🇱🇰',
                    color: Colors.blue.shade700,
                  ),
                ],
              ),

              const SizedBox(height: 26),

              Text(
                'සහය දක්වන වගාවන් (Supported Crops)',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.grey.shade900,
                ),
              ),
              const SizedBox(height: 14),

              Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: _buildCropInfoCard(
                          emoji: '🍅',
                          name: 'තක්කාලි වගාව',
                          diseaseCount: 'රෝග කාණ්ඩ 10ක්',
                          accentColor: primaryEmerald,
                          diseases: [
                            'Bacterial Spot',
                            'Early Blight',
                            'Late Blight',
                            'Leaf Mold',
                            'Healthy',
                          ],
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: _buildCropInfoCard(
                          emoji: '🌶️',
                          name: 'මිරිස් වගාව',
                          diseaseCount: 'රෝග කාණ්ඩ 7ක්',
                          accentColor: const Color(0xFFD84315),
                          diseases: [
                            'Fruit Rot (කරල් කුණුවීම)',
                            'Leaf Curl',
                            'Leaf Spot',
                            'Whitefly',
                            'Healthy',
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _buildCropInfoCard(
                    emoji: '🍆',
                    name: 'වම්බටු වගාව (Brinjal)',
                    diseaseCount: 'රෝග කාණ්ඩ 5ක්',
                    accentColor: const Color(0xFF6A1B9A),
                    diseases: [
                      'Fruit Cracking (ගෙඩි පිපිරීම)',
                      'Phomopsis Blight',
                      'Shoot & Fruit Borer',
                      'Wet Rot',
                      'Healthy Fruit',
                    ],
                  ),
                ],
              ),

              const SizedBox(height: 26),

              _buildSectionCard(
                icon: Icons.auto_awesome_rounded,
                title: 'භාවිතා කරන ආකාරය (How It Works)',
                iconColor: Colors.blue.shade800,
                iconBg: Colors.blue.shade50,
                child: Column(
                  children: [
                    _buildStepRow(
                      stepNumber: '1',
                      title: 'වගාව තෝරන්න',
                      description:
                          'තක්කාලි (🍅), මිරිස් (🌶️) හෝ වම්බටු (🍆) බෝගය තෝරන්න.',
                    ),
                    const SizedBox(height: 14),
                    _buildStepRow(
                      stepNumber: '2',
                      title: 'AI විශ්ලේෂණය',
                      description:
                          'Keras CNN AI Models මගින් රෝගී තත්ත්වය තත්පර 2කින් හඳුනාගනී.',
                    ),
                    const SizedBox(height: 14),
                    _buildStepRow(
                      stepNumber: '3',
                      title: 'උපදෙස් සහ ප්‍රතිකාර',
                      description:
                          'සිංහලෙන්ම රෝග ලක්ෂණ, කාබනික සහ රසායනික ප්‍රතිකාර ලබාගන්න.',
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 28),

              Center(
                child: Column(
                  children: [
                    const Icon(
                      Icons.eco_rounded,
                      color: primaryEmerald,
                      size: 32,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Agri Care • Smart Agro Sri Lanka',
                      style: TextStyle(
                        fontSize: 13.5,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey.shade800,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Copyright © 2026. All Rights Reserved.',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey.shade600,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDiagnosticBadge({
    required IconData icon,
    required String title,
    required String status,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: color.withValues(alpha: 0.2), width: 1.2),
        boxShadow: [
          BoxShadow(
            color: color.withValues(alpha: 0.08),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          Icon(icon, color: color, size: 24),
          const SizedBox(height: 6),
          Text(
            title,
            style: TextStyle(fontSize: 11.5, color: Colors.grey.shade600),
          ),
          const SizedBox(height: 2),
          Text(
            status,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionCard({
    required IconData icon,
    required String title,
    required Color iconColor,
    required Color iconBg,
    required Widget child,
  }) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.grey.shade200, width: 1.2),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 14,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(9),
                decoration: BoxDecoration(
                  color: iconBg,
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Icon(icon, color: iconColor, size: 24),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 17.5,
                    fontWeight: FontWeight.bold,
                    color: Colors.grey.shade900,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          child,
        ],
      ),
    );
  }

  Widget _buildCropInfoCard({
    required String emoji,
    required String name,
    required String diseaseCount,
    required Color accentColor,
    required List<String> diseases,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(
          color: accentColor.withValues(alpha: 0.25),
          width: 1.4,
        ),
        boxShadow: [
          BoxShadow(
            color: accentColor.withValues(alpha: 0.08),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(emoji, style: const TextStyle(fontSize: 26)),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      name,
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                        color: Colors.grey.shade900,
                      ),
                    ),
                    Text(
                      diseaseCount,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: accentColor,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 6,
            runSpacing: 6,
            children: diseases.map((d) {
              return Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: accentColor.withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  d,
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: accentColor,
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildStepRow({
    required String stepNumber,
    required String title,
    required String description,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.all(10),
          decoration: const BoxDecoration(
            color: Color(0xFF0F5A29),
            shape: BoxShape.circle,
          ),
          child: Text(
            stepNumber,
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontSize: 13,
            ),
          ),
        ),
        const SizedBox(width: 14),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                  color: Colors.grey.shade900,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                description,
                style: TextStyle(
                  fontSize: 13,
                  height: 1.4,
                  color: Colors.grey.shade700,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
