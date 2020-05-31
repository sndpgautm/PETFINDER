const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Organization = require('../../models/Organization');

// @route    POST api/organizations
// @desc     Register an organization
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('streetAddress', 'Street Address is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),
    check('postCode', 'Post Code is required').not().isEmpty(),
    check('country', 'Country is required').not().isEmpty(),
  ],
  async (req, res) => {
    // Check errors using express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      phone,
      streetAddress,
      city,
      state,
      postCode,
      country,
    } = req.body;

    try {
      // See if organization exists
      let organization = await Organization.findOne({ email });

      if (organization) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      organization = new Organization({
        name,
        email,
        password,
        phone,
        streetAddress,
        city,
        state,
        postCode,
        country,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      organization.password = await bcrypt.hash(password, salt);

      await organization.save();

      // Return jsonwebtoken
      const payload = {
        organization: {
          id: organization.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/organizations/:id
// @desc     Update current organization info
// @access   Protected

router.post(
  '/:id',
  [
    check('phone', 'Phone number is required').not().isEmpty(),
    check('streetAddress', 'Street Address is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),
    check('postCode', 'Post Code is required').not().isEmpty(),
    check('country', 'Country is required').not().isEmpty(),
  ],
  async (req, res) => {
    // Check errors using express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Organization Info Fields
    const organizationFields = {
      phone: req.body.phone,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      postCode: req.body.postCode,
      country: req.body.country,
    };

    try {
      // See if organization exists
      let organization = await Organization.findOne({
        _id: req.params.id,
      });

      if (organization) {
        // Update
        organization = await Organization.findOneAndUpdate(
          { _id: req.params.id },
          { $set: organizationFields },
          { new: true }
        ).select('-password');
        return res.json(organization);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/organizations/me
// @desc     Get current organization info
// @access   Protected

router.get('/me', auth, async (req, res) => {
  try {
    const organization = await Organization.findById(
      req.organization.id
    ).select('-password');
    res.json(organization);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
