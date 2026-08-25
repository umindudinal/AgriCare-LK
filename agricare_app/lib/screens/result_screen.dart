import 'dart:io';
import 'package:flutter/material.dart';
import '../widgets/custom_button.dart';
import '../widgets/treatment_card.dart';

class ResultScreen extends StatelessWidget {
  final File image;
  final Map<String, dynamic> resultData;

  const ResultScreen({
    super.key,
    required this.image,
    required this.resultData,
  });

  @override
  Widget build(BuildContext context) {
    const primaryEmerald = Color(0xFF0F5A29);
    final data = resultData['data'] ?? {};
    final bool hasDetails = data['CommonName_SI'] != null;

    final String aiLabel = data['AI_Label'] ?? data['predicted_class'] ?? 'Unknown';
    final String diseaseTitle = hasDetails ? data['CommonName_SI'] : aiLabel;
    final String symptoms = data['Symptoms_SI'] ?? 'විස්තර ලබාදී නොමැත.';
    final List treatments = data['Treatments'] as List? ?? [];

    final double? confidence = resultData['confidence'] != null
        ? (resultData['confidence'] as num).toDouble()
        : null;

    final bool isHealthy = aiLabel.toLowerCase().contains('healthy');

    return Scaffold(
      backgroundColor: const Color(0xFFF3F7F3),
      body: SafeArea(
        child: Column(
          children: [
            // Top Hero Image & Results Header
            Expanded(
              child: SingleChildScrollView(
                physics: const BouncingScrollPhysics(),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Header Image Stack
                    Stack(
                      children: [
                        // Plant Image Banner
                        Container(
                          width: double.infinity,
                          height: 310,
                          decoration: BoxDecoration(
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.18),
                                blurRadius: 20,
                                offset: const Offset(0, 8),
                              ),
                            ],
                          ),
                          child: ClipRRect(
                            borderRadius: const BorderRadius.only(
                              bottomLeft: Radius.circular(36),
                              bottomRight: Radius.circular(36),
                            ),
                            child: Image.file(
                              image,
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),

                        // Shadow Overlay Gradient
                        Positioned.fill(
                          child: Container(
                            decoration: BoxDecoration(
                              borderRadius: const BorderRadius.only(
                                bottomLeft: Radius.circular(36),
                                bottomRight: Radius.circular(36),
                              ),
                              gradient: LinearGradient(
                                colors: [
                                  Colors.black.withValues(alpha: 0.6),
                                  Colors.transparent,
                                  Colors.black.withValues(alpha: 0.78),
                                ],
                                begin: Alignment.topCenter,
                                end: Alignment.bottomCenter,
                              ),
                            ),
                          ),
                        ),

                        // Top Action Button (Back)
                        Positioned(
                          top: 16,
                          left: 16,
                          child: CircleAvatar(
                            backgroundColor: Colors.black.withValues(alpha: 0.5),
                            radius: 22,
                            child: IconButton(
                              icon: const Icon(Icons.arrow_back_rounded, color: Colors.white, size: 22),
                              onPressed: () => Navigator.pop(context),
                              tooltip: 'ආපසු',
                            ),
                          ),
                        ),

                        // Status Badge Tag on Top Right
                        Positioned(
                          top: 16,
                          right: 16,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                            decoration: BoxDecoration(
                              color: isHealthy
                                  ? primaryEmerald
                                  : (hasDetails ? Colors.amber.shade900 : Colors.red.shade900),
                              borderRadius: BorderRadius.circular(22),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withValues(alpha: 0.3),
                                  blurRadius: 10,
                                  offset: const Offset(0, 3),
                                ),
                              ],
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(
                                  isHealthy
                                      ? Icons.check_circle_rounded
                                      : (hasDetails ? Icons.warning_amber_rounded : Icons.error_rounded),
                                  color: Colors.white,
                                  size: 17,
                                ),
                                const SizedBox(width: 6),
                                Flexible(
                                  child: Text(
                                    isHealthy
                                        ? 'නිරෝගී ශාකයකි'
                                        : (hasDetails ? 'රෝගයක් හඳුනාගන්නා ලදී' : 'අවධානය අවශ්‍යයි'),
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 12.5,
                                      fontWeight: FontWeight.bold,
                                    ),
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),

                        // Title Banner Overlay at Bottom of Image
                        Positioned(
                          bottom: 24,
                          left: 20,
                          right: 20,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Wrap(
                                spacing: 8,
                                runSpacing: 6,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 4),
                                    decoration: BoxDecoration(
                                      color: Colors.white.withValues(alpha: 0.25),
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    child: Text(
                                      'Label: $aiLabel',
                                      style: const TextStyle(
                                        color: Colors.white,
                                        fontSize: 12,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ),
                                  if (confidence != null)
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 4),
                                      decoration: BoxDecoration(
                                        color: confidence > 0.8
                                            ? Colors.green.shade600
                                            : Colors.amber.shade800,
                                        borderRadius: BorderRadius.circular(10),
                                        boxShadow: [
                                          BoxShadow(
                                            color: Colors.black.withValues(alpha: 0.2),
                                            blurRadius: 4,
                                          ),
                                        ],
                                      ),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          const Icon(Icons.bolt_rounded, color: Colors.white, size: 14),
                                          const SizedBox(width: 3),
                                          Text(
                                            'නිරවද්‍යතාව: ${(confidence * 100).toStringAsFixed(1)}%',
                                            style: const TextStyle(
                                              color: Colors.white,
                                              fontSize: 12,
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                ],
                              ),
                              const SizedBox(height: 10),
                              Text(
                                diseaseTitle,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                  letterSpacing: 0.2,
                                  shadows: [
                                    Shadow(
                                      color: Colors.black54,
                                      offset: Offset(0, 2),
                                      blurRadius: 6,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 24),

                    // Content Section
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 18),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          if (hasDetails) ...[
                            // Symptoms Card Container
                            Container(
                              width: double.infinity,
                              padding: const EdgeInsets.all(22),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(24),
                                border: Border.all(color: Colors.green.shade200, width: 1.4),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withValues(alpha: 0.06),
                                    blurRadius: 16,
                                    spreadRadius: 1,
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
                                          color: Colors.amber.shade50,
                                          borderRadius: BorderRadius.circular(14),
                                        ),
                                        child: Icon(
                                          Icons.search_rounded,
                                          color: Colors.amber.shade900,
                                          size: 24,
                                        ),
                                      ),
                                      const SizedBox(width: 14),
                                      Expanded(
                                        child: Text(
                                          'රෝග ලක්ෂණ (Symptoms)',
                                          style: TextStyle(
                                            fontSize: 17.5,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.grey.shade900,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 14),
                                  Text(
                                    symptoms,
                                    style: TextStyle(
                                      fontSize: 15.5,
                                      height: 1.55,
                                      color: Colors.grey.shade800,
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ],
                              ),
                            ),

                            const SizedBox(height: 26),

                            // Treatments Header
                            Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.all(8),
                                  decoration: BoxDecoration(
                                    color: primaryEmerald.withValues(alpha: 0.12),
                                    shape: BoxShape.circle,
                                  ),
                                  child: const Icon(
                                    Icons.health_and_safety_rounded,
                                    color: primaryEmerald,
                                    size: 22,
                                  ),
                                ),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Text(
                                    'නිර්දේශිත ප්‍රතිකාර ක්‍රම',
                                    style: TextStyle(
                                      fontSize: 19,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.grey.shade900,
                                    ),
                                  ),
                                ),
                              ],
                            ),

                            const SizedBox(height: 16),

                            // Treatment Cards List
                            if (treatments.isNotEmpty) ...[
                              ...treatments.asMap().entries.map((entry) {
                                final int idx = entry.key;
                                final item = entry.value;
                                return TreatmentCard(
                                  type: item['type'] ?? 'Organic',
                                  instruction: item['instruction'] ?? '',
                                  index: idx,
                                );
                              }),
                            ] else ...[
                              const Padding(
                                padding: EdgeInsets.all(12.0),
                                child: Text('ප්‍රතිකාර තොරතුරු සටහන් වී නොමැත.'),
                              ),
                            ],
                          ] else ...[
                            // Missing details alert card
                            Container(
                              padding: const EdgeInsets.all(22),
                              decoration: BoxDecoration(
                                color: Colors.orange.shade50,
                                borderRadius: BorderRadius.circular(24),
                                border: Border.all(color: Colors.orange.shade300, width: 1.4),
                              ),
                              child: Column(
                                children: [
                                  Icon(Icons.info_outline_rounded, color: Colors.orange.shade800, size: 52),
                                  const SizedBox(height: 14),
                                  Text(
                                    'සිංහල විස්තර ඇතුළත් කර නොමැත',
                                    style: TextStyle(
                                      fontSize: 18.5,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.orange.shade900,
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  Text(
                                    'මෙම AI Label ($aiLabel) සඳහා සිංහල විස්තර සහ ප්‍රතිකාර තවමත් දත්ත ගබඩාවට ඇතුළත් කර නොමැත.',
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                      fontSize: 14.5,
                                      color: Colors.orange.shade900,
                                      height: 1.45,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],

                          const SizedBox(height: 32),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Bottom Fixed Action Bar
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(24),
                  topRight: Radius.circular(24),
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.1),
                    blurRadius: 16,
                    offset: const Offset(0, -4),
                  ),
                ],
              ),
              child: Row(
                children: [
                  Expanded(
                    child: CustomButton(
                      label: 'තවත් ශාකයක් පරීක්ෂා කරන්න',
                      icon: Icons.camera_alt_rounded,
                      onPressed: () => Navigator.pop(context),
                      gradientColors: const [Color(0xFF0F5A29), Color(0xFF2E7D32)],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}