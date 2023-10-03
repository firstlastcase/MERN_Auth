import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFetchContactListsQuery } from "../store/slices/contactListApiSlice";
import Loader from "./Loader";

export default function SelectContactList({onSelectChange}) {
  const { data: contactLists, error, isLoading } = useFetchContactListsQuery();

  const [selectedContactList, setSelectedContactList] = useState('');

  
  const handleChange = (event) => {
    setSelectedContactList(event.target.value);
    onSelectChange(event.target.value);

  };


  let menuItems;

  if (isLoading) {
    menuItems = <Loader />;
  } else if (error) {
    menuItems = [];
  } else {
    menuItems = (
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedContactList}
        label="Contact List"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Select</em>
        </MenuItem>

        {contactLists.map((contactList) => {
          return (
            <MenuItem key={contactList._id} value={contactList._id}>
              {contactList.name}
            </MenuItem>
          );
        })}
      </Select>
    );
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120, width:'100%' }} size="small">
      <InputLabel id="demo-select-small-label">Contact List</InputLabel>
      {menuItems}
    </FormControl>
  );
}
