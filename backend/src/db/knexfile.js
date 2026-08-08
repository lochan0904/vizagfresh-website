require('dotenv').config();

const connection = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false }
  : {
      host: process.env.PGHOST || 'localhost',
      port: Number(process.env.PGPORT) || 5432,
      user: process.env.PGUSER || 'vizagfresh',
      password: process.env.PGPASSWORD || 'vizagfresh',
      database: process.env.PGDATABASE || 'vizagfresh',
    };

module.exports = {
  client: 'pg',
  connection,
  migrations: { directory: `${__dirname}/migrations`, tableName: 'knex_migrations' },
  seeds: { directory: `${__dirname}/seeds` },
  pool: { min: 0, max: 10 },
};
