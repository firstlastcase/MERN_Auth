import express from 'express'
import { runCampaign, fetchCampaigns, updateCampaign, addCampaign, deleteCampaign} from '../controllers/campaignController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


// router.route('/').post(protect, addNewCampaign)
// router.route('/:id').put(protect, updateCampaign).post(protect, runCampaign).delete(protect, deleteCampaign).get(protect);


router.post('/new', protect, addCampaign)
router.route('/:id').put(protect,updateCampaign)
                    .delete(protect, deleteCampaign)
                    .post(protect, runCampaign)
                    .get(protect, fetchCampaigns);
// router.route('/').get(protect, Campaign)

export default router;