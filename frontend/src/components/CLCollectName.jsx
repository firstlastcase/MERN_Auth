import { TextField } from "@mui/material";



export default function CLCollectName({CLName, onChange}){

    return (
        <TextField
          size="small"
          onChange={(e) => onChange(e.target.value)}
          name="Name"
          label="Contact List Name"
          fullWidth
          autoComplete="none"
          type={"text"}
          value={CLName}
        />

    )
}