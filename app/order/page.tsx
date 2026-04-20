"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
}

export default function OrderPage() {
    const router = useRouter()
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem("cart")
            return data ? JSON.parse(data) : []
        }
        return []
    })

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const handleOrder = async () => {
        await fetch("/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cart })
        })

        alert("注文しました")
        localStorage.removeItem("cart")
        setCart([])
        router.push("/thanks")

    }

    return (
        <div className="p-6 space-y-6">


            <div className="bg-yellow-50 border-2 border-dashed p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2">注文内容</h2>

                {cart.map(item => (
                    <div key={item.id} className="flex justify-between border-b py-1">
                        <span>{item.name} ×{item.quantity}</span>
                        <span>{item.price * item.quantity}円</span>
                    </div>
                ))}

                <div className="flex justify-between mt-4 font-bold text-lg">
                    <span>合計</span>
                    <span>{total}円</span>
                </div>
            </div>


            <div className="border p-4 rounded-xl shadow">
                <Button
                    className="w-full text-lg py-4"
                    onClick={handleOrder}
                >
                    注文する
                </Button>
            </div>

        </div>
    )
}