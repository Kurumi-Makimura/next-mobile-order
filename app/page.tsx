export default function Home() {
  const products = [
    { id: 1, name: "コーヒー", price: 300 },
    { id: 2, name: "カフェラテ", price: 400 },
    { id: 3, name: "サンドイッチ", price: 500 },
  ]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">商品一覧ページ</h1>

      {products.map((product) => (
        <div key={product.id} className="border p-2 mb-2 ">
          <p>{product.name}</p>
          <p>{product.price}円</p>
        </div>
      ))}
    </div>
  )

}