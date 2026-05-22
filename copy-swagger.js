const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'swagger.yaml');
const destinations = [
  path.join(__dirname, 'dist', 'swagger.yaml'),
  path.join(__dirname, 'dist', '_helpers', 'swagger.yaml')
];

for (const dest of destinations) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log(`Copied swagger.yaml to: ${dest}`);
}
