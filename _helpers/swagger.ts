import express from 'express';
import path from 'path';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const router = express.Router();

// Define potential paths for swagger.yaml
const paths = [
  path.join(process.cwd(), 'swagger.yaml'),
  path.join(__dirname, '../swagger.yaml'),
  path.join(__dirname, './swagger.yaml')
];

let swaggerDocument;

for (const p of paths) {
  if (fs.existsSync(p)) {
    try {
      swaggerDocument = YAML.load(p);
      console.log(`Loaded Swagger documentation from: ${p}`);
      break;
    } catch (err) {
      console.error(`Failed to load Swagger from ${p}:`, err);
    }
  }
}

if (!swaggerDocument) {
  console.error('Could not find or load swagger.yaml in any of the expected paths.');
}

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;

