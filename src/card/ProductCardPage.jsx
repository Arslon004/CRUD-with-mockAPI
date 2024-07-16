
import PropTypes from "prop-types";
import { Card, ListGroup } from "react-bootstrap";
const ProductCardPage = ({ name, image, price, discount, description, id, editProduct, deleteProduct }) => {
  return (
    <div className="pt-3">
      <Card >
        <Card.Img src={image} height={300} className="object-fit-cover" />
        <Card.Body>
          <Card.Title style={{ fontWeight: "700", color: "brown", fontSize: "25px" }}>{name}</Card.Title>
          <Card.Text className="product_desc" style={{ fontSize: "18px", fontWeight: "400" }}>
            {description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item style={{ color: "blue", fontWeight: "600", fontSize: "18px" }}>Price: <span style={{ color: "brown", fontWeight: "800", fontSize: "20px" }}>{price}$</span> | Discount:-<span style={{ color: "brown", fontWeight: "800", fontSize: "20px" }}>{discount}$</span> </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <button className="btn btn-primary me-3" onClick={() => editProduct(id)}>Edit</button>
          <button className="btn btn-danger" onClick={() => deleteProduct(id)}>Delete</button>
        </Card.Body>
      </Card>
    </div>
  )
}

ProductCardPage.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
  discount: PropTypes.number,
  description: PropTypes.string,
  id: PropTypes.string,
  editProduct: PropTypes.func,
  deleteProduct: PropTypes.func,
}
export default ProductCardPage