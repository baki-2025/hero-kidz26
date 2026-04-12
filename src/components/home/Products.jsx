import { getProducts } from '@/actions/server/product';
import ProductCard from '../cards/ProductCard';

const Products = async () => {
    const products = await getProducts();

    return (
        <div>
            <h2 className='text-center text-4xl font-bold mb-10'>Our Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {products.map((product) => (
                    <ProductCard key={product._id?.toString() || product.title} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;