#!/usr/bin/env node

/**
 * Script de compression des images WebP
 * 
 * Ce script compresse toutes les images WebP dans le dossier public/assets/products/
 * pour réduire leur taille de 50-70% tout en maintenant une bonne qualité visuelle.
 * 
 * Usage:
 *   npm run compress-images
 *   ou
 *   node scripts/compress-images.js
 * 
 * Prérequis:
 *   npm install --save-dev sharp
 * 
 * Ou utiliser l'alternative:
 *   npm install -g squoosh-cli
 *   squoosh-cli --webp auto -d public/assets/products public/assets/products/*.webp
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/assets/products');
const BACKUP_DIR = path.join(__dirname, '../public/assets/products/backup');

// Vérifier si sharp est disponible
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (e) {
  console.error('❌ Le module "sharp" n\'est pas installé.');
  console.log('\n📦 Pour installer sharp:');
  console.log('   cd frontend');
  console.log('   npm install --save-dev sharp');
  console.log('\n🔄 Alternative: utiliser squoosh-cli');
  console.log('   npm install -g squoosh-cli');
  console.log('   squoosh-cli --webp auto -d public/assets/products public/assets/products/*.webp');
  process.exit(1);
}

// Créer le dossier de backup s'il n'existe pas
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log('✅ Dossier de backup créé:', BACKUP_DIR);
}

// Fonction pour compresser une image
async function compressImage(inputPath, outputPath, backupPath) {
  const stats = fs.statSync(inputPath);
  const originalSize = stats.size;

  // Sauvegarder l'original
  fs.copyFileSync(inputPath, backupPath);

  try {
    // Compresser avec sharp
    // Qualité 85 pour WebP (bon équilibre qualité/taille)
    // Effort 6 (équilibre vitesse/compression)
    await sharp(inputPath)
      .webp({ 
        quality: 85,
        effort: 6,
        lossless: false 
      })
      .toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    return {
      success: true,
      originalSize,
      newSize,
      reduction: parseFloat(reduction),
    };
  } catch (error) {
    console.error(`❌ Erreur lors de la compression de ${inputPath}:`, error.message);
    // Restaurer l'original en cas d'erreur
    fs.copyFileSync(backupPath, inputPath);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Fonction principale
async function main() {
  console.log('🚀 Début de la compression des images WebP...\n');

  // Lire tous les fichiers .webp
  const files = fs.readdirSync(IMAGES_DIR)
    .filter(file => file.endsWith('.webp'))
    .filter(file => !file.includes('backup'));

  if (files.length === 0) {
    console.log('⚠️  Aucune image WebP trouvée dans', IMAGES_DIR);
    return;
  }

  console.log(`📸 ${files.length} image(s) trouvée(s)\n`);

  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let successCount = 0;
  let failCount = 0;

  // Traiter chaque image
  for (const file of files) {
    const inputPath = path.join(IMAGES_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);
    
    process.stdout.write(`⏳ Compression de ${file}... `);

    const result = await compressImage(inputPath, inputPath, backupPath);

    if (result.success) {
      totalOriginalSize += result.originalSize;
      totalNewSize += result.newSize;
      successCount++;
      const sizeDiff = (result.originalSize - result.newSize) / 1024;
      console.log(`✅ ${result.reduction}% réduit (${sizeDiff.toFixed(0)} KB économisés)`);
    } else {
      failCount++;
      console.log(`❌ Échec: ${result.error}`);
    }
  }

  // Résumé
  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSUMÉ');
  console.log('='.repeat(60));
  console.log(`✅ Images compressées avec succès: ${successCount}`);
  if (failCount > 0) {
    console.log(`❌ Images en échec: ${failCount}`);
  }
  console.log(`📦 Taille originale totale: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 Taille après compression: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
  const totalReduction = ((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1);
  console.log(`💰 Réduction totale: ${totalReduction}% (${((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2)} MB économisés)`);
  console.log(`💾 Backups sauvegardés dans: ${BACKUP_DIR}`);
  console.log('='.repeat(60));

  if (successCount > 0) {
    console.log('\n✨ Compression terminée avec succès!');
    console.log('💡 Pour restaurer les images originales:');
    console.log(`   cp ${BACKUP_DIR}/*.webp ${IMAGES_DIR}/`);
  }
}

// Exécuter
main().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});

// Note: Ce script doit être renommé en .mjs ou le package.json doit être configuré
// Pour utiliser CommonJS, renommez le fichier en compress-images.cjs
