import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteAnimal } from '../../actions/animal';

const AnimalItem = ({
  deleteAnimal,
  auth,
  animal: { _id, organization, name, species, breed, age, image },
}) => (
  <div className='animal bg-light'>
    <img
      className='round-img'
      src={process.env.PUBLIC_URL + '/uploads/' + image}
      alt=''
    />
    <div>
      <h2>{name}</h2>
      <p>
        <strong>Species: </strong>
        {species}
      </p>
      <p>
        <strong>Breed: </strong>
        {breed}
      </p>
      <p>
        <strong>Age: </strong>
        {age}
      </p>
      <Link to={`/animal/${_id}`} className='btn btn-primary'>
        View Profile
      </Link>
      {
        //If isAuthenticated is true then only show delete button
        auth.isAuthenticated && (
          <div className='del-icon'>
            <button
              onClick={(e) => deleteAnimal(_id)}
              className='btn btn-danger'
            >
              <i className='fas fa-trash-alt'></i> Delete
            </button>
          </div>
        )
      }
    </div>
  </div>
);

AnimalItem.propTypes = {
  animal: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAnimal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteAnimal })(AnimalItem);
