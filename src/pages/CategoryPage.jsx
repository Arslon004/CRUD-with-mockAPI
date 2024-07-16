import { Button, Col, Form, InputGroup, Row } from "react-bootstrap"
import CategoryCard from "../card/CategoryCard"
import { useEffect, useState } from "react"
import request from "../server";
import Loading from "../components/loading/Loading";

const CategoryPage = () => {
  let [categories, setCategories] = useState([]);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let [search, setSearch] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        let params={search}
        let { data } = await request.get('category',{params});
        setCategories(data);
      }
      catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getCategory()
  }, [search])

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }
  return (
    <div className="container">

      <InputGroup className="my-3">
        <Form.Control
          value={search}
          onChange={handleSearch}
          placeholder="Searching category..." />
        <Button variant="outline-secondary" >Add category</Button>
      </InputGroup>

      {
        loading
          ?
          <Loading />
          :
          (<Row xs={1} sm={2} md={3} lg={4}>
            {categories.map((category) => (
              <Col key={category.id}>
                <CategoryCard {...category} />
              </Col>
            ))
            }
          </Row>)
      }
    </div>
  )
}

export default CategoryPage