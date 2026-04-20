import { NextResponse } from "next/server"
import sqlite3 from "sqlite3"
import { open } from "sqlite"

export async function POST(req: Request) {
    const db = await open({
        filename: "./db.sqlite",
        driver: sqlite3.Database
    })

    await db.exec(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at TEXT
        );

        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER,
            name TEXT,
            price INTEGER,
            quantity INTEGER
        );
    `)

    const { cart } = await req.json()

    const result = await db.run(
        "INSERT INTO orders (created_at) VALUES (datetime('now'))"
    )

    const orderId = result.lastID

    for (const item of cart) {
        await db.run(
            `INSERT INTO order_items (order_id, name, price, quantity)
             VALUES (?, ?, ?, ?)`,
            [orderId, item.name, item.price, item.quantity]
        )
    }

    return NextResponse.json({ success: true })
}

export async function GET() {
    const db = await open({
        filename: "./db.sqlite",
        driver: sqlite3.Database
    })

    const orders = await db.all(`
        SELECT * FROM orders
    `)

    return NextResponse.json(orders)
}