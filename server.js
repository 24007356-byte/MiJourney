'use strict';

const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));

let databasePool;
function getDatabasePool() {
  if (!databasePool) databasePool = createDatabasePool();
  return databasePool;
}

function validExercise(item) {
  return item && typeof item.nombre === 'string' &&
    item.nombre.trim().length > 0 && Array.from(item.nombre.trim()).length <= 80 &&
    Number.isInteger(item.series) && item.series >= 1 && item.series <= 1000 &&
    Number.isInteger(item.repeticiones) && item.repeticiones >= 1 && item.repeticiones <= 10000 &&
    Number.isFinite(item.peso) && item.peso >= 0 && item.peso <= 10000 &&
    Math.abs(item.peso * 100 - Math.round(item.peso * 100)) < 0.000001;
}

function serializeExercise(row) {
  return { ...row, peso: Number(row.peso) };
}

app.get('/api/ejercicios', async (req, res) => {
  const [rows] = await getDatabasePool().execute(
    'SELECT id, nombre, series, repeticiones, peso FROM ejercicios ORDER BY id DESC'
  );
  res.set('Cache-Control', 'no-store').json(rows.map(serializeExercise));
});

app.post('/api/ejercicios', async (req, res) => {
  if (!validExercise(req.body)) {
    return res.status(400).json({ error: 'Revisa el nombre, las series, las repeticiones y el peso del ejercicio.' });
  }
  const { nombre, series, repeticiones, peso } = req.body;
  const [result] = await getDatabasePool().execute(
    'INSERT INTO ejercicios (nombre, series, repeticiones, peso) VALUES (?, ?, ?, ?)',
    [nombre.trim(), series, repeticiones, peso]
  );
  res.status(201).json({ id: result.insertId, nombre: nombre.trim(), series, repeticiones, peso });
});

app.delete('/api/ejercicios/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!/^[1-9]\d*$/.test(req.params.id) || !Number.isSafeInteger(id) || id > 2147483647) {
    return res.status(400).json({ error: 'El identificador del ejercicio no es válido.' });
  }
  const [result] = await getDatabasePool().execute('DELETE FROM ejercicios WHERE id = ?', [id]);
  if (!result.affectedRows) {
    return res.status(404).json({ error: 'El ejercicio ya no existe. Actualiza la página para consultar los registros.' });
  }
  res.status(204).end();
});

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'La ruta solicitada no existe.' });
});
app.use(express.static(path.join(__dirname, 'dist')));

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.type === 'entity.parse.failed' || error.type === 'entity.too.large') {
    return res.status(400).json({ error: 'La solicitud no contiene datos válidos.' });
  }
  // No publicar errores SQL, parámetros de conexión ni credenciales.
  res.status(503).json({ error: 'No se pudo completar la operación. Comprueba que el servidor y MySQL estén disponibles e inténtalo de nuevo.' });
});

function readPort(value, name) {
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`${name} debe ser un puerto válido entre 1 y 65535.`);
  }
  return port;
}

function createDatabasePool() {
  const required = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Completa estas variables en .env: ${missing.join(', ')}.`);
  }
  return mysql.createPool({
    host: process.env.DB_HOST,
    port: readPort(process.env.DB_PORT, 'DB_PORT'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 20,
    connectTimeout: 5000,
  });
}

async function checkDatabase() {
  const pool = createDatabasePool();
  try {
    await pool.query('SELECT 1');
    // Comprueba el acceso a la tabla sin leer ni modificar registros.
    await pool.query('SELECT id, nombre, series, repeticiones, peso FROM ejercicios LIMIT 0');
    console.log('Conexión con MySQL y acceso a ejercicios comprobados correctamente.');
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  if (process.argv.includes('--check-db')) {
    checkDatabase().catch((error) => {
      // Evita imprimir objetos de conexión que puedan contener credenciales.
      console.error(error.code
        ? `No se pudo comprobar MySQL (${error.code}). Revisa las variables y el servicio.`
        : error.message);
      process.exitCode = 1;
    });
  } else {
    try {
      const port = readPort(process.env.PORT || '3000', 'PORT');
      const server = app.listen(port, '127.0.0.1', () => {
        console.log(`MiJourney disponible en http://127.0.0.1:${port}`);
        console.log('Para comprobar MySQL ejecuta: npm run check-db');
      });
      server.on('error', (error) => {
        console.error(`No se pudo iniciar Express (${error.code}).`);
        process.exitCode = 1;
      });
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  }
}

async function closeDatabasePool() {
  if (databasePool) {
    await databasePool.end();
    databasePool = undefined;
  }
}

module.exports = { app, createDatabasePool, checkDatabase, closeDatabasePool };
