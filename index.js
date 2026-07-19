const express = require("express");
const seedData = require("./seed.json");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON body parsing for POST requests
app.use(express.json());

// Existing route
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    session: "NB6007CEM S2"
  });
});

// Provinces
app.get("/provinces", (req, res) => {
  res.json(seedData.provinces);
});

app.get("/provinces/:provinceId", (req, res) => {
  const province = seedData.provinces.find(
    p => String(p.id) === req.params.provinceId
  );

  if (!province) {
    return res.status(404).json({ error: "Province not found" });
  }

  res.json(province);
});

app.post("/provinces", (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ error: "id and name are required" });
  }
  const exists = seedData.provinces.some(p => String(p.id) === String(id));
  if (exists) {
    return res.status(400).json({ error: "Province already exists" });
  }
  const newProvince = { id: Number(id), name };
  seedData.provinces.push(newProvince);
  res.status(201).json(newProvince);
});

// Districts
app.get("/districts", (req, res) => {
  res.json(seedData.districts);
});

app.get("/districts/:districtId", (req, res) => {
  const district = seedData.districts.find(
    d => String(d.id) === req.params.districtId
  );

  if (!district) {
    return res.status(404).json({ error: "District not found" });
  }

  res.json(district);
});

app.post("/districts", (req, res) => {
  const { id, name, province_id } = req.body;
  if (!id || !name || !province_id) {
    return res.status(400).json({ error: "id, name, and province_id are required" });
  }
  const exists = seedData.districts.some(d => String(d.id) === String(id));
  if (exists) {
    return res.status(400).json({ error: "District already exists" });
  }
  const newDistrict = { id: Number(id), name, province_id: Number(province_id) };
  seedData.districts.push(newDistrict);
  res.status(201).json(newDistrict);
});

// Stations
app.get("/stations", (req, res) => {
  res.json(seedData.stations);
});

app.get("/stations/:stationId", (req, res) => {
  const station = seedData.stations.find(
    s => String(s.id) === req.params.stationId
  );

  if (!station) {
    return res.status(404).json({ error: "Station not found" });
  }

  res.json(station);
});

app.post("/stations", (req, res) => {
  const { id, name, district_id } = req.body;
  if (!id || !name || !district_id) {
    return res.status(400).json({ error: "id, name, and district_id are required" });
  }
  const exists = seedData.stations.some(s => String(s.id) === String(id));
  if (exists) {
    return res.status(400).json({ error: "Station already exists" });
  }
  const newStation = { id: Number(id), name, district_id: Number(district_id) };
  seedData.stations.push(newStation);
  res.status(201).json(newStation);
});

// Vehicles
app.get("/vehicles", (req, res) => {
  res.json(seedData.vehicles);
});

app.get("/vehicles/:vehicleId", (req, res) => {
  const vehicle = seedData.vehicles.find(
    v => String(v.id) === req.params.vehicleId
  );

  if (!vehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  res.json(vehicle);
});

app.post("/vehicles", (req, res) => {
  const { id, register_number, device_id, station_id } = req.body;
  if (!id || !register_number || !device_id || !station_id) {
    return res.status(400).json({ error: "id, register_number, device_id, and station_id are required" });
  }
  const exists = seedData.vehicles.some(v => String(v.id) === String(id));
  if (exists) {
    return res.status(400).json({ error: "Vehicle already exists" });
  }
  const newVehicle = { id: Number(id), register_number, device_id, station_id: Number(station_id) };
  seedData.vehicles.push(newVehicle);
  res.status(201).json(newVehicle);
});

// Models
app.get("/models", (req, res) => {
  res.json(seedData.models);
});

app.get("/models/:modelId", (req, res) => {
  const model = seedData.models.find(
    m => String(m.id) === req.params.modelId
  );

  if (!model) {
    return res.status(404).json({ error: "Model not found" });
  }

  res.json(model);
});

app.post("/models", (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ error: "id and name are required" });
  }
  const exists = seedData.models.some(m => String(m.id) === String(id));
  if (exists) {
    return res.status(400).json({ error: "Model already exists" });
  }
  const newModel = { id: Number(id), name };
  seedData.models.push(newModel);
  res.status(201).json(newModel);
});

// Vehicle Pings
app.get("/vehicles/:vehicleId/pings", (req, res) => {
  const vehicle = seedData.vehicles.find(
    v => String(v.id) === req.params.vehicleId
  );

  if (!vehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  const pings = seedData.pings.filter(
    p => String(p.vehicle_id) === req.params.vehicleId
  );

  res.json(pings);
});

app.post("/vehicles/:vehicleId/pings", (req, res) => {
  const { vehicleId } = req.params;
  const { id, latitude, longitude, timestamp } = req.body;

  const vehicleExists = seedData.vehicles.some(v => String(v.id) === String(vehicleId));
  if (!vehicleExists) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  if (!id || latitude === undefined || longitude === undefined || !timestamp) {
    return res.status(400).json({ error: "id, latitude, longitude, and timestamp are required" });
  }

  const newPing = {
    id: Number(id),
    vehicle_id: Number(vehicleId),
    latitude: Number(latitude),
    longitude: Number(longitude),
    timestamp
  };

  seedData.pings.push(newPing);
  res.status(201).json(newPing);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});