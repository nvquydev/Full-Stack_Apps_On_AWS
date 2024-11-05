import express from 'express';

const defaultRoute = express.Router();

defaultRoute.get('/**', (req, res, next) => {
    res.redirect(
        '/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg',
    );
});

export default defaultRoute;
