import express from 'express'
// import { getContactList, updateContactList, createContactList, deleteContactList,fetchContactLists,addContactsToContactList} from '../controllers/contactListController.js';
import { createContactList, 
        createContactListBySA,
        deleteContactList,
        deleteContactListBySA,
        fetchContactLists,
        fetchContactListsBySA, 
        addContactsToContactList,
        addContactsToContactListBySA,
        getContactList} from '../controllers/contactListController.js';
import { protect } from '../middleware/authMiddleware.js';
import { sa } from '../middleware/saMiddleware.js';
const router = express.Router();


router.post('/', protect, createContactList)
router.get('/all',protect, fetchContactLists)
router.route('/one/:id').delete(protect, deleteContactList)         // id is the Contact List ID
                        .post(protect, addContactsToContactList)
                        .get(protect, getContactList);
                        // .put(protect, updateContactList)

router.post('/bySA', sa, createContactListBySA)
router.get('/allBySA/:accountId',sa, fetchContactListsBySA)
router.route('/oneBySA/:id').delete(sa, deleteContactListBySA)         // id is the Contact List ID
                            .post(protect, addContactsToContactListBySA);



export default router;