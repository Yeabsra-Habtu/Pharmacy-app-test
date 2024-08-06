const mongoose = require('mongoose');
const News = require('../models/News');
const fs = require('fs');
const path = require('path');

module.exports = {
  createNews: async (req) => {
    try {
      const { title, content } = req.body;
      const newsImage = req.file ? req.file.filename : null;

      const newsData = { title, content, imageUrl: newsImage };
      const result = await News.create(newsData);
      return { status: 201, result }; 
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },

  getNews: async () => {
    try {
      const news = await News.find();
      return { status: 200, news };
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },

  getNewsById: async (id) => {
    try {
      const newsItem = await News.findById(id);
      if (!newsItem) return { status: 404, message: 'News not found' };
      return { status: 200, news: newsItem };
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },

  updateNews: async (req) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const newsImage = req.file ? req.file.filename : null;

      const news = await News.findById(id);
      if (!news) return { status: 404, message: 'News not found' };

      if (newsImage && news.imageUrl) {
        const oldImagePath = path.join(__dirname, '../uploads', news.imageUrl);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }

      const updateData = { title, content };
      if (newsImage) {
        updateData.imageUrl = newsImage;
      }

      const updatedNews = await News.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedNews) return { status: 404, message: 'News not found' };
      return { status: 200, news: updatedNews };
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },

  deleteNews: async (id) => {
    try {
      const deletedNews = await News.findByIdAndDelete(id);
      if (!news) return { status: 404, message: 'News not found' };

      if (deletedNews.imageUrl) {
        const imagePath = path.join(__dirname, '../uploads', deletedNews.imageUrl);
        fs.unlink(imagePath, (err) => {
          if (err) console.error('Error deleting image:', err);
        });
      }

      return { status: 200, message: 'News Deleted' };
    } catch (e) {
      return { status: 500, message: e.message };
    }
  },
};
