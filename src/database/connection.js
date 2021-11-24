import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'my_wallet',
  password: 'senha_super_hiper_ultra_secreta_do_role_do_bootcamp',
});

export default connection;
