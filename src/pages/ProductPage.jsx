import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import request from '../server';
import { Row, Col, InputGroup, Form, Button, Modal } from 'react-bootstrap';
import Loading from '../components/loading/Loading';
import ProductCardPage from '../card/ProductCardPage';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import productSchema from './../schemas/ProductSchema';

const ProductPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected,setSelected]=useState(null);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');


  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    reset();
    setSelected(null);
  };

  const { register, handleSubmit,formState:{ errors }, reset  } = useForm({
    resolver: yupResolver(productSchema)
  });



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params={
          name:search
        }
        setLoading(true);
        const { data } = await request.get(`category/${categoryId}/product`,{params});
        setProducts(data);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId,search]);

  const onSubmit =async data => {
    try{
      if(selected===null){
        let res=await request.post(`category/${categoryId}/product`,data);
        setProducts([...products,res.data]);
      }else {
        let res=await request.put(`category/${categoryId}/product/${selected}`,data);
        setProducts((prev)=>(prev.map((cat)=>cat.id === selected ? res.data : cat)))
      }
      handleClose();
    }catch(err){
      console.log(err);
    }
  };


  const editProduct=async(id)=>{
    try{
      setSelected(id);
    setShow(true)
    let {data}=await request.get(`category/${categoryId}/product/${id}`);
    console.log(data);
    reset(data);
    }catch(err){
      console.log(err);
    }
  }

  const deleteProduct=async(id)=>{
    try {
      const isDelete = window.confirm("Do you want delete this category?");
      if (isDelete) {
        await request.delete(`category/${categoryId}/product/${id}`);
        setProducts(products.filter((product) => product.id !== id));
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  const handleSearch=(e)=>{
    setSearch(e.target.value)
  }
  return (
    <div className="container">

      <InputGroup className="my-3">
        <Form.Control
         value={search}
         onChange={handleSearch}
          placeholder="Searching product..."
        />
        <Button onClick={handleShow} variant="outline-secondary" >
          Add product
        </Button>
      </InputGroup>


      {loading ? (
        <Loading />
      ) : error ? (
        <p>Error loading products</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4}>
          {products.length !== 0 ? (
            products.map((product) => (
              <Col className="mb-4" key={product.id}>
                <ProductCardPage editProduct={editProduct} deleteProduct={deleteProduct}{...product} />
              </Col>
            ))
          ) : (
            <h2 className="text-center">No products found</h2>
          )}
        </Row>
      )}
      <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Modal.Header closeButton>
          <Modal.Title>Product data</Modal.Title>
        </Modal.Header>
        <Modal.Body>


            <Form.Group >
              <Form.Label>Product url</Form.Label>
              <Form.Control
              {...register("image")}
                type="text"
              />
              <p className='text-danger'>{errors.image?.message}</p>
            </Form.Group>

            <Form.Group >
              <Form.Label>Product name</Form.Label>
              <Form.Control
              {...register("name")}
                type="text"
              />
              <p className='text-danger'>{errors.name?.message}</p>
            </Form.Group>

            <Form.Group >
              <Form.Label>Product description</Form.Label>
              <Form.Control
              {...register("description")}
                type="text"
              />
              <p className='text-danger'>{errors.description?.message}</p>
            </Form.Group>

            <Form.Group >
              <Form.Label>Product price</Form.Label>
              <Form.Control
              {...register("price")}
                type="number"
              />
              <p className='text-danger'>{errors.price?.message}</p>
            </Form.Group>

            <Form.Group >
              <Form.Label>Product discount</Form.Label>
              <Form.Control
              {...register("discount")}
                type="text"
              />
              <p className='text-danger'>{errors.discount?.message}</p>
            </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant="primary" >
            {selected===null ? "Add" : "Save"} product
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>

      <Link className='btn btn-secondary' to={`/`}>Back to home</Link>

    </div>
  );
};

export default ProductPage;
