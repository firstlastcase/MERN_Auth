import { useState } from "react"
import AccountFind from "./AccountFind"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


export default function UserAdd() {

    const [accountQuery,setAccountQuery] = useState(null)
    const [accountNumInput,setAccountNumInput] = useState('')


    const handleAccountInputChange =(e)=>{
        setAccountQuery(null)
        setAccountNumInput(e.target.value)

    }


    const handleAccountFormSubmit = (event)=>{
                event.preventDefault();
                if (!accountNumInput||accountNumInput.length===0) return;
                setAccountQuery({number:accountNumInput})
                setAccountNumInput('')

    }


  return (
<>

        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'full' }}
            onSubmit={handleAccountFormSubmit}
            >
            
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Account number"
                inputProps={{ 'aria-label': 'Search Account number' }}
                value={accountNumInput}
                onChange={e=>handleAccountInputChange(e)}
            />
            <IconButton 
                type="button" 
                sx={{ p: '10px' }} 
                aria-label="search"
                disabled={accountNumInput.length !== 6}>
                <SearchIcon />
            </IconButton>

        </Paper>

        {accountQuery&&<AccountFind accountQuery={accountQuery} />}


</>
  )
}

 