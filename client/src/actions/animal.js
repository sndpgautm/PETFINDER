import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_ANIMALS,
  ANIMAL_ERROR,
  GET_ANIMAL,
  CLEAR_ANIMAL,
  DELETE_ANIMAL,
  ADD_ANIMAL,
} from './types';

// Get all animals
export const getAnimals = (isAuthenticated) => async (dispatch) => {
  try {
    // if isAuthenticated is false the request if made to public route api/animals
    const link = isAuthenticated
      ? '/api/animals/byOrganization'
      : '/api/animals';
    const res = await axios.get(link);
    console.log(res.data);

    dispatch({
      type: GET_ANIMALS,
      payload: res.data,
    });

    dispatch({
      type: CLEAR_ANIMAL,
    });
  } catch (err) {
    dispatch({
      type: ANIMAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Animal by id
export const getAnimal = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/animals/${id}`);

    dispatch({
      type: GET_ANIMAL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ANIMAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Animal
export const deleteAnimal = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/animals/${id}`);

    dispatch({
      type: DELETE_ANIMAL,
      payload: id,
    });

    dispatch(setAlert('Animal Profile Removed', 'success'));
  } catch (err) {
    dispatch({
      type: ANIMAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Animal
export const addAnimal = ({
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
  edit = false,
}) => async (dispatch) => {
  const config = {
    headers: {
      ...axios.defaults.headers,
    },
  };

  const formData = new FormData();
  formData.append('species', species);
  formData.append('breed', breed);
  formData.append('age', age);
  formData.append('gender', gender);
  formData.append('size', size);
  formData.append('color', color);
  formData.append('name', name);
  formData.append('description', description);
  formData.append('image', image);

  try {
    const res = await axios.post('/api/animals', formData, config);

    dispatch({
      type: ADD_ANIMAL,
      payload: res.data,
    });

    dispatch(setAlert('Animal Profile Created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ANIMAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
