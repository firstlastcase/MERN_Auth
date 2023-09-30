import { useGetAccountQuery } from "../store/slices/accountApiSlice"
import { toast } from "react-toastify";
import RegisterUserByAdmin from "./RegisterUserByAdmin";
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';
// import Container from "@mui/material/Container";




export default function AccountFind({accountQuery}){

    let content;

    const {data:account,error,isLoading} = useGetAccountQuery(accountQuery)
    // const {{_id,name,number,status},error,isLoading} = useGetAccountQuery(accountQuery)

    // console.log(data+''+error+''+isLoading)
    // console.log(`account before firing up the useGetAccountQuery is ${account}`)
    // const {data, error, isLoading} = useGetAccountQuery(accountQuery)
    // const {data, error, isLoading} = accountQuery

        if(error){
            toast.error('invalid account # ')
            console.log(error?.data?.message)
        }

        if (account){
            
            // toast.success('Account info found and refreshed!')
            content = (
                    <>

                            <div><strong>Account Id: </strong>{account._id}</div>
                            <div><strong>Account name </strong>{account.name}</div>
                            <div><strong>Account number </strong>{account.number}</div>
                            <div><strong>Account status </strong>{account.status}</div>
                    </>


            )
        } else if (isLoading) {
            content = (<div>Loading...</div>)
                
        }else{
            content = (<>
                <br />
                🫣 Account not found!
                <br />
            </>)
        }


    

    return(
        <>

            <br/>
            <Box sx={{border: '1px solid lightgrey', borderRadius: '5px',p:1}}>
                 {content}
            </Box>
            {account&&<>
            <br/>
            <Box sx={{border: '1px solid lightgrey', borderRadius: '5px',p:1}}>
               <RegisterUserByAdmin account={account._id} />
            </Box>
            </>
            }
        </>
    )
}