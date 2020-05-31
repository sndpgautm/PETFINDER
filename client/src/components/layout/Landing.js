import React from 'react';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Pet Finder</h1>
          <p className='lead'>
            Search and adopt pets near you, help the animal rescue shelters near
            your area
          </p>
          <p className='info'>
            *Organizations/Rescue Shelters can add profiles for their animals by
            signing up
          </p>
          <div className='buttons'>
            <a href='animals.html' className='btn btn-success'>
              Browse Pets
            </a>
            <a href='register.html' className='btn btn-primary'>
              Sign Up
            </a>
            <a href='login.html' className='btn btn'>
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
