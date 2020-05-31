const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Animal = require('../../models/Animal');
const Organization = require('../../models/Organization');

// @route    POST api/animals
// @desc     Create a animal
// @access   Private
router.post(
  '/',
  [auth, [check('species', 'Species is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const organization = await Organization.findById(
        req.organization.id
      ).select('-password');

      const newAnimal = new Animal({
        species: req.body.species,
        organization: req.organization.id,
        organizationInfo: {
          name: organization.name,
          email: organization.email,
          phone: organization.phone,
          streetAddress: organization.streetAddress,
          city: organization.city,
          state: organization.state,
          postCode: organization.postCode,
          country: organization.country,
        },
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender,
        size: req.body.size,
        color: req.body.color,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
      });

      const animal = await newAnimal.save();
      res.json(animal);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/animals
// @desc     Get all animals
// @access   Public

router.get('/', async (req, res) => {
  try {
    // Sorts by most recent one
    const animals = await Animal.find().sort({ date: -1 });
    res.json(animals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/animals/byOrganization
// @desc     Get all animals for an organization
// @access   Private

router.get('/byOrganization', auth, async (req, res) => {
  try {
    // Sorts by most recent one
    const animals = await Animal.find({
      organization: req.organization.id,
    }).sort({ date: -1 });
    res.json(animals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/animals/:id
// @desc     Get animal by ID
// @access   Public

router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({ msg: 'Animal not found' });
    }
    res.json(animal);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Animal not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/animals/:id
// @desc     Delete an animal
// @access   Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({ msg: 'Animal not found' });
    }

    // Check organization
    if (animal.organization.toString() !== req.organization.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await animal.remove();

    res.json({ msg: 'Animal removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Animal not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
