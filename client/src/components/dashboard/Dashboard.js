import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import AnimalItem from '../animals/AnimalItem';
import { connect } from 'react-redux';
import { getAnimals } from '../../actions/animal';

const Dashboard = ({
  getAnimals,
  auth: { isAuthenticated, organization },
  animal: { animals, loading },
}) => {
  useEffect(() => {
    getAnimals(isAuthenticated);
  }, [getAnimals, isAuthenticated]);

  return (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome{' '}
        {organization && organization.name}
      </p>
      <div className='dash-buttons'>
        <Link to='/create-animal-profile' className='btn'>
          <i className='fas fa-plus-square text-primary'></i> Add a Pet Profile
        </Link>
        <Link to='/edit-org-info' className='btn'>
          <i className='fas fa-user-circle text-primary'></i> Edit Contact
          Information
        </Link>
      </div>
      {animals.length > 0 ? (
        <Fragment>
          {' '}
          <h2 className='my-2 text-primary'> My Animals</h2>
          <div className='animals'>
            {animals.map((animal) => (
              <AnimalItem key={animal._id} animal={animal} />
            ))}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p className=' my-2 info'>
            You have not yet added a animal profile, please add some to
            continue...
          </p>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getAnimals: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  animal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  animal: state.animal,
});

export default connect(mapStateToProps, { getAnimals })(Dashboard);
