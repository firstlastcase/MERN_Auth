import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Loader from "./Loader";
import { useCreateCampaignMutation } from "../store/slices/campaignApiSlice";
import SelectContactList from "./CampaignSelectContactList";
import { Box, TextField } from "@mui/material";

export default function CampaignAdd() {
  const [name, setName] = useState("name");
  const [purpose, setPurpose] = useState("purpose");
  const [contactList, setConactList] = useState('');

  const [createCampaign, { isLoading }] = useCreateCampaignMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await createCampaign({
        name,
        purpose,
        contactList,
      }).unwrap();
      !res.error
        ? toast.success("New campaign created successfully")
        : toast.error(res.error?.data?.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSelectChange = (contactList) => {
    console.log('contactList from the Parent component'+contactList)
    setConactList(contactList);
  };


  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          size="small"
          onChange={(e) => setName(e.target.value)}
          name="Name"
          label="Name"
          fullWidth
          autoComplete="none"
          type={"text"}
        />
        <TextField
          size="small"
          onChange={(e) => setPurpose(e.target.value)}
          name="Purpose"
          label="Purpose"
          fullWidth
          autoComplete="none"
          type={"text"}
        />

        <div >
          <SelectContactList onSelectChange={handleSelectChange} />
        </div>
        {isLoading && <Loader />}
        <Button type="submit" variant="contained" className="mt-3">
          Create new campaign
        </Button>
      </Box>
    </>
  );
}
