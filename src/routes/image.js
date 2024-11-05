import express from 'express';
import savedImageController from '../controller/imageController.js';

const imageRoute = express.Router();

imageRoute.get('/filteredimage/:image_url?', savedImageController);

export default imageRoute;
