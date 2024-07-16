import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import CategoryCard from "../card/CategoryCard";
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useEffect, useState } from "react";
import request from "../server";
import Loading from "../components/loading/Loading";
import { useForm } from "react-hook-form";
import categorySchema from './../schemas/CategorySchema';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(categorySchema),
  });

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = search ? { name: search } : {};
        const { data } = await request.get('category', { params });
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
  const handleShow = () => {
    setShow(true);
    reset({ name: "", image: "" });
    setSelected(null);
  };

  const [show, setShow] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (selected === null) {
        const res = await request.post('category', data);
        setCategories([...categories, res.data]);
      } else {
        const res = await request.put(`category/${selected}`, data);
        setCategories((prev) => prev.map((cat) => (cat.id === selected ? res.data : cat)));
      }
      handleClose();
      reset();
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (id) => {
    try {
      setSelected(id);
      setShow(true);
      const { data } = await request.get(`category/${id}`);
      reset(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const isDelete = window.confirm("Do you want delete this category?");
      if (isDelete) {
        await request.delete(`category/${id}`);
        setCategories(categories.filter((category) => category.id !== id));
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <div className="container">
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
            {categories.length !== 0 ? (
              categories.map((category) => (
                <Col className="mb-4" key={category.id}>
                  <CategoryCard editCategory={editCategory} deleteCategory={deleteCategory} {...category} />
                </Col>
              ))
            ) : (
              <h2 className="text-center">Not found</h2>
            )}
          </Row>
        )}

        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
                <p className="text-danger">{errors.name?.message}</p>
              </Form.Group>

              <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  {...register("image")}
                  type="text"
                />
                <p className="text-danger">{errors.image?.message}</p>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                {selected === null ? "Add" : "Save"} category
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Fragment>
    </div>
  );
};

export default CategoryPage;
