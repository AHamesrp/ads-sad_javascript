const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Silva7hames@db.jaxxvyrkqswslusvrvqgm.supabase.co:5432/postgres',
    ssl: {
        rejectUnauthorized: false
    }
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('✅ Conexão bem sucedida!');
        const result = await client.query('SELECT NOW()');
        console.log('⏰ Hora do servidor:', result.rows[0].now);
        client.release();
        process.exit(0);
    } catch (error) {
        console.error('❌ Erro detalhado:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    }
}

testConnection();