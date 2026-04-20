"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"



type Product = {
    id: number
    name: string
    price: number
}

type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
}

export default function ProductList({ products }: { products: Product[] }) {
    const router = useRouter()

    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {
        const data = localStorage.getItem("cart")
        if (data) {
            setCart(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id)

            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            } else {
                return [...prev, { ...product, quantity: 1 }]
            }
        })

    }

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.map((item) =>
            item.id == id
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
            .filter((item) => item.quantity > 0)
        )
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    return (
        <div>
            {products.map((product) => (
                <Card key={product.id} className="mb-4">
                    <CardContent>
                        <p>{product.name}</p>
                        <p>{product.price}円</p>

                        <Button onClick={() => addToCart(product)}>
                            カートに追加
                        </Button>
                    </CardContent>
                </Card>
            ))}

            <h2 className="text-xl font-bold mt-6 mb-2">カート</h2>
            {cart.length === 0 ? (
                <p>カートは空です</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className="border p-2 mb-2">
                            <p>{item.name}×{item.quantity}</p>
                            <p>{item.price * item.quantity}円</p>

                            <Button
                                variant="destructive"
                                onClick={() => removeFromCart(item.id)}
                            >
                                削除
                            </Button>
                        </div>
                    ))}

                    <p className="font-bold mt-2">
                        合計:{total}円
                    </p>
                    <Button
                        disabled={cart.length === 0}
                        onClick={() => router.push("/order")}
                        className="mt-2"
                    >
                        注文へ進む
                    </Button>
                </>
            )
            }
        </div>
    )
}
