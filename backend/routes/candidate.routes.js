import express  from "express";
import { createCandidate, deleteCandidate, getCandidate, getCandidates, updateCandidate } from "../controllers/candidates.js";


    const router = express.Router();
  
    router.post('/candidate', createCandidate);
    router.get('/candidates', getCandidates);
    router.get( '/candidates/:id', getCandidate);
    router.post( '/candidates/:id', updateCandidate);
    router.delete( '/candidates/:id', deleteCandidate);

    export default router;
    


