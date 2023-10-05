import CLUpload from "../components/CLUpload";
import AppStepper from "../components/Common_Components/AppStepper";
import AppModal from "../components/Common_Components/AppModal";
import { useState, useEffect } from "react";
import { useAddContactsToContactListMutation, useCreateContactListMutation, useFetchContactListsQuery } from "../store/slices/contactListApiSlice";
import CLCollectName from "./CLCollectName";
import {toast} from "react-toastify";
import { Box, Button } from "@mui/material";
import Loader from "./Common_Components/Loader";

export default function CLAdd(){

    const [CLName, setCLName] = useState('');
    const [CLfromFile, setCLfromFile] = useState({});


    const {data:contactLists, error, isLoading} = useFetchContactListsQuery();
    const [createCL, results] = useCreateContactListMutation();
    const [addContactsToCL, resultsOfAddingContacts] = useAddContactsToContactListMutation();

    const [contentAfterSubmit, setContentAfterSubmit] = useState([]);

    const onDataChange = (data)=>{
        setCLfromFile(data);
        // console.log(JSON.stringify(data))

    }

    const checkNoDuplicateCLName = () =>  {

        const foundOne = contactLists.filter(contactList => contactList.name.toLowerCase() === CLName.toLowerCase())
        if (foundOne.length !==0){
            // setCLName('')
            toast.error('a Contact List with the same name already exists')
            return false;
        }
    return true;
    }


    const createCLnAddContacts = async ()=>{
                const res = await createCL({name:CLName})
                // console.log(res.data);
                // if (res.isLoading) setContentAfterSubmit(<SkeletonLoader/>)
                // else if (res.isError) setContentAfterSubmit(<div>Error occured creating the CL </div>)
                // else {
                    setContentAfterSubmit(<div>CL created with the given name, now adding the list of contacts!</div> )
                    await addContactsToCL({id:res.data._id,data:CLfromFile})
                    // if (res2) setContentAfterSubmit(<div>🥳 Success!</div>)
                    // }



                // console.log(results)
                setCLName('');
                setCLfromFile({});
    }

    useEffect(()=>{
        // console.log('resultsOfAddingContacts>>>  '+JSON.stringify(resultsOfAddingContacts))
        if (results.isLoading) setContentAfterSubmit(<Loader/>)
        if (results.isLoading||resultsOfAddingContacts.isLoading) setContentAfterSubmit(<Loader/>)
        else if (results.isError||resultsOfAddingContacts.isError) setContentAfterSubmit(<div>Error occured creating the CL </div>)
        else if (resultsOfAddingContacts.isSuccess) {
            setContentAfterSubmit(<div>🥳 Contact List added Successfully!</div>)
            toast.success("Contact List added successfully")

        }
        else setContentAfterSubmit([])


    },[results, resultsOfAddingContacts])


    const Step3 = 
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Button 
                sx={{alignSelf: 'stretch'}}
                variant="contained" 
                disabled={CLName===''} 
                onClick={createCLnAddContacts}
                >
                Create My new Contact List
            </Button>
            <br />
            {contentAfterSubmit}
        </Box>
    



    return(

        <AppModal
          buttonText="Upload a new List"
          buttonAttributes={{ variant: "outlined" }}
          title={"Upload & Create a new Contact List"}
          modalContent={
            <AppStepper
                steps={[
                    { title: "Give it a Name!", 
                        content: <CLCollectName CLName={CLName} onChange={setCLName}/>, 
                        onNextClick:checkNoDuplicateCLName,
                        isStepComplete: CLName!==''},
                    { title: "Upload the file", 
                        content: <CLUpload onDataChange={onDataChange}/>,
                         onNextClick:()=>setContentAfterSubmit([]),
                        isStepComplete: CLfromFile.length>0 },
                    { title: "Create the list", 
                        content: Step3,
                        // onNextClick:()=>setContentAfterSubmit([]),
                        isStepComplete: true },
                ]}
                contentAfterSubmit = {contentAfterSubmit}
                onStepperSubmit={CLName!==''?createCLnAddContacts:()=>setContentAfterSubmit([])} 
            />
          }
        />
    )
}

