import PropTypes from 'prop-types';

const locationShape = PropTypes.shape({
  krogerId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipCode: PropTypes.number.isRequired,
});

export default locationShape;
