import ProductList from "@/components/ProductList"

type Product = {
  id: number
  name: string
  price: number
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products")
  return res.json()
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">商品一覧ページ</h1>
      <ProductList products={products} />
    </div>
  )

}