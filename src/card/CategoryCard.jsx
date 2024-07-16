import { Button, Card } from "react-bootstrap"

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CategoryCard = ({ image, name, id, editCategory, deleteCategory }) => {
  return (
    <Card >
      <Card.Img height={200} className="object-fit-cover" variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <Link to={`category/${id}/products`} className="btn btn-primary" >More... </Link>
          <Button variant="warning" onClick={() => editCategory(id)}>Edit</Button>
          <Button variant="danger" onClick={() => deleteCategory(id)}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
CategoryCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  editCategory: PropTypes.func,
  deleteCategory:PropTypes.func,

}
export default CategoryCard