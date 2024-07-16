import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import CategoryCard from "../card/CategoryCard";
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useEffect, useState } from "react";
import request from "../server";
import Loading from "../components/loading/Loading";
import { useForm } from "react-hook-form";
import categorySchema from './../schemas/CategorySchema';

const CategoryPage = () => {
  let [categories, setCategories] = useState([]);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let [search, setSearch] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        let params = { search };
        let { data } = await request.get('category', { params });
        setCategories(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let res = await request.post(`category`, data);
      setCategories([...categories, res.data]);
      handleClose();
      reset();
    } catch (err) {
      console.log(err);
      setError(err)
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      {error ? (
        <div
          style={{ fontWeight: "bold", fontSize: "25px", color: "red" }}
          className="alert alert-danger text-center mt-5"
        >
          Error: {error.message}
        </div>
      ) : (
        <Fragment>
          <InputGroup className="my-3">
            <Form.Control
              value={search}
              onChange={handleSearch}
              placeholder="Searching category..."
            />
            <Button variant="outline-secondary" onClick={handleShow}>Add category</Button>
          </InputGroup>

          {loading ? (
            <Loading />
          ) : (
            <Row xs={1} sm={2} md={3} lg={4}>
              {categories.map((category) => (
                <Col className="mb-4" key={category.id}>
                  <CategoryCard {...category} />
                </Col>
              ))}
            </Row>
          )
          }


          <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit(onSubmit)} >

              <Modal.Header closeButton>
                <Modal.Title>Category data</Modal.Title>
              </Modal.Header>
              <Modal.Body>


                <Form.Group className="mb-4">
                  <Form.Label>Category name</Form.Label>
                  <Form.Control
                    {...register("name")}
                    type="text"
                  />
                  <p className="text-danger" >{errors.name?.message}</p>
                </Form.Group>

                <Form.Group >
                  <Form.Label>Image url</Form.Label>
                  <Form.Control
                    {...register("image")}
                    type="text"
                  />
                  <p className="text-danger" >{errors.image?.message}</p>
                </Form.Group>


              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit" >
                  Add category
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Fragment>
      )}
    </div>
  );
};

export default CategoryPage;
