import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'my_wallet',
  password: 'bn;h5x4e}E/Mn(>_',
});

export default connection;
