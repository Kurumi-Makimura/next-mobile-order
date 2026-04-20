"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function ThanksPage() {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-2xl font-bold">ご注文ありがとうございました！</h1>
            <p>注文が正常に完了しました。</p>

            <Button onClick={() => router.push("/")}>
                トップに戻る
            </Button>
        </div>
    )
}