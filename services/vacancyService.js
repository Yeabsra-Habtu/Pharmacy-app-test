const Vacancy = require('../models/Vacancy');

module.exports = {
  createVacancy: async (vacancyData) => {
    try {
      const result = await Vacancy.create(vacancyData);
      return { status: 201, result }; 
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },

  getVacancies: async () => {
    try {
      const vacancies = await Vacancy.find();
      return { status: 200, vacancies };
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },

  getVacancyById: async (id) => {
    try {
      const vacancy = await Vacancy.findById(id);
      if (!vacancy) return { status: 404, message: 'Vacancy not found' };
      return { status: 200, vacancy };
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },

  updateVacancy: async (id, updateData) => {
    try {
      const updatedVacancy = await Vacancy.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedVacancy) return { status: 404, message: 'Vacancy not found' };
      return { status: 200, vacancy: updatedVacancy };
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },

  deleteVacancy: async (id) => {
    try {
      const deletedVacancy = await Vacancy.findByIdAndDelete(id);
      if (!deletedVacancy) return { status: 404, message: 'Vacancy not found' };
      return { status: 200, message: 'Vacancy Deleted' };
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },
};
