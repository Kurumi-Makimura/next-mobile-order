import { openDb } from "@/lib/db";
import { initDb } from "@/lib/initDb";

export async function GET() {
    await initDb()

    const db = await openDb()
    const products = await db.all("SELECT * FROM products")

    return Response.json(products)

}