import express from 'express'
import { authUser , registerUser, logoutUser, getUserProfile, updateUserProfile, updateUserRole, fetchUsers} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { sa } from '../middleware/saMiddleware.js';
const router = express.Router();


router.route('/').get(sa, fetchUsers).post(registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.put('/role',sa, updateUserRole)
// router.put('/role',protect, updateUserRole)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)


export default router;