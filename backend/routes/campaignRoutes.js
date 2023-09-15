import express from 'express'
import { runCampaign, getCampaigns, updateCampaign, addNewCampaign, deleteCampaign} from '../controllers/campaignController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


router.route('/').post(protect, addNewCampaign).get(protect, getCampaigns)
router.route('/:id').put(protect, updateCampaign).post(protect, runCampaign).delete(protect, deleteCampaign);


export default router;