import { useGetAccountQuery } from "../store/slices/accountApiSlice"
import { toast } from "react-toastify";
import RegisterUser from "./RegisterUser";


export default function AccountFind({accountQuery}){

    let content;

    const {data,error,isLoading} = useGetAccountQuery(accountQuery)

    // console.log(data+''+error+''+isLoading)
    // console.log(`account before firing up the useGetAccountQuery is ${account}`)
    // const {data, error, isLoading} = useGetAccountQuery(accountQuery)
    // const {data, error, isLoading} = accountQuery

        if(error){
            toast.error('invalid account # ')
            console.log(error?.data?.message)
        }

        if (data){
            
        // toast.success('Account info refreshed!')
            content = (<>
                <br />
                🥳 Found it!
                <br />
                <div><strong>Account Id: </strong>{data._id}</div>
                <div><strong>Account name </strong>{data.name}</div>
                <div><strong>Account number </strong>{data.number}</div>
                <div><strong>Account status </strong>{data.status}</div>
            </>)
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
            {content}
            {data&&<RegisterUser endUser={false} account={data._id} />}
        </>
    )
}