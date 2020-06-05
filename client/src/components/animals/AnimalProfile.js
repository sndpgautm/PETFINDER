import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAnimal } from '../../actions/animal';
import Spinner from '../layout/Spinner';

const AnimalProfile = ({ getAnimal, animal: { animal, loading }, match }) => {
  useEffect(() => {
    getAnimal(match.params.id);
  }, [getAnimal, match.params.id]);
  return (
    <Fragment>
      {animal === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/animals' className='btn btn-light'>
            Back To Profiles
          </Link>
          <div className='animal-grid my-1'>
            <div className='animal-top bg-primary p-2'>
              <img
                className='round-img my-1'
                src={process.env.PUBLIC_URL + '/build/uploads/' + animal.image}
                alt=''
              />
              <h1 className='large'>{animal.name}</h1>
              <p className='lead'>
                <i className='fas fa-location-arrow'></i>{' '}
                {animal.organizationInfo.name}
              </p>
            </div>
            <div className='animal-about bg-light p-2'>
              <h2 className='text-primary'>{animal.name}'s Bio</h2>
              <p>{animal.description}</p>
              <div className='line'></div>
              <h2 className='text-primary'>Location</h2>
              <p>{animal.organizationInfo.name}</p>
              <p>{animal.organizationInfo.streetAddress}</p>
            </div>
            <div className='animal-details bg-white p-2'>
              <h2 className='text-primary'>About Me</h2>
              <div>
                <p>
                  <strong>Species: </strong>
                  {animal.species}
                </p>
                <p>
                  <strong>Breed: </strong>
                  {animal.breed}
                </p>
                <p>
                  <strong>Age: </strong>
                  {animal.age}
                </p>
                <p>
                  <strong>Gender: </strong>
                  {animal.gender}
                </p>
                <p>
                  <strong>Size: </strong>
                  {animal.size}
                </p>
                <p>
                  <strong>Color: </strong>
                  {animal.color}
                </p>
                <p>
                  <strong>Status: </strong>
                  {animal.status}
                </p>
              </div>
            </div>
            <div className='animal-contact-details bg-white p-2'>
              <h2 className='text-primary'>Contact Us</h2>
              <div>
                <h3>{animal.organizationInfo.name}</h3>
                <p>
                  <i className='fas fa-phone-square'></i>{' '}
                  {animal.organizationInfo.phone}
                </p>
                <p>
                  <i className='fas fa-envelope-square'></i>{' '}
                  {animal.organizationInfo.email}
                </p>
                <p>
                  <i className='fas fa-map-marker'></i>{' '}
                  {animal.organizationInfo.streetAddress}
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

AnimalProfile.propTypes = {
  getAnimal: PropTypes.func.isRequired,
  animal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  animal: state.animal,
});

export default connect(mapStateToProps, { getAnimal })(AnimalProfile);
