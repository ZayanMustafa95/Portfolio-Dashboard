const ProductCard = ({ product }) => {
  return (
    <li key={product.id} className="p-4 border rounded shadow w-[31%]">
      <h3 className="font-bold text-3xl">{product.title}</h3>
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-30 object-contain bg-white border border-black my-3"
      />
      <p>
        <span className="font-bold">Product Description:</span>{" "}
        {product.description}
      </p>
      <p className="text-lg font-bold">
        Category:{" "}
        <span className="text-[16px] font-medium text-amber-300">
          {product.category}
        </span>
      </p>
      <p className="font-bold">Just in ${product.price}</p>
      <p>⭐ {product.rating}</p>
      <p className="italic">{product.brand}</p>
    </li>
  );
};

export default ProductCard;
