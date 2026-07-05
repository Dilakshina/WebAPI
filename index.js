const express = require("express");
const seedData = require("./seed.json");

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});