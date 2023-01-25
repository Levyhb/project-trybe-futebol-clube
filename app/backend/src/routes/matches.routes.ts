import { Router } from 'express';
import validateJWT from '../auth/validateJwt';
import matchController from '../controller/match.controller';

const router = Router();

router.get('/', matchController.getAllMatches);
router.post('/', validateJWT, matchController.newMatch);

export default router;
