import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const EditOrgInfoForm = () => {
  return (
    <Fragment>
      <Link to='/dashboard' className='btn btn-light my-1'>
        Go Back
      </Link>
      <h1 className='text-primary my-1'>
        This feature is not available at the moment.
      </h1>
    </Fragment>
  );
};

export default EditOrgInfoForm;
