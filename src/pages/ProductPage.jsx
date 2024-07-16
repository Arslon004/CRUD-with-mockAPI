import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import request from '../server';
import { Row, Col } from 'react-bootstrap';
import Loading from '../components/loading/Loading';
import ProductCardPage from '../card/ProductCardPage';

const ProductPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await request.get(`category/${categoryId}/product`);
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="container">
      {loading ? (
       <Loading/>
      ) : error ? (
        <p>Error loading products</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4}>
          {products.length !== 0 ? (
            products.map((product) => (
              <Col className="mb-4" key={product.id}>
                 <ProductCardPage {...product}/>
              </Col>
            ))
          ) : (
            <h2 className="text-center">No products found</h2>
          )}
        </Row>
      )}
      <Link className='btn btn-secondary' to={`/`}>Back to home</Link>
    </div>
  );
};

export default ProductPage;
