const fs = require('fs');

// Create a minimal PNG header for solid color icons
function createPNG(width, height, r, g, b) {
    const data = [];
    
    // PNG signature
    data.push(0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A);
    
    // IHDR chunk
    const ihdr = [];
    ihdr.push(...intToBytes(width, 4));  // width
    ihdr.push(...intToBytes(height, 4)); // height
    ihdr.push(8);  // bit depth
    ihdr.push(2);  // color type (RGB)
    ihdr.push(0);  // compression
    ihdr.push(0);  // filter
    ihdr.push(0);  // interlace
    
    data.push(...createChunk('IHDR', ihdr));
    
    // IDAT chunk (compressed image data)
    const imageData = [];
    for (let y = 0; y < height; y++) {
        imageData.push(0); // filter type (none)
        for (let x = 0; x < width; x++) {
            // Create a simple icon pattern
            const centerX = width / 2;
            const centerY = height / 2;
            const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
            
            if (distance < width * 0.4) {
                imageData.push(0, 172, 193); // Teal color
            } else {
                imageData.push(255, 255, 255); // White background
            }
        }
    }
    
    // Simple deflate compression (uncompressed blocks)
    const compressed = [0x78, 0x9C]; // deflate header
    const blockSize = imageData.length;
    compressed.push(0x01); // final block, uncompressed
    compressed.push(blockSize & 0xFF, (blockSize >> 8) & 0xFF);
    compressed.push((~blockSize) & 0xFF, ((~blockSize) >> 8) & 0xFF);
    compressed.push(...imageData);
    
    // Add Adler-32 checksum
    let a = 1, b = 0;
    for (let i = 0; i < imageData.length; i++) {
        a = (a + imageData[i]) % 65521;
        b = (b + a) % 65521;
    }
    compressed.push((b >> 8) & 0xFF, b & 0xFF, (a >> 8) & 0xFF, a & 0xFF);
    
    data.push(...createChunk('IDAT', compressed));
    
    // IEND chunk
    data.push(...createChunk('IEND', []));
    
    return Buffer.from(data);
}

function intToBytes(value, bytes) {
    const result = [];
    for (let i = bytes - 1; i >= 0; i--) {
        result.push((value >> (i * 8)) & 0xFF);
    }
    return result;
}

function createChunk(type, data) {
    const result = [];
    result.push(...intToBytes(data.length, 4));
    result.push(...type.split('').map(c => c.charCodeAt(0)));
    result.push(...data);
    
    // CRC32 calculation
    const crc = calculateCRC32([...type.split('').map(c => c.charCodeAt(0)), ...data]);
    result.push(...intToBytes(crc, 4));
    
    return result;
}

function calculateCRC32(data) {
    const crcTable = [];
    for (let i = 0; i < 256; i++) {
        let c = i;
        for (let j = 0; j < 8; j++) {
            c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
        }
        crcTable[i] = c;
    }
    
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < data.length; i++) {
        crc = crcTable[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
    }
    return crc ^ 0xFFFFFFFF;
}

// Create icons in different sizes
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
sizes.forEach(size => {
    const png = createPNG(size, size, 0, 172, 193);
    fs.writeFileSync(`icon-${size}x${size}.png`, png);
    console.log(`Created icon-${size}x${size}.png`);
});

console.log('All PNG icons created successfully');
