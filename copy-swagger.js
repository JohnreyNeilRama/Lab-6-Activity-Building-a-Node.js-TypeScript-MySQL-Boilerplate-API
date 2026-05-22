const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');

const src = path.join(__dirname, 'swagger.yaml');

// Parse YAML to JS Object at build time
let swaggerDocument;
try {
  swaggerDocument = YAML.load(src);
  console.log('Successfully parsed swagger.yaml at build time.');
} catch (err) {
  console.error('Failed to parse swagger.yaml at build time:', err);
  process.exit(1);
}

const jsonContent = JSON.stringify(swaggerDocument, null, 2);

const destinations = [
  { yaml: path.join(__dirname, 'dist', 'swagger.yaml'), json: path.join(__dirname, 'dist', 'swagger.json') },
  { yaml: path.join(__dirname, 'dist', '_helpers', 'swagger.yaml'), json: path.join(__dirname, 'dist', '_helpers', 'swagger.json') }
];

for (const dest of destinations) {
  // Ensure the target directory exists
  const dir = path.dirname(dest.yaml);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Copy original YAML file
  fs.copyFileSync(src, dest.yaml);
  console.log(`Copied swagger.yaml to: ${dest.yaml}`);
  
  // Write JSON file
  fs.writeFileSync(dest.json, jsonContent, 'utf8');
  console.log(`Created and saved swagger.json to: ${dest.json}`);
}

