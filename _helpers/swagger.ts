import express from 'express';
import path from 'path';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const router = express.Router();

// Define potential paths for both swagger.json and swagger.yaml
const jsonPaths = [
  path.join(process.cwd(), 'swagger.json'),
  path.join(__dirname, '../swagger.json'),
  path.join(__dirname, './swagger.json'),
  path.join(process.cwd(), 'dist/swagger.json')
];

const yamlPaths = [
  path.join(process.cwd(), 'swagger.yaml'),
  path.join(__dirname, '../swagger.yaml'),
  path.join(__dirname, './swagger.yaml'),
  path.join(process.cwd(), 'dist/swagger.yaml')
];

let swaggerDocument: any = null;

// First, try loading the pre-compiled swagger.json (highly reliable and fast in production)
for (const p of jsonPaths) {
  if (fs.existsSync(p)) {
    try {
      const fileContent = fs.readFileSync(p, 'utf8');
      swaggerDocument = JSON.parse(fileContent);
      console.log(`Successfully loaded compiled Swagger JSON from: ${p}`);
      break;
    } catch (err) {
      console.error(`Failed to parse Swagger JSON from ${p}:`, err);
    }
  }
}

// Fallback to yamljs parsing if JSON is not available
if (!swaggerDocument) {
  for (const p of yamlPaths) {
    if (fs.existsSync(p)) {
      try {
        swaggerDocument = YAML.load(p);
        console.log(`Loaded Swagger documentation from YAML: ${p}`);
        break;
      } catch (err) {
        console.error(`Failed to load Swagger YAML from ${p}:`, err);
      }
    }
  }
}

if (!swaggerDocument) {
  console.error('Could not find or load swagger.json or swagger.yaml in any of the expected paths.');
}

// Configure Swagger UI options to prevent reverse proxy asset/styling bugs
const options = {
  customSiteTitle: "Node.js Sign-up and Verification API",
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    persistAuthorization: true
  }
};

// Prevent server crashes by gracefully handling missing/malformed documentation
if (swaggerDocument) {
  router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
} else {
  router.use('/', (req, res) => {
    res.status(500).send('Swagger documentation could not be loaded. Please check server logs.');
  });
}

export default router;

