import { openDb } from "./db";

export async function initDb() {
    const db = await openDb()

    await db.exec(`
        CREATE TABLE IF NOT EXISTS products(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price INTEGER
        )
        `)

    const row = await db.get("SELECT COUNT(*) as count FROM products")

    if (row.count === 0) {
        await db.run(`INSERT INTO products (name, price) VALUES (?, ?)`, ["コーヒー", 300])
        await db.run(`INSERT INTO products (name, price) VALUES (?, ?)`, ["カフェラテ", 400])
        await db.run(`INSERT INTO products (name, price) VALUES (?, ?)`, ["サンドイッチ", 600])
    }

}