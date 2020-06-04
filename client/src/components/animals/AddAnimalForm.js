import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAnimal } from '../../actions/animal';
import { Link, withRouter } from 'react-router-dom';

const AddAnimalForm = ({ addAnimal, history }) => {
  const [formData, setFormData] = useState({
    species: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    color: '',
    name: '',
    description: '',
  });

  const [image, setImage] = useState('');

  const {
    species,
    breed,
    age,
    gender,
    size,
    color,
    name,
    description,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const setFile = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addAnimal({
      species,
      breed,
      age,
      gender,
      size,
      color,
      name,
      description,
      image,
      history,
    });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Pet</h1>
      <p className='lead'>
        <i className='fas fa-dog'></i> Add a profile for the pet
      </p>
      <small>* = required fields</small>
      <form
        className='form'
        encType='multipart/form-data'
        onSubmit={(e) => onSubmit(e)}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Species'
            name='species'
            value={species}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Breed'
            name='breed'
            value={breed}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Age'
            name='age'
            value={age}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Gender'
            name='gender'
            value={gender}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Size'
            name='size'
            value={size}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Color'
            name='color'
            value={color}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <textarea
            cols='30'
            rows='5'
            placeholder='* Description'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>
        <div className='form-group'>
          <input
            type='file'
            name='image'
            onChange={(e) => setFile(e)}
            required
          />
          <small className='form-text'> * Upload a picture of the pet</small>
        </div>
        <input
          type='submit'
          value='Add Profile'
          className='btn btn-primary my-1 '
        />
        <Link to='/dashboard' className='btn btn-light my-1'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddAnimalForm.propTypes = {
  addAnimal: PropTypes.func.isRequired,
};

export default connect(null, { addAnimal })(withRouter(AddAnimalForm));
