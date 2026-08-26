import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../services/api_service.dart';
import '../widgets/agri_tip_card.dart';
import '../widgets/custom_button.dart';
import 'info_screen.dart';
import 'result_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  File? _selectedImage;
  final ImagePicker _picker = ImagePicker();
  bool _isLoading = false;

  String _selectedPlant = 'tomato';

  Future<void> _pickImage(ImageSource source) async {
    try {
      final XFile? pickedFile = await _picker.pickImage(
        source: source,
        imageQuality: 85,
      );

      if (pickedFile != null) {
        setState(() {
          _selectedImage = File(pickedFile.path);
          _isLoading = true;
        });

        final result = await ApiService.analyzePlant(
          _selectedImage!,
          _selectedPlant,
        );

        if (!mounted) return;

        setState(() {
          _isLoading = false;
        });

        if (result != null) {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) =>
                  ResultScreen(image: _selectedImage!, resultData: result),
            ),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: const Row(
                children: [
                  Icon(Icons.error_outline_rounded, color: Colors.white),
                  SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      '❌ සේවාදායකය (Backend API) සමඟ සම්බන්ධ වීමේ දෝෂයක්.',
                    ),
                  ),
                ],
              ),
              backgroundColor: Colors.red.shade700,
              behavior: SnackBarBehavior.floating,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14),
              ),
            ),
          );
        }
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _isLoading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('ඡායාරූපය ලබාගැනීමේදී දෝෂයක්: $e'),
          backgroundColor: Colors.red.shade700,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
        ),
      );
    }
  }

  void _resetSelection() {
    setState(() {
      _selectedImage = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    const primaryEmerald = Color(0xFF0F5A29);
    const chiliOrange = Color(0xFFD84315);
    const brinjalPurple = Color(0xFF6A1B9A);

    final isChili = _selectedPlant == 'chili';
    final isBrinjal = _selectedPlant == 'brinjal';

    final Color plantThemeColor = isChili
        ? chiliOrange
        : (isBrinjal ? brinjalPurple : primaryEmerald);

    final List<Color> bannerGradient = isChili
        ? const [Color(0xFFBF360C), Color(0xFFD84315), Color(0xFFE65100)]
        : (isBrinjal
              ? const [Color(0xFF4A148C), Color(0xFF6A1B9A), Color(0xFF8E24AA)]
              : const [
                  Color(0xFF0F5A29),
                  Color(0xFF2E7D32),
                  Color(0xFF388E3C),
                ]);

    final String partnerBadgeText = isChili
        ? 'මිරිස් වගා සහකරු'
        : (isBrinjal ? 'වම්බටු වගා සහකරු' : 'තක්කාලි වගා සහකරු');

    final String partnerBannerTitle = isChili
        ? 'මිරිස් වගාව සුරකිමු'
        : (isBrinjal ? 'වම්බටු වගාව සුරකිමු' : 'තක්කාලි වගාව සුරකිමු');

    final String categoryBadgeText = isChili
        ? 'රෝග කාණ්ඩ 7ක්'
        : (isBrinjal ? 'රෝග කාණ්ඩ 5ක්' : 'රෝග කාණ්ඩ 10ක්');

    final String cropEmoji = isChili ? '🌶️' : (isBrinjal ? '🍆' : '🍅');

    final String scannerTitleText = isChili
        ? 'මිරිස් ගස පරීක්ෂා කිරීම'
        : (isBrinjal ? 'වම්බටු ගස පරීක්ෂා කිරීම' : 'තක්කාලි ගස පරීක්ෂා කිරීම');

    final String addPhotoPromptText = isChili
        ? 'මිරිස් ගසක ඡායාරූපයක් එක් කරන්න'
        : (isBrinjal
              ? 'වම්බටු ගසේ ඡායාරූපයක් එක් කරන්න'
              : 'තක්කාලි ගසේ ඡායාරූපයක් එක් කරන්න');

    final List<Color> cameraButtonGradient = isChili
        ? const [Color(0xFFD84315), Color(0xFFE65100)]
        : (isBrinjal
              ? const [Color(0xFF6A1B9A), Color(0xFF8E24AA)]
              : const [Color(0xFF0F5A29), Color(0xFF2E7D32)]);

    return Scaffold(
      backgroundColor: const Color(0xFFF3F7F3),
      appBar: AppBar(
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(7),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.25),
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.eco_rounded,
                color: Colors.white,
                size: 22,
              ),
            ),
            const SizedBox(width: 10),
            const Text(
              'AgriCare LK',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                letterSpacing: 0.6,
                fontSize: 21,
              ),
            ),
            const SizedBox(width: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.25),
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Text(
                'AI PRO 2.0',
                style: TextStyle(
                  fontSize: 10.5,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 0.5,
                ),
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.info_outline_rounded, size: 24),
            tooltip: 'ඇප් එක ගැන',
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const InfoScreen()),
              );
            },
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AnimatedContainer(
                duration: const Duration(milliseconds: 350),
                width: double.infinity,
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 14,
                ),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: bannerGradient,
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: plantThemeColor.withValues(alpha: 0.3),
                      blurRadius: 14,
                      offset: const Offset(0, 5),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 8,
                                  vertical: 3,
                                ),
                                decoration: BoxDecoration(
                                  color: Colors.white.withValues(alpha: 0.25),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Text(
                                      cropEmoji,
                                      style: const TextStyle(fontSize: 12),
                                    ),
                                    const SizedBox(width: 4),
                                    Flexible(
                                      child: Text(
                                        partnerBadgeText,
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontSize: 11,
                                          fontWeight: FontWeight.bold,
                                        ),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                partnerBannerTitle,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  letterSpacing: 0.2,
                                ),
                              ),
                              const SizedBox(height: 3),
                              Text(
                                'ඡායාරූපයක් යොමුකර ක්ෂණික AI රෝග විනිශ්චය ලබාගන්න.',
                                style: TextStyle(
                                  color: Colors.white.withValues(alpha: 0.92),
                                  fontSize: 12,
                                  height: 1.3,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 10),
                        AnimatedContainer(
                          duration: const Duration(milliseconds: 350),
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: Colors.white.withValues(alpha: 0.25),
                            shape: BoxShape.circle,
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.1),
                                blurRadius: 8,
                                offset: const Offset(0, 3),
                              ),
                            ],
                          ),
                          child: Text(
                            cropEmoji,
                            style: const TextStyle(fontSize: 28),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 5,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.black.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _buildHeaderStat('⚡ 2Sec AI', 'විශ්ලේෂණය'),
                          Container(
                            width: 1,
                            height: 16,
                            color: Colors.white24,
                          ),
                          _buildHeaderStat('🇱🇰 100%', 'සිංහලෙන්ම'),
                          Container(
                            width: 1,
                            height: 16,
                            color: Colors.white24,
                          ),
                          _buildHeaderStat('🛡️ 99%', 'නිරවද්‍යතාව'),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      'එළවළු / වගාව තෝරන්න (Select Crop)',
                      style: TextStyle(
                        fontSize: 14.5,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey.shade900,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: plantThemeColor.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      categoryBadgeText,
                      style: TextStyle(
                        fontSize: 11.5,
                        fontWeight: FontWeight.bold,
                        color: plantThemeColor,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),

              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 4,
                ),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: plantThemeColor, width: 2.0),
                  boxShadow: [
                    BoxShadow(
                      color: plantThemeColor.withValues(alpha: 0.15),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _selectedPlant,
                    isExpanded: true,
                    icon: Icon(
                      Icons.keyboard_arrow_down_rounded,
                      color: plantThemeColor,
                      size: 28,
                    ),
                    dropdownColor: Colors.white,
                    borderRadius: BorderRadius.circular(18),
                    onChanged: (String? newValue) {
                      if (newValue != null && newValue != _selectedPlant) {
                        setState(() {
                          _selectedPlant = newValue;
                          _selectedImage = null;
                        });
                      }
                    },
                    items: [
                      DropdownMenuItem<String>(
                        value: 'tomato',
                        child: Row(
                          children: [
                            const Text('🍅', style: TextStyle(fontSize: 24)),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'තක්කාලි (Tomato)',
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 15,
                                    ),
                                  ),
                                  Text(
                                    'රෝග කාණ්ඩ 10ක්',
                                    style: TextStyle(
                                      fontSize: 11.5,
                                      color: Colors.grey.shade600,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      DropdownMenuItem<String>(
                        value: 'chili',
                        child: Row(
                          children: [
                            const Text('🌶️', style: TextStyle(fontSize: 24)),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'මිරිස් (Chili)',
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 15,
                                    ),
                                  ),
                                  Text(
                                    'රෝග කාණ්ඩ 7ක්',
                                    style: TextStyle(
                                      fontSize: 11.5,
                                      color: Colors.grey.shade600,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      DropdownMenuItem<String>(
                        value: 'brinjal',
                        child: Row(
                          children: [
                            const Text('🍆', style: TextStyle(fontSize: 24)),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'වම්බටු (Brinjal)',
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 15,
                                    ),
                                  ),
                                  Text(
                                    'රෝග කාණ්ඩ 5ක්',
                                    style: TextStyle(
                                      fontSize: 11.5,
                                      color: Colors.grey.shade600,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 20),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      scannerTitleText,
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey.shade900,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  if (_selectedImage != null)
                    TextButton.icon(
                      onPressed: _resetSelection,
                      icon: const Icon(Icons.refresh_rounded, size: 18),
                      label: const Text('නැවත තෝරන්න'),
                      style: TextButton.styleFrom(
                        foregroundColor: Colors.red.shade700,
                        textStyle: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 12),

              AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                height: 310,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(26),
                  border: Border.all(
                    color: _selectedImage != null
                        ? plantThemeColor
                        : plantThemeColor.withValues(alpha: 0.35),
                    width: 2.2,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: plantThemeColor.withValues(alpha: 0.1),
                      blurRadius: 18,
                      spreadRadius: 1,
                      offset: const Offset(0, 6),
                    ),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(24),
                  child: Stack(
                    children: [
                      if (_selectedImage != null) ...[
                        Image.file(
                          _selectedImage!,
                          width: double.infinity,
                          height: double.infinity,
                          fit: BoxFit.cover,
                        ),
                        if (_isLoading)
                          Container(
                            color: Colors.black.withValues(alpha: 0.75),
                            padding: const EdgeInsets.symmetric(
                              horizontal: 20,
                              vertical: 16,
                            ),
                            child: const Center(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  SizedBox(
                                    width: 50,
                                    height: 50,
                                    child: CircularProgressIndicator(
                                      valueColor: AlwaysStoppedAnimation<Color>(
                                        Colors.white,
                                      ),
                                      strokeWidth: 4,
                                    ),
                                  ),
                                  SizedBox(height: 22),
                                  Text(
                                    'AI හරහා විශ්ලේෂණය වෙමින් පවතී...',
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 17,
                                      fontWeight: FontWeight.bold,
                                      height: 1.3,
                                    ),
                                  ),
                                  SizedBox(height: 8),
                                  Text(
                                    'රෝග ලක්ෂණ සහ ප්‍රතිකාර සොයමින් පවතී',
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                      color: Colors.white70,
                                      fontSize: 13.5,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                      ] else ...[
                        Container(
                          padding: const EdgeInsets.all(24),
                          width: double.infinity,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Container(
                                padding: const EdgeInsets.all(22),
                                decoration: BoxDecoration(
                                  color: plantThemeColor.withValues(
                                    alpha: 0.12,
                                  ),
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                    color: plantThemeColor.withValues(
                                      alpha: 0.3,
                                    ),
                                    width: 1.5,
                                  ),
                                ),
                                child: Icon(
                                  Icons.center_focus_weak_rounded,
                                  size: 52,
                                  color: plantThemeColor,
                                ),
                              ),
                              const SizedBox(height: 18),
                              Text(
                                addPhotoPromptText,
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  fontSize: 16.5,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.grey.shade900,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'පැහැදිලි ඡායාරූපයක් ලබාදීමෙන් වඩාත් නිවැරදි AI විශ්ලේෂණයක් ලබාගත හැක.',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  fontSize: 13,
                                  color: Colors.grey.shade600,
                                  height: 1.4,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 24),

              if (!_isLoading) ...[
                Row(
                  children: [
                    Expanded(
                      child: CustomButton(
                        label: 'කැමරාව',
                        icon: Icons.camera_alt_rounded,
                        onPressed: () => _pickImage(ImageSource.camera),
                        backgroundColor: plantThemeColor,
                        gradientColors: cameraButtonGradient,
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: CustomButton(
                        label: 'ගැලරිය',
                        icon: Icons.photo_library_rounded,
                        onPressed: () => _pickImage(ImageSource.gallery),
                        gradientColors: const [
                          Color(0xFF0288D1),
                          Color(0xFF0277BD),
                        ],
                      ),
                    ),
                  ],
                ),
              ],

              const SizedBox(height: 32),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildFeatureBadge(
                    icon: Icons.bolt_rounded,
                    label: 'ක්ශණික AI',
                    color: Colors.amber.shade800,
                    onTap: _showInstantAiModal,
                  ),
                  _buildFeatureBadge(
                    icon: Icons.eco_rounded,
                    label: 'කාබනික විසඳුම්',
                    color: Colors.green.shade700,
                    onTap: _showOrganicSolutionsModal,
                  ),
                  _buildFeatureBadge(
                    icon: Icons.translate_rounded,
                    label: '100% සිංහල',
                    color: Colors.blue.shade700,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const InfoScreen(),
                        ),
                      );
                    },
                  ),
                ],
              ),

              const SizedBox(height: 32),

              Text(
                'ගොවි දැනුම සහ උපදෙස්',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.grey.shade900,
                ),
              ),
              const SizedBox(height: 14),

              SizedBox(
                height: 155,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  physics: const BouncingScrollPhysics(),
                  children: [
                    AgriTipCard(
                      title: isChili
                          ? 'මිරිස් කොළ කොඩවීම'
                          : (isBrinjal
                                ? 'වම්බටු පණුවන් පාලනය'
                                : 'තක්කාලි වගාව'),
                      description: isChili
                          ? 'මිරිස් වගාවේ කොළ කොඩවීම (Leaf Curl) සඳහා සුදුමැස්සන් පාලනය කරන්න.'
                          : (isBrinjal
                                ? 'වම්බටු දළු සහ කරල් විදින පණුවා පාලනයට ෆෙරමෝන් උගුල් භාවිත කරන්න.'
                                : 'පත්‍ර කහ වීම සහ Curly වීම වැළැක්වීමට කාබනික සාරය භාවිත කරන්න.'),
                      icon: isChili
                          ? Icons.local_fire_department_rounded
                          : (isBrinjal
                                ? Icons.spa_rounded
                                : Icons.local_florist_rounded),
                      accentColor: plantThemeColor,
                    ),
                    const AgriTipCard(
                      title: 'නිවැරදි ඡායාරූප',
                      description:
                          'පත්‍රයේ/ගෙඩියේ රෝගී ස්ථානය හොඳින් ආලෝකය ඇති විට ඡායාරූපගත කරන්න.',
                      icon: Icons.camera_rounded,
                      accentColor: Color(0xFF0288D1),
                    ),
                    const AgriTipCard(
                      title: 'කාබනික පලිබෝධ පාලනය',
                      description:
                          'කොහොඹ ඇට සාරය සහ බෝඩෝ මිශ්‍රණය භාවිතයෙන් රෝග කාරක දිලීර පාලනය කල හැක.',
                      icon: Icons.eco_rounded,
                      accentColor: Color(0xFF388E3C),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeaderStat(String title, String subtitle) {
    return Column(
      children: [
        Text(
          title,
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 12.5,
          ),
        ),
        Text(
          subtitle,
          style: TextStyle(
            color: Colors.white.withValues(alpha: 0.85),
            fontSize: 10.5,
          ),
        ),
      ],
    );
  }



  void _showInstantAiModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        padding: const EdgeInsets.all(24),
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 42,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const SizedBox(height: 18),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.amber.shade50,
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.bolt_rounded,
                color: Colors.amber.shade900,
                size: 38,
              ),
            ),
            const SizedBox(height: 14),
            const Text(
              '⚡ ක්ෂණික AI රෝග විනිශ්චය',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              'Keras CNN Vision AI මාදිලිය මගින් ශාක පත්‍රයේ ඡායාරූපය පරික්ෂා කර තත්පර 2ක් ඇතුළත රෝගී තත්ත්වය සහ ඊට අදාළ ප්‍රතිකාර හඳුනා ගනී.',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 14,
                color: Colors.grey.shade700,
                height: 1.45,
              ),
            ),
            const SizedBox(height: 22),
            ElevatedButton.icon(
              onPressed: () {
                Navigator.pop(context);
                _pickImage(ImageSource.camera);
              },
              icon: const Icon(Icons.camera_alt_rounded),
              label: const Text('කැමරාවෙන් ඡායාරූපයක් ගන්න'),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF0F5A29),
                foregroundColor: Colors.white,
                minimumSize: const Size(double.infinity, 50),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
            ),
            const SizedBox(height: 10),
          ],
        ),
      ),
    );
  }

  void _showOrganicSolutionsModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.72,
        padding: const EdgeInsets.all(22),
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 42,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.grey.shade300,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: Colors.green.shade50,
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Icon(
                    Icons.eco_rounded,
                    color: Colors.green.shade700,
                    size: 28,
                  ),
                ),
                const SizedBox(width: 14),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '🌿 කාබනික විසඳුම් (Organic Remedies)',
                        style: TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        'පරිසර හිතකාමී ස්වාභාවික පලිබෝධ පාලනය',
                        style: TextStyle(fontSize: 12, color: Colors.grey),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 18),
            Expanded(
              child: ListView(
                physics: const BouncingScrollPhysics(),
                children: [
                  _buildOrganicTipTile(
                    '🍃 කොහොඹ ඇට සාරය (Neem Extract)',
                    'සුදුමැස්සන්, කුඩිත්තන් සහ පත්‍ර කන පණුවන් පාලනයට කොහොඹ ඇට කොටා වතුරට එකතු කර ඉසින්න.',
                  ),
                  _buildOrganicTipTile(
                    '🧪 බෝඩෝ මිශ්‍රණය (Bordeaux Mixture)',
                    'සුදුහුනු සහ තඹ තුත්තනාගම් මිශ්‍ර කර සාදාගන්නා මෙය දිලීර රෝග සහ පත්‍ර කහ වීම වැළැක්වීමට විශිෂ්ටයි.',
                  ),
                  _buildOrganicTipTile(
                    '🧄 ඉඟුරු-සුදුලූනු-මිරිස් සාරය',
                    'ස්වාභාවික කෘමිනාශකයක් ලෙස කොළ කොඩවීමට හේතුවන රෙදි මැක්කන් හා සුදුමැස්සන් පලවා හරියි.',
                  ),
                  _buildOrganicTipTile(
                    '🧼 සබන් දියර මිශ්‍රණය',
                    'වතුර ලීටරයකට සබන් දියර තේ හැන්දක් එකතු කර ඉසීමෙන් මෘදු සිරුරු සහිත කෘමීන් පාලනය වේ.',
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildOrganicTipTile(String title, String desc) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFFF3F7F3),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.green.shade100, width: 1.2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 14.5,
              color: Color(0xFF0F5A29),
            ),
          ),
          const SizedBox(height: 5),
          Text(
            desc,
            style: TextStyle(
              fontSize: 13,
              color: Colors.grey.shade800,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeatureBadge({
    required IconData icon,
    required String label,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Material(
      color: Colors.transparent,
      borderRadius: BorderRadius.circular(18),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(18),
        splashColor: color.withValues(alpha: 0.15),
        highlightColor: color.withValues(alpha: 0.08),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.all(13),
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.12),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, color: color, size: 26),
              ),
              const SizedBox(height: 8),
              Text(
                label,
                style: TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.bold,
                  color: Colors.grey.shade800,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
