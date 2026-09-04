import express from 'express';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = Number(process.env.PORT || 8787);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'applications.json');
const distDir = path.resolve(__dirname, '../dist');

app.use(express.json({ limit: '100kb' }));

const allowedCities = new Set([
  'Lagos (Island / Lekki / VI)',
  'Lagos (Mainland / Ikeja / Surulere)',
  'Abuja (FCT Central / Wuse / Garki)',
  'Port Harcourt (Rivers)',
  'Ibadan (Oyo State)',
  'Kano (Northern Hub)',
  'Enugu / Onitsha',
  'Accra (Ghana Hub)',
  'Nairobi (Kenya Hub)',
]);

function text(value: unknown, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function createApplicationId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  const suffix = Math.floor(100000 + Math.random() * 900000);
  return `RIDER-${date}-${suffix}`;
}

app.post('/api/apply-rider', async (req, res) => {
  const payload = {
    fullName: text(req.body?.fullName, 120),
    email: text(req.body?.email, 160).toLowerCase(),
    phone: text(req.body?.phone, 40),
    city: text(req.body?.city, 100),
    vehicleCategory: text(req.body?.vehicleCategory, 100),
    hasVehicle: text(req.body?.hasVehicle, 120),
    licenseNumber: text(req.body?.licenseNumber, 80),
    experienceYears: text(req.body?.experienceYears, 80),
    residentialAddress: text(req.body?.residentialAddress, 300),
    guarantorAvailable: text(req.body?.guarantorAvailable, 20),
    notes: text(req.body?.notes, 1200),
  };

  if (!payload.fullName || !payload.email || !payload.phone || !payload.residentialAddress) {
    return res.status(400).json({ error: 'Please complete all required fields.' });
  }
  if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (!allowedCities.has(payload.city)) {
    return res.status(400).json({ error: 'Please choose a valid operating hub.' });
  }

  const record = {
    applicationId: createApplicationId(),
    submittedAt: new Date().toISOString(),
    ...payload,
  };

  try {
    await fs.mkdir(dataDir, { recursive: true });
    let existing: unknown[] = [];
    try {
      existing = JSON.parse(await fs.readFile(dataFile, 'utf8')) as unknown[];
      if (!Array.isArray(existing)) existing = [];
    } catch (error: any) {
      if (error?.code !== 'ENOENT') throw error;
    }
    existing.push(record);
    await fs.writeFile(dataFile, JSON.stringify(existing, null, 2));
    return res.status(201).json({ applicationId: record.applicationId });
  } catch (error) {
    console.error('Failed to save application:', error);
    return res.status(500).json({ error: 'We could not save your application. Please try again.' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use(express.static(distDir));
app.use((_req, res, next) => {
  const indexPath = path.join(distDir, 'index.html');
  fs.access(indexPath)
    .then(() => res.sendFile(indexPath))
    .catch(() => next());
});

app.listen(PORT, () => {
  console.log(`Metro Transit API running on http://localhost:${PORT}`);
});
