/* global use, db */
// MongoDB Playground
// This playground script seeds the database with the data from seed.json.
// The playground executes commands against the active MongoDB connection in the VS Code extension.

const fs = require('fs');
const path = require('path');

// Select the database to use. You can rename this to your preferred database name.
use('nb6007cem-db');

// Load seed.json data
let rawData;
try {
  rawData = fs.readFileSync(path.join(__dirname, 'seed.json'), 'utf8');
} catch (e) {
  try {
    rawData = fs.readFileSync('./seed.json', 'utf8');
  } catch (err) {
    throw new Error("Could not find seed.json. Please make sure the seed.json file is in the same directory as this script or update the path in fs.readFileSync.");
  }
}

const seedData = JSON.parse(rawData);

console.log("Starting database seeding...");

// Helper function to seed a collection
function seedCollection(name, data) {
  if (!data || !Array.isArray(data)) {
    console.log(`No valid data found for collection: ${name}`);
    return;
  }
  
  console.log(`Seeding collection '${name}' with ${data.length} documents...`);
  
  // Clear existing documents to make the script idempotent
  db.getCollection(name).deleteMany({});
  
  // Insert new documents in chunks of 1000 to prevent hitting payload/BSON limits
  const chunkSize = 1000;
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    db.getCollection(name).insertMany(chunk);
  }
  
  console.log(`Successfully seeded collection '${name}'!`);
}

// Seed all collections from seed.json
seedCollection('provinces', seedData.provinces);
seedCollection('districts', seedData.districts);
seedCollection('stations', seedData.stations);
seedCollection('vehicles', seedData.vehicles);
seedCollection('models', seedData.models);
seedCollection('pings', seedData.pings);

console.log("Seeding completed successfully!");
