import { Button, Card } from "react-bootstrap"

import PropTypes from "prop-types";

const CategoryCard = ({image,name,id}) => {
  return (
    <Card >
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}
CategoryCard.propTypes={
  image:PropTypes.string,
  name:PropTypes.string,
  id:PropTypes.string,
}
export default CategoryCard