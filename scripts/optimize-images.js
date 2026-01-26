const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const IMAGES_DIR = path.join(__dirname, '..', 'images');
const OPTIONS = {
  jpeg: {
    quality: 85,
    progressive: true,
    mozjpeg: true,
  },
  png: {
    quality: 85,
    compressionLevel: 6,
  },
  webp: {
    quality: 80,
  },
  convertToWebp: true, // Set to false if you don't want WebP versions
};

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

// Log function
const log = (message, type = 'info') => {
  const colors = {
    info: '\x1b[36m', // Cyan
    success: '\x1b[32m', // Green
    error: '\x1b[31m', // Red
    reset: '\x1b[0m', // Reset
  };
  console.log(
    `${colors[type]}[${type.toUpperCase()}]${colors.reset} ${message}`
  );
};

// Function to optimize a single image
const optimizeImage = async (filePath) => {
  try {
    const fileName = path.basename(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const nameWithoutExt = path.basename(fileName, ext);

    // Skip unsupported formats
    if (!SUPPORTED_FORMATS.includes(ext)) {
      log(`Skipping unsupported format: ${fileName}`, 'info');
      return;
    }

    // Read original image size
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;

    // Create sharp instance
    const image = sharp(filePath);

    // Optimize based on format
    let optimizedImage;
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        optimizedImage = image.jpeg(OPTIONS.jpeg);
        break;
      case '.png':
        optimizedImage = image.png(OPTIONS.png);
        break;
      case '.webp':
        optimizedImage = image.webp(OPTIONS.webp);
        break;
    }

    // Save optimized image
    await optimizedImage.toFile(filePath);

    // Create WebP version if enabled
    if (OPTIONS.convertToWebp && ext !== '.webp') {
      await image
        .webp(OPTIONS.webp)
        .toFile(path.join(IMAGES_DIR, `${nameWithoutExt}.webp`));
      log(`Created WebP version: ${nameWithoutExt}.webp`, 'success');
    }

    // Calculate and log savings
    const newStats = fs.statSync(filePath);
    const newSize = newStats.size;
    const saved = originalSize - newSize;
    const savedPercent = ((saved / originalSize) * 100).toFixed(2);

    log(
      `Optimized: ${fileName} (${(originalSize / 1024).toFixed(2)}KB → ${(newSize / 1024).toFixed(2)}KB, saved ${(saved / 1024).toFixed(2)}KB (${savedPercent}%)`,
      'success'
    );

    return {
      fileName,
      originalSize,
      newSize,
      saved,
      savedPercent,
    };
  } catch (error) {
    log(`Error optimizing ${filePath}: ${error.message}`, 'error');
    return null;
  }
};

// Main function
const main = async () => {
  log('Starting image optimization...', 'info');

  try {
    // Read images directory
    const files = fs.readdirSync(IMAGES_DIR);
    const imageFiles = files
      .filter((file) =>
        SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase())
      )
      .map((file) => path.join(IMAGES_DIR, file));

    log(`Found ${imageFiles.length} images to optimize`, 'info');

    // Process images
    const results = await Promise.all(imageFiles.map(optimizeImage));

    // Calculate total savings
    const successfulResults = results.filter((r) => r !== null);
    const totalOriginalSize = successfulResults.reduce(
      (sum, r) => sum + r.originalSize,
      0
    );
    const totalNewSize = successfulResults.reduce(
      (sum, r) => sum + r.newSize,
      0
    );
    const totalSaved = totalOriginalSize - totalNewSize;
    const totalSavedPercent = ((totalSaved / totalOriginalSize) * 100).toFixed(
      2
    );

    log('\nOptimization complete!', 'success');
    log(
      `Processed: ${successfulResults.length}/${imageFiles.length} images`,
      'info'
    );
    log(
      `Total savings: ${(totalSaved / 1024).toFixed(2)}KB (${totalSavedPercent}%)`,
      'success'
    );
  } catch (error) {
    log(`Fatal error: ${error.message}`, 'error');
    process.exit(1);
  }
};

// Run the script
if (require.main === module) {
  main();
}

module.exports = { optimizeImage, main };
