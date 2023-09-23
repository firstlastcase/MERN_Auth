import { useGetAccountQuery } from '../store/slices/accountApiSlice';

// To be optimised
export default function useGetAccountFromId(accountId) {

    const {data}=useGetAccountQuery(accountId);
    
    const getAccountFunc =(accountId)=>{
        console.log(data);
    }
    
    
    
    return {getAccountFunc}



}


