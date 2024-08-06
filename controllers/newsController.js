const newsService = require('../services/newsService');

module.exports = {
  createNews: async (req, res) => {
    try {
      const result = await newsService.createNews(req);
      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  getNews: async (req, res) => {
    try {
      const result = await newsService.getNews();
      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  getNewsById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await newsService.getNewsById(id);
      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  updateNews: async (req, res) => {
    try {
      const result = await newsService.updateNews(req);
      res.status(result.status).json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  deleteNews: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedNews = await newsService.deleteNews(id);
      res.status(deletedNews.status).json(deletedNews);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};
