const pool = require('./db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('DB time is:', res.rows[0]);
  } catch (err) {
    console.error('DB test error:', err);
  } finally {
    process.exit();
  }
})();
