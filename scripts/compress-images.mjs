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

// Vérifier si sharp est disponible (doit être importé en haut si disponible)
let sharp;
try {
  const sharpModule = await import('sharp');
  sharp = sharpModule.default || sharpModule;
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

  // Créer un fichier temporaire pour la sortie (Sharp ne peut pas utiliser le même fichier pour input et output)
  const tempPath = outputPath + '.tmp';

  try {
    // Compresser avec sharp vers le fichier temporaire
    // Qualité 85 pour WebP (bon équilibre qualité/taille)
    // Effort 6 (équilibre vitesse/compression)
    await sharp(inputPath)
      .webp({ 
        quality: 85,
        effort: 6,
        lossless: false 
      })
      .toFile(tempPath);

    // Vérifier la taille du fichier compressé
    const tempStats = fs.statSync(tempPath);
    const newSize = tempStats.size;

    // Si la nouvelle taille est plus petite, remplacer l'original
    // Sinon, garder l'original et supprimer le temporaire
    if (newSize < originalSize) {
      fs.renameSync(tempPath, outputPath);
      const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      return {
        success: true,
        originalSize,
        newSize,
        reduction: parseFloat(reduction),
        optimized: true,
      };
    } else {
      // L'image était déjà optimisée, garder l'original
      fs.unlinkSync(tempPath);
      const increase = ((newSize - originalSize) / originalSize * 100).toFixed(1);
      return {
        success: true,
        originalSize,
        newSize: originalSize, // On garde la taille originale
        reduction: 0,
        optimized: false,
        wouldIncrease: parseFloat(increase),
      };
    }
  } catch (error) {
    // Supprimer le fichier temporaire en cas d'erreur s'il existe
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
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
      
      if (result.optimized) {
        const sizeDiff = (result.originalSize - result.newSize) / 1024;
        console.log(`✅ ${result.reduction.toFixed(1)}% réduit (${sizeDiff.toFixed(0)} KB économisés)`);
      } else {
        console.log(`ℹ️  Déjà optimisée (serait ${result.wouldIncrease.toFixed(1)}% plus lourd si recompressée)`);
      }
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
  console.log(`📦 Taille après optimisation: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
  if (totalOriginalSize > 0) {
    const totalReduction = ((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1);
    const savedMB = (totalOriginalSize - totalNewSize) / 1024 / 1024;
    if (savedMB > 0) {
      console.log(`💰 Réduction totale: ${totalReduction}% (${savedMB.toFixed(2)} MB économisés)`);
    } else {
      console.log(`ℹ️  Les images étaient déjà optimisées (aucune réduction possible sans perte de qualité)`);
    }
  }
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
