const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./redis'); 
const config = require('../config'); 
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

//Route Imports
const newsRoute = require('../routes/newsRoute');
const productRoute = require('../routes/productRoute');
const vacancyRoute = require('../routes/vacancyRoute');
const userRoute = require('../routes/userRoute');


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Session configuration
app.use(session({
  store: new RedisStore({ client: redisClient }), 
  secret: config.SESSION_SECRET || 'adwvwdvawefgagaeaefd', 
  resave: false,
  saveUninitialized: false,
}));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.1.0', 
    info: {
      title: 'Pharmaceutical Company API', 
      version: '2.0', 
      description: 'API documentation for Pharmaceutical Company', 
    },
    servers: [
      {
        url: `http://localhost:${config.PORT || 3000}`, 
      },
    ],
  },

  apis: [path.resolve(__dirname, '../routes/*.js')], // Adjust the path to match your API routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes and other middleware
app.use('/api/news', newsRoute);
app.use('/api/product', productRoute);
app.use('/api/vacancy', vacancyRoute);
app.use('/api/user',userRoute)

app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

module.exports = app;
