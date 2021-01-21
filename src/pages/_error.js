import PropTypes from 'prop-types';

const CustomError = ({statusCode}) => {
  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </p>
  );
};

CustomError.getInitialProps = ({res, err}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  console.log(typeof statusCode);
  return {statusCode};
};

CustomError.propTypes = {
  statusCode: PropTypes.number,
};

export default CustomError;
