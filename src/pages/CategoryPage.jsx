import { Button, Col, Form, InputGroup, Row } from "react-bootstrap"
import CategoryCard from "../card/CategoryCard"

const CategoryPage = () => {
  return (
    <div className="container">

      <InputGroup className="my-3">
        <Form.Control
          placeholder="Searching category..." />
        <Button variant="outline-secondary" >Add category</Button>
      </InputGroup>

      <Row xs={1} sm={2} md={3} lg={4}>
        <Col>
          <CategoryCard />
        </Col>
      </Row>

    </div>
  )
}

export default CategoryPage