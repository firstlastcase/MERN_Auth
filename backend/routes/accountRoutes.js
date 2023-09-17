import express from 'express'
import { createAccount, getAccount,fetchAccounts,updateAccount,deleteAccount} from '../controllers/accountController.js';
import { protect } from '../middleware/authMiddleware.js';
import { sa } from '../middleware/saMiddleware.js';
const router = express.Router();


router.route('/list').get(sa, fetchAccounts)
router.post('/new', sa, createAccount)
router.route('/:id').get(protect, getAccount).put(sa, updateAccount).delete(sa, deleteAccount);


export default router;