import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

export const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role VARCHAR(80) DEFAULT 'contributor',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS issues (
                id SERIAL PRIMARY KEY,
                title VARCHAR(150) NOT NULL,
                description TEXT NOT NULL,
                type VARCHAR(50) NOT NULL CONSTRAINT chk_issues_type_unique CHECK (type IN ('bug', 'feature_request')),
                status VARCHAR(50) DEFAULT 'open' NOT NULL CONSTRAINT chk_issues_status_unique CHECK (status IN ('open', 'in_progress', 'resolved')),
                reporter_id INT NOT NULL, 
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `) 
        console.log('Database initialized successfully')
    }
    catch (err) {
        console.error('Error initializing database:', err)
    }
}
initDB()