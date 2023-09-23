import express from 'express'
import { authUser , registerUser, logoutUser, getUserProfile, updateUserProfile, updateUserRole, fetchUsers, deleteUser} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { sa } from '../middleware/saMiddleware.js';
const router = express.Router();


router.post('/new',sa,registerUser)
router.delete('/del/:id',sa,deleteUser)
router.get('/list',sa, fetchUsers)
router.put('/role/:id',sa, updateUserRole)
router.post('/login', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)


export default router;