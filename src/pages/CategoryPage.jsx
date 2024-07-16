import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import CategoryCard from "../card/CategoryCard";
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useEffect, useState } from "react";
import request from "../server";
import Loading from "../components/loading/Loading";
import { useForm } from "react-hook-form";
import categorySchema from './../schemas/CategorySchema';
import ReactPaginate from "react-paginate";
import { LIMIT } from "../constants";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(categorySchema),
  });

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          name: search,
          page: activePage,
          limit: LIMIT,
        };
        const { data } = await request.get('category', { params });
        const { data: totalData } = await request.get('category', { params: { name: search } });
        setCategories(data);
        setTotal(totalData.length);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, [search, activePage]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setActivePage(1);
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

  const handlePageClick = ({ selected }) => {
    setActivePage(selected + 1);
  }
  let pages = Math.ceil(total / LIMIT);

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
      {pages !== 1
        ?
        (
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pages}
            previousLabel="<previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        )
        :
        (
          null
        )
      }

    </div>
  );
};

export default CategoryPage;
