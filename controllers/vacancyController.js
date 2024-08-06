const vacancyService = require('../services/vacancyService');

module.exports = {
  createVacancy: async (req, res) => {
    try {
      const result = await vacancyService.createVacancy(req.body);
      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  getVacancies: async (req, res) => {
    try {
      const result = await vacancyService.getVacancies();
      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  getVacancyById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await vacancyService.getVacancyById(id);
      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  updateVacancy: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await vacancyService.updateVacancy(id, req.body);
      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  deleteVacancy: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedVacancy = await vacancyService.deleteVacancy(id);
      res.status(deletedVacancy.status).json(deletedVacancy);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};
