import express from 'express'
import { runCampaign, fetchCampaigns, updateCampaign, createCampaign, addCampaign, deleteCampaign} from '../controllers/campaignController.js';
import { protect } from '../middleware/authMiddleware.js';
import { sa } from '../middleware/saMiddleware.js';
const router = express.Router();


// router.route('/').post(protect, addNewCampaign)
// router.route('/:id').put(protect, updateCampaign).post(protect, runCampaign).delete(protect, deleteCampaign).get(protect);


router.post('/new', sa, addCampaign)
router.post('/create', protect, createCampaign)
router.route('/:id').put(protect,updateCampaign)
                    .delete(protect, deleteCampaign)
                    .post(protect, runCampaign)
                    .get(protect, fetchCampaigns);
// router.route('/').get(protect, Campaign)

export default router;