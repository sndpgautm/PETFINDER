import {
  GET_ANIMALS,
  ANIMAL_ERROR,
  GET_ANIMAL,
  CLEAR_ANIMAL,
  DELETE_ANIMAL,
  ADD_ANIMAL,
} from '../actions/types';

const initialState = {
  animals: [],
  animal: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ANIMALS:
      return {
        ...state,
        animals: payload,
        loading: false,
      };
    case GET_ANIMAL:
      return {
        ...state,
        animal: payload,
        loading: false,
      };
    case ADD_ANIMAL:
      return {
        ...state,
        animals: [...state.animals, payload],
        loading: false,
      };
    case DELETE_ANIMAL:
      return {
        ...state,
        animals: state.animals.filter((animal) => animal._id !== payload),
        loading: false,
      };
    case ANIMAL_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_ANIMAL:
      return {
        ...state,
        animal: null,
        loading: false,
      };
    default:
      return state;
  }
}
