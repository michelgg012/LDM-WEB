#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración de tamaños y calidad
const IMAGE_SIZES = {
  'T': { width: 150, height: 150, quality: 85 }, // Thumbnail
  'M': { width: 300, height: 300, quality: 80 }, // Medium
  'X': { width: 600, height: 600, quality: 75 }  // Large
};

const OUTPUT_FORMATS = ['webp', 'jpg'];

// Paths
const INPUT_DIR = path.join(__dirname, '../src/assets/articulos');
const OUTPUT_DIR = path.join(__dirname, '../src/assets/articulos');

/**
 * Optimiza una imagen específica
 */
async function optimizeImage(inputPath, outputPath, size, format) {
  try {
    const sizeConfig = IMAGE_SIZES[size];
    let pipeline = sharp(inputPath)
      .resize(sizeConfig.width, sizeConfig.height, {
        fit: 'cover',
        position: 'center'
      });

    if (format === 'webp') {
      pipeline = pipeline.webp({ 
        quality: sizeConfig.quality,
        effort: 6
      });
    } else if (format === 'jpg') {
      pipeline = pipeline.jpeg({ 
        quality: sizeConfig.quality,
        progressive: true,
        mozjpeg: true
      });
    }

    await pipeline.toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    const originalStats = fs.statSync(inputPath);
    const savings = ((originalStats.size - stats.size) / originalStats.size * 100).toFixed(1);
    
    console.log(`✓ ${path.basename(outputPath)} - ${(stats.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
    
    return {
      success: true,
      originalSize: originalStats.size,
      optimizedSize: stats.size,
      savings: parseFloat(savings)
    };
  } catch (error) {
    console.error(`✗ Error optimizing ${outputPath}:`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Procesa todas las imágenes PNG en el directorio
 */
async function processAllImages() {
  console.log('🚀 Iniciando optimización de imágenes...\n');
  
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Directorio no encontrado: ${INPUT_DIR}`);
    return;
  }

  const files = fs.readdirSync(INPUT_DIR)
    .filter(file => file.endsWith('.png') || file.endsWith('.jpg'))
    .filter(file => !file.includes('T.') && !file.includes('M.') && !file.includes('X.'));

  if (files.length === 0) {
    console.log('ℹ️  No se encontraron imágenes para optimizar');
    return;
  }

  console.log(`📁 Procesando ${files.length} imágenes...\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const baseName = path.parse(file).name;
    
    console.log(`📸 Procesando: ${file}`);
    
    // Generar versiones optimizadas
    for (const size of Object.keys(IMAGE_SIZES)) {
      for (const format of OUTPUT_FORMATS) {
        const outputFileName = `${baseName}${size}.${format}`;
        const outputPath = path.join(OUTPUT_DIR, outputFileName);
        
        // Skip si ya existe
        if (fs.existsSync(outputPath)) {
          console.log(`  ↪ Saltando ${outputFileName} (ya existe)`);
          continue;
        }
        
        const result = await optimizeImage(inputPath, outputPath, size, format);
        
        if (result.success) {
          totalOriginalSize += result.originalSize;
          totalOptimizedSize += result.optimizedSize;
          successCount++;
        } else {
          errorCount++;
        }
      }
    }
    
    console.log(''); // Línea en blanco entre archivos
  }

  // Estadísticas finales
  const totalSavings = totalOriginalSize > 0 
    ? ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)
    : 0;

  console.log('📊 RESUMEN DE OPTIMIZACIÓN');
  console.log('='.repeat(50));
  console.log(`✅ Imágenes procesadas exitosamente: ${successCount}`);
  console.log(`❌ Errores: ${errorCount}`);
  console.log(`📉 Tamaño original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📈 Tamaño optimizado total: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 Ahorro total: ${totalSavings}%`);
  console.log(`🏆 Espacio ahorrado: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)} MB`);
}

/**
 * Función para optimizar una imagen específica
 */
async function optimizeSpecificImage(imageName) {
  const inputPath = path.join(INPUT_DIR, imageName);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Imagen no encontrada: ${imageName}`);
    return;
  }

  const baseName = path.parse(imageName).name;
  console.log(`📸 Optimizando: ${imageName}`);
  
  for (const size of Object.keys(IMAGE_SIZES)) {
    for (const format of OUTPUT_FORMATS) {
      const outputFileName = `${baseName}${size}.${format}`;
      const outputPath = path.join(OUTPUT_DIR, outputFileName);
      
      await optimizeImage(inputPath, outputPath, size, format);
    }
  }
}

/**
 * Limpiar imágenes optimizadas (para re-generar)
 */
function cleanOptimizedImages() {
  console.log('🧹 Limpiando imágenes optimizadas...');
  
  const files = fs.readdirSync(OUTPUT_DIR)
    .filter(file => /\d{5}[TMX]\.(webp|jpg)$/.test(file));
  
  files.forEach(file => {
    fs.unlinkSync(path.join(OUTPUT_DIR, file));
  });
  
  console.log(`✅ Eliminados ${files.length} archivos optimizados`);
}

// CLI
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'all':
    processAllImages();
    break;
  case 'clean':
    cleanOptimizedImages();
    break;
  case 'image':
    if (args[1]) {
      optimizeSpecificImage(args[1]);
    } else {
      console.error('❌ Por favor especifica el nombre de la imagen');
    }
    break;
  default:
    console.log('🎯 Uso:');
    console.log('  npm run optimize-images all    # Optimizar todas las imágenes');
    console.log('  npm run optimize-images clean  # Limpiar imágenes optimizadas');
    console.log('  npm run optimize-images image <nombre>  # Optimizar una imagen específica');
    console.log('');
    console.log('Ejemplos:');
    console.log('  npm run optimize-images all');
    console.log('  npm run optimize-images image 01234X.png');
    break;
}
