import asyncHandler from 'express-async-handler'
import ContactList from "../models/contactListModel.js"
import User from "../models/userModel.js"
import Account from "../models/accountModel.js"


// @description     Add a new contactList 
// route            POST /api/contactist
// @access          Private
const createContactList = asyncHandler(async (req, res)=>{

    try {
        const { name } = req.body;
        const user = await User.findById(req.user.id);

        const account = await Account.findById(user.account);

        if (!account) {
            console.log(req.body);
            res.status(400).json({ error: 'cant create a contact list for a user without a valid acccount' });
            return;
        }

        const contactListExists = await ContactList.findOne({ account, name });

        if (contactListExists) {
            res.status(400).json({ error: 'A Contact List with the exact same name already exists in your Account, try again with a different name!!' });
            return;
        }

        
        const contactListsCount = await ContactList.countDocuments({ account },{maxTimeMS:100});
        if(typeof contactListsCount === 'undefined') {
            res.status(404).json({error: 'getting contact list count took a lot of time!'})
            return;
            }


        const contactList = await ContactList.create({
            name,
            number:contactListsCount +1,
            account,
            status: 0,
            created_by: user.id
        });

        if (contactList) {
            res.status(201).json({
                _id: contactList._id,
                name: contactList.name,
                number: contactList.number,
                account: contactList.account,
                status: contactList.status
            });
        } else {
            res.status(400).json({ error: 'Invalid contactList data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }

})


// #################################################################

// @description     Add a new contactList 
// route            POST /api/contactist/bySA
// @access          SA
const createContactListBySA = asyncHandler(async (req, res)=>{

    try {
        const { name, accountNumber} = req.body;
        const user = await User.findById(req.user.id);

        const account = await Account.findOne({ number: accountNumber });

        if (!account) {
            console.log(req.body);
            res.status(400).json({ error: 'You need to provide a valid Account number' });
            return;
        }


        const contactListExists = await ContactList.findOne({ account: account._id, name });

        if (contactListExists) {
            res.status(400).json({ error: 'A Contact List with the exact same name already exists in your Account, try again with a different name!!' });
            return;
        }

        const contactListsCount = await ContactList.countDocuments({ account: account._id },{maxTimeMS:100});
        if(typeof contactListsCount === 'undefined')  {
            res.status(404).json({error: 'getting contact list count took a lot of time!'})
            return;
            }
   

        const contactList = await ContactList.create({
            name,
            number:contactListsCount +1,    
            account: account._id,
            status: 0,
            created_by: user.id
        });

        if (contactList) {
            res.status(201).json({
                _id: contactList._id,
                name: contactList.name,
                number: contactList.number,
                account: contactList.account,
                status: contactList.status
            });
        } else {
            res.status(400).json({ error: 'Invalid contactList data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }

})


//################################################################

// @description     Delete contactList 
// route            delete /api/contactist/one/:id
// @access          Private
const deleteContactList = asyncHandler(async (req, res)=>{

    const user = await User.findById(req.user.id);
    const id = req.params.id;   // id is the contact list id


    try {
        // Find the ContactList document by ID
        const contactList = await ContactList.findById(id);

        if (!contactList) {
            return res.status(404).json({ error: 'Contact List not found' });
        }

        // Check if the ContactList has an associated account
        if (!contactList.account) {
            return res.status(400).json({ error: 'Contact List does not have an associated account' });
        }

        // Fetch the associated account
        const account = await Account.findById(contactList.account);

        if (!account) {
            return res.status(404).json({ error: 'Associated account not found' });
        }

        if (user.account.toString() !== account._id.toString()) {
            res.status(401).json({ error: 'Not Authorized, You can only add a new Contact List to your own Account!' });
            return;
        }
    

        const deletedContactList = await ContactList.findByIdAndRemove(req.params.id);
        if (!deletedContactList) {
            return res.status(404).json({ error: 'Contact list not found' });
        }
        res.json(deletedContactList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting contact list' });
    }


})

//################################################################

// @description     Delete contactList 
// route            delete /api/contactist/oneBySA/:id
// @access          SA
const deleteContactListBySA = asyncHandler(async (req, res)=>{

    const id = req.params.id;   // id is the contact list id


    try {
        // Find the ContactList document by ID
        const contactList = await ContactList.findById(id);

        if (!contactList) {
            return res.status(404).json({ error: 'Contact List not found' });
        }

        // Check if the ContactList has an associated account
        if (!contactList.account) {
            return res.status(400).json({ error: 'Contact List does not have an associated account' });
        }

        // Fetch the associated account
        const account = await Account.findById(contactList.account);

        if (!account) {
            return res.status(404).json({ error: 'Associated account not found' });
        }
  

        const deletedContactList = await ContactList.findByIdAndRemove(req.params.id);
        if (!deletedContactList) {
            return res.status(404).json({ error: 'Contact list not found' });
        }
        res.json(deletedContactList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting contact list' });
    }


})

// @description     Get contactList
// route            Get /api/contactist/one/:id
// @access          Private
// const getContactList = asyncHandler(async (req, res)=>{

//     try {
//         const contactList = await ContactList.findById(req.params.id);
//         if (!contactList) {
//             return res.status(404).json({ error: 'Contact list not found' });
//         }
//         res.json(contactList);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error fetching contact list' });
//     }

// })



// @description     Update contactList
// route            Put /api/contactist/one/:id
// @access          Private
// const updateContactList = asyncHandler(async (req, res)=>{


// })


// #################################################################
// @description     fetch contactLists for the user's own account
// route            Get /api/contactist/all/:accountId
// @access          Private
const fetchContactLists = asyncHandler(async (req, res)=>{

    // if (!req.params) {
    //     res.status(400).json({ error: 'Account ID is required' });
    //     return;
    // }
    
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }
        
        // if (user.account.toString() !== req.params.accountId) {
        //     res.status(401).json({ error: 'Not Authorized. You can only view Contact Lists associated with your own account.' });
        //     return;
        // }

        // const contactLists = await ContactList.find({ account: req.params.accountId });
        const contactLists = await ContactList.find({ account: user.account });
        
        if (contactLists.length === 0) {
            res.status(404).json({ error: 'No contact lists found for this account' });
            return;
        }

        res.status(200).json(contactLists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching contact list' });
    }
});


//################################################################

// @description     fetch contactLists for a specific account
// route            Get /api/contactist/allBySA/:accountId
// @access          SA
const fetchContactListsBySA = asyncHandler(async (req, res)=>{

    if (!req.params) {
        res.status(400).json({ error: 'Account ID is required' });
        return;
    }
    
    try {


        const contactLists = await ContactList.find({ account: req.params.accountId });
        
        if (contactLists.length === 0) {
            res.status(404).json({ error: 'No contact lists found for this account' });
            return;
        }

        res.status(200).json(contactLists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching contact list' });
    }
});


//################################################################
// @description     add multiple contacts to a contact list of user's own account
// route            Post /contactist/one/:id
// @access          Private
const addContactsToContactList = asyncHandler(async (req, res)=>{

    const user = await User.findById(req.user.id);

    const id = req.params.id;   // id is the contact list id
    const newContacts = req.body.contacts; // An array of new contacts and the action whether to replace or to add to existing contacts

    try {
        // Find the ContactList document by ID
        const contactList = await ContactList.findById(id);

        if (!contactList) {
            return res.status(404).json({ error: 'Contact List not found' });
        }

        // Check if the ContactList has an associated account
        if (!contactList.account) {
            return res.status(400).json({ error: 'Contact List does not have an associated account' });
        }

        // Fetch the associated account
        const account = await Account.findById(contactList.account);

        if (!account) {
            return res.status(404).json({ error: 'Associated account not found' });
        }

        if (user.account.toString() !== account._id.toString()) {
            res.status(401).json({ error: 'Not Authorized, You can only update the Contact List if it is associated to your own Account!' });
            return;
        }

        contactList.contacts.splice(0,contactList.contacts.length)        
        
        // if replaceAll is true, empty the contacts first
        // replaceAll&&contactList.contacts.splice(0,contactList.contacts.length)

        // Push the new contacts to the 'contacts' array
        contactList.contacts.push(...newContacts);

        // Save the updated ContactList
        const updatedContactList = await contactList.save();

        return res.status(201).json(updatedContactList);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding the contacts' });
    }
});




//################################################################
// @description     add multiple contacts to a contact list
// route            Post /contactist/oneBySA/:id
// @access          SA
const addContactsToContactListBySA = asyncHandler(async (req, res)=>{

    const id = req.params.id;   // id is the contact list id
    // const {contacts,replaceAll} = req.body; // An array of new contacts and the action whether to replace or to add to existing contacts
    const newContacts = req.body.contacts; // An array of new contacts and the action whether to replace or to add to existing contacts



    try {
        // Find the ContactList document by ID
        const contactList = await ContactList.findById(id);

        if (!contactList) {
            return res.status(404).json({ error: 'Contact List not found' });
        }

        // Check if the ContactList has an associated account
        if (!contactList.account) {
            return res.status(400).json({ error: 'Contact List does not have an associated account' });
        }

        // Fetch the associated account
        const account = await Account.findById(contactList.account);

        if (!account) {
            return res.status(404).json({ error: 'Associated account not found' });
        }


        // if replaceAll is true, empty the contacts first
        // replaceAll&&contactList.contacts.splice(0,contactList.contacts.length)
        contactList.contacts.splice(0,contactList.contacts.length)
    
        // Push the new contacts to the 'contacts' array
        contactList.contacts.push(...newContacts);

        // Save the updated ContactList
        const updatedContactList = await contactList.save();

        return res.status(201).json(updatedContactList);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding the contacts' });
    }
});


// #################################################################
// @description     get a contactList by id (request initiated by the user)
// route            Get /api/contactist/one/:id
// @access          Private
const getContactList = asyncHandler(async (req, res)=>{

    if (!req.params) {
        res.status(400).json({ error: 'Contact List ID is required' });
        return;
    }

    
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        const contactList = await ContactList.findOne({ account:user.account , _id:req.params.id });
               
        if (!contactList) {
            res.status(404).json({ error: 'Contact list Not found' });
            return;
        }

        res.status(200).json(contactList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching contact list' });
    }
});





// export { getContactList, updateContactList, createContactList, deleteContactList, fetchContactLists,addContactsToContactList}
export { createContactList, 
        createContactListBySA, 
        deleteContactList,
        deleteContactListBySA, 
        fetchContactLists,
        fetchContactListsBySA, 
        addContactsToContactList,
        addContactsToContactListBySA,
        getContactList}