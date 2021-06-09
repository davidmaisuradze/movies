import { Router } from 'express';
import path from 'path';

// middleware to log errors
import logError from '../utils/log-error.utils';

// ROUTES
import AuthRoutes from './auth.routes';
import MovieRoutes from './movie.routes';

const routes = new Router();

// register routes
routes.use('/auth', AuthRoutes);
routes.use('/movies', MovieRoutes);

routes.all('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

routes.use(logError);

export default routes;
