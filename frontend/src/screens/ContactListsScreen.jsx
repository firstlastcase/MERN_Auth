// import Loader from "../components/Loader"
// import {toast} from 'react-toastify'
import IdleTimeout from "../components/IdleTimeout"
import useIdleLogout from "../hooks/useIdleLogout"
import { useFetchContactListsQuery } from "../store/slices/contactListApiSlice"
import AppModal from '../components/AppModal'
import { DataGrid } from '@mui/x-data-grid';
import SkeletonLoader from "../components/SkeletonLoader"
import ContactListUpload from "../components/ContactListUpload"
import ContactListContacts from "../components/ContactListContacts";



export default function ContactListsScreen(){


    const {data:contactLists, error, isLoading} = useFetchContactListsQuery()
        
    const columns = [
  { field: 'id', headerName: 'Number', width: 100 },
  { field: 'Name', headerName: 'Contact List Name', width: 250 },
  { field: 'contactsCount', headerName: 'Total Contacts', width: 130 },
  { field: 'createdAt', headerName: 'Created At', width: 200 },
  { field: 'updatedAt',headerName: 'Updated At', width: 200  },
  { field: 'link',headerName: '', width: 150,
  renderCell: (params) => (
      <AppModal
          buttonText='↗'
          buttonAttributes={{variant:"primary"}}
          title={params.value.name}
          modalContent={<ContactListContacts contactList={params.value}/>}
          />
  )  },

];

    let content;
    if(isLoading){
      content = <SkeletonLoader/>
    } else if(error){
        content = <div>Error: {error?.data?.message}</div>
    } else {
      content=(
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={contactLists.map(contactList=>{
                    return ( 
                      { id: contactList.number, 
                        Name: contactList.name, 
                        contactsCount: contactList.contacts.length, 
                        createdAt:contactList.createdAt,
                        updatedAt:contactList.updatedAt,
                        link: contactList  }
                    )
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


      )
    }
    

    const {handleTimeout} = useIdleLogout()

  return (

    <>
        <IdleTimeout timeout={1800000} onTimeout={handleTimeout} />
        <div className=' py-3 d-flex justify-content-between'>
            <h2>Contact Lists</h2>

            <AppModal
                buttonText='Upload a new List'
                buttonAttributes={{variant:"secondary"}}
                title={'CSV File Upload and Display'} 
                modalContent={<ContactListUpload />}

            />


        </div>
  
      {content}

    </>
  )
}