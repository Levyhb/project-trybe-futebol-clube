import { Router } from 'express';
import validateJWT from '../auth/validateJwt';
import matchController from '../controller/match.controller';

const router = Router();

router.get('/', matchController.getAllMatches);
router.post('/', validateJWT, matchController.newMatch);
router.patch('/:id/finish', matchController.finishMatch);

export default router;
