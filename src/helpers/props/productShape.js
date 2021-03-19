import PropTypes from 'prop-types';

const productShape = PropTypes.shape({
  krogerId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  aisleNumber: PropTypes.number.isRequired,
  aisleSide: PropTypes.string.isRequired,
  aisleBay: PropTypes.string.isRequired,
  pickedUp: PropTypes.bool.isRequired,
});

export default productShape;
