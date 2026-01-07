#!/usr/bin/env node

/**
 * Script de redimensionnement des images WebP
 * 
 * Ce script crée des versions redimensionnées des images pour différentes tailles d'affichage :
 * - thumbnail: 200x200px (miniatures)
 * - small: 600x800px (grilles mobile)
 * - medium: 900x1200px (grilles desktop)
 * - large: 1200x1600px (images principales desktop)
 * - xlarge: 1800x2400px (hero images)
 * 
 * Usage:
 *   npm run resize-images
 * 
 * Prérequis:
 *   npm install --save-dev sharp
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/assets/products');

// Tailles cibles pour différentes utilisations
const SIZES = {
  thumbnail: { width: 200, height: 200, suffix: '-thumb' },
  small: { width: 600, height: 800, suffix: '-small' },
  medium: { width: 900, height: 1200, suffix: '-medium' },
  large: { width: 1200, height: 1600, suffix: '-large' },
  xlarge: { width: 1800, height: 2400, suffix: '-xlarge' },
};

// Vérifier si sharp est disponible
let sharp;
try {
  const sharpModule = await import('sharp');
  sharp = sharpModule.default || sharpModule;
} catch (e) {
  console.error('❌ Le module "sharp" n\'est pas installé.');
  console.log('\n📦 Pour installer sharp:');
  console.log('   cd frontend');
  console.log('   npm install --save-dev sharp');
  process.exit(1);
}

// Fonction pour redimensionner une image
async function resizeImage(inputPath, outputPath, width, height) {
  try {
    // Redimensionner avec sharp en conservant l'aspect ratio et en remplissant
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover', // Couvre la zone, peut recadrer
        position: 'center',
        withoutEnlargement: true, // Ne pas agrandir si l'image est plus petite
      })
      .webp({
        quality: 85,
        effort: 6,
        lossless: false,
      })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    return {
      success: true,
      size: stats.size,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Fonction principale
async function main() {
  console.log('🚀 Début du redimensionnement des images WebP...\n');

  // Lire tous les fichiers .webp (ignorer les backups et les versions déjà redimensionnées)
  const files = fs.readdirSync(IMAGES_DIR)
    .filter(file => file.endsWith('.webp'))
    .filter(file => !file.includes('backup'))
    .filter(file => !file.includes('-thumb'))
    .filter(file => !file.includes('-small'))
    .filter(file => !file.includes('-medium'))
    .filter(file => !file.includes('-large'))
    .filter(file => !file.includes('-xlarge'));

  if (files.length === 0) {
    console.log('⚠️  Aucune image WebP originale trouvée dans', IMAGES_DIR);
    return;
  }

  console.log(`📸 ${files.length} image(s) trouvée(s)\n`);

  const stats = {
    total: 0,
    success: 0,
    failed: 0,
    totalOriginalSize: 0,
    totalOptimizedSize: 0,
    bySize: {},
  };

  // Créer les dossiers de taille si nécessaire (ou les intégrer dans le nom de fichier)
  // On va créer les versions avec suffixe dans le même dossier

  // Traiter chaque image
  for (const file of files) {
    const inputPath = path.join(IMAGES_DIR, file);
    const baseName = path.parse(file).name;
    const ext = path.parse(file).ext;

    console.log(`📸 Traitement de ${file}...`);

    const originalStats = fs.statSync(inputPath);
    stats.totalOriginalSize += originalStats.size;

    // Générer toutes les tailles
    for (const [sizeName, config] of Object.entries(SIZES)) {
      const outputFileName = `${baseName}${config.suffix}${ext}`;
      const outputPath = path.join(IMAGES_DIR, outputFileName);

      // Skip si la version existe déjà
      if (fs.existsSync(outputPath)) {
        console.log(`   ⏭️  ${sizeName} existe déjà, ignoré`);
        continue;
      }

      process.stdout.write(`   ⏳ Génération ${sizeName} (${config.width}x${config.height})... `);

      const result = await resizeImage(
        inputPath,
        outputPath,
        config.width,
        config.height
      );

      if (result.success) {
        stats.success++;
        stats.total++;
        if (!stats.bySize[sizeName]) {
          stats.bySize[sizeName] = { count: 0, totalSize: 0 };
        }
        stats.bySize[sizeName].count++;
        stats.bySize[sizeName].totalSize += result.size;
        stats.totalOptimizedSize += result.size;

        const sizeKB = (result.size / 1024).toFixed(0);
        console.log(`✅ ${sizeKB} KB`);
      } else {
        stats.failed++;
        console.log(`❌ Échec: ${result.error}`);
      }
    }
    console.log('');
  }

  // Résumé
  console.log('='.repeat(60));
  console.log('📊 RÉSUMÉ');
  console.log('='.repeat(60));
  console.log(`✅ Images redimensionnées avec succès: ${stats.success}`);
  if (stats.failed > 0) {
    console.log(`❌ Échecs: ${stats.failed}`);
  }
  console.log(`📦 Images traitées: ${files.length}`);
  console.log(`📦 Total versions créées: ${stats.total}`);
  console.log(`💾 Taille totale des versions optimisées: ${(stats.totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log('\n📐 Versions créées par taille:');
  for (const [sizeName, data] of Object.entries(stats.bySize)) {
    const avgSize = (data.totalSize / data.count / 1024).toFixed(0);
    console.log(`   ${sizeName.padEnd(10)}: ${data.count} images, ~${avgSize} KB/image`);
  }
  console.log('='.repeat(60));

  console.log('\n✨ Redimensionnement terminé!');
  console.log('\n💡 Prochaines étapes:');
  console.log('   1. Modifier OptimizedImage pour utiliser srcset');
  console.log('   2. Mettre à jour les composants pour spécifier les tailles nécessaires');
}

// Exécuter
main().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});
