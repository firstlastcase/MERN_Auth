// import Loader from "../components/Loader"
// import {toast} from 'react-toastify'
import IdleTimeout from "../components/Common_Components/IdleTimeout";
import useIdleLogout from "../hooks/useIdleLogout";
import { useDeleteContactListMutation, useFetchContactListsQuery } from "../store/slices/contactListApiSlice";
import AppModal from "../components/Common_Components/AppModal";
import { DataGrid } from "@mui/x-data-grid";
import SkeletonLoader from "../components/Common_Components/SkeletonLoader";
import ContactListContacts from "../components/CLContacts";
import CLAdd from "../components/CLAdd";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from "../components/Common_Components/Loader";



export default function ContactListsScreen() {

  const { data: contactLists, error, isFetching, isLoading } = useFetchContactListsQuery();
  // console.log('contactLists from frontend: >>> '+  JSON.stringify(contactLists))
  

  const [deleteCL , results] = useDeleteContactListMutation()

  const columns = [
    { field: "id", headerName: "Number", width: 100 },
    { field: "Name", headerName: "Contact List Name", width: 250 },
    { field: "contactsCount", headerName: "Total Contacts", width: 130 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    { field: "updatedAt", headerName: "Updated At", width: 200 },
    {
      field: "link",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <>
        <AppModal
          buttonText="↗"
          buttonAttributes={{ variant: "primary" }}
          title={params.value.name}
          modalContent={<ContactListContacts contactList={params.value} />}
        />
        {isFetching&&<Loader size={22}/>}
        <Button color="error"
          onClick={()=>deleteCL(params.value._id)}><DeleteIcon/></Button>
        </>
      ),
    },
  ];

  let content;
  if (isLoading) {
    content = <SkeletonLoader />;
  } else if (error) {
    content = <div>Error: {error?.data?.message}</div>;
  } else {
    content = (
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={contactLists.map((contactList) => {
            return {
              id: contactList._id,
              Name: contactList.name,
              contactsCount: contactList.contacts.length,
              createdAt: contactList.createdAt,
              updatedAt: contactList.updatedAt,
              link: contactList,
            };
          })}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          autoHeight
          // checkboxSelection
        />
      </div>
    );
  }

  const { handleTimeout } = useIdleLogout();

  return (
    <>
      <IdleTimeout timeout={1800000} onTimeout={handleTimeout} />
      <div className=" py-3 d-flex justify-content-between">
        <h2>Contact Lists</h2>

        <CLAdd/>

      </div>

      {content}

      {/* <AppStepper steps= {['Select campaign settings', 'Create an ad group', 'Create an ad']}/> */}
    </>
  );
}
