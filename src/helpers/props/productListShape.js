import PropTypes from 'prop-types';

const productListShape = PropTypes.shape({
  productId: PropTypes.number.isRequired,
  shopperId: PropTypes.number.isRequired,
  locationId: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
});

export default productListShape;
