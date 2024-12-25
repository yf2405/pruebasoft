import academicRouter from './academics.routes.js';
import candidateRoutes from './candidate.routes.js';
import express  from "express";
import workExperienceRouter from './workEperience.routes.js';
function routerApi(app) {
    const router = express.Router();
    app.use('/api', router);
    router.use('/candidate', candidateRoutes);
    router.use('/academy', academicRouter);
    router.use('/work', workExperienceRouter);

    
}
export default routerApi