import PropTypes from 'prop-types';

const profileShape = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  profileImg: PropTypes.string.isRequired,
  currentStore: PropTypes.number.isRequired,
});

export default profileShape;
