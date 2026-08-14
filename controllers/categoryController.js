const TicketCategory = require('../models/TicketCategory');

const getCategories = async (req, res) => {
  try {
    const categories = await TicketCategory.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await TicketCategory.create({ name, description });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCategories, createCategory };