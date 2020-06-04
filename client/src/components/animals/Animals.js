import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import AnimalItem from './AnimalItem';
import { getAnimals } from '../../actions/animal';

const Animals = ({
  getAnimals,
  auth: { isAuthenticated },
  animal: { animals, loading },
}) => {
  useEffect(() => {
    getAnimals(isAuthenticated);
  }, [getAnimals, isAuthenticated]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Pets</h1>
      <p className='lead'>
        <i className='fas fa-dog'></i> Search and adopt pets near you
      </p>
      <div className='animals'>
        {animals.map((animal) => (
          <AnimalItem key={animal._id} animal={animal} />
        ))}
      </div>
    </Fragment>
  );
};

Animals.propTypes = {
  getAnimals: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  animal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  animal: state.animal,
});

export default connect(mapStateToProps, { getAnimals })(Animals);
