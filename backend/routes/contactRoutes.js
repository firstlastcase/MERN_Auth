import express from 'express'
import { registerContact, getContact, updateContact, addNewContact, deleteContact} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


router.post('/', protect, addNewContact)
router.route('/:id').get(protect, getContact).put(protect, updateContact).post(protect, registerContact).delete(protect, deleteContact);


export default router;