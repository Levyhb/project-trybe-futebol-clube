import { Router } from 'express';
import matchValidation from '../middleware/match.validation';
import validateJWT from '../auth/validateJwt';
import matchController from '../controller/matches.controller';

const router = Router();

router.get('/', matchController.getAllMatches);
router.post('/', validateJWT, matchValidation, matchController.newMatch);
router.patch('/:id/finish', matchController.finishMatch);
router.patch('/:id', matchController.updateMatch);

export default router;
