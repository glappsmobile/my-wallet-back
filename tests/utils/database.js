import connection from '../../src/database.js';

export async function clearDatabase() {
  await connection.query('DELETE FROM "users"');
}

export async function closeConnection() {
  await connection.end();
}
