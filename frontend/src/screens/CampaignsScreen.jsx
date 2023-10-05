import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import IdleTimeout from "../components/Common_Components/IdleTimeout";
import useIdleLogout from "../hooks/useIdleLogout";
import { useDeleteCampaignMutation, useFetchCampaignsQuery } from "../store/slices/campaignApiSlice";
import AppModal from "../components/Common_Components/AppModal";
import CampaignAdd from "../components/CampaignAdd";
// import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import SkeletonLoader from "../components/Common_Components/SkeletonLoader";
import { useFetchContactListsQuery } from "../store/slices/contactListApiSlice";


export default function CampaignsScreen() {
  const { accountInfo } = useSelector((state) => state.account);

  const { data: campaigns, error, isFetching } = useFetchCampaignsQuery(accountInfo._id);
  const { data: contactLists } = useFetchContactListsQuery();

  // console.log(contactLists[0].name)

  const [deleteCampaign, results] = useDeleteCampaignMutation()


  const handleDelete=async (campaignId)=>{

          const res= await deleteCampaign(campaignId)
          !res.error?toast.success("Campaign deleted successfully"):toast.error(res.error?.data?.message)
          // console.log(res)

  };



  let campaignsContent;
  if (isFetching) {
    campaignsContent = <SkeletonLoader />;
  } else if (error) {
    toast.error(error);
    campaignsContent = <div>Error!</div>;
  } else {
    campaignsContent = (
      <div>
        {campaigns.map((campaign) => {
          
          return (
            <Row
              className="my-2 d-flex justify-content-between align-items-start"
              key={campaign._id}
            >
              <Col sm={2}>{campaign.name}</Col>
              <Col sm={2}>{campaign.purpose}</Col>
              <Col sm={2}>{campaign.contactList}</Col>
              {/* <Col sm={2}>{contactLists.find(contactList=>{
                // console.log(contactList.name)
                console.log(contactList._id)
                console.log(campaign.contactList)
                return contactList._id===campaign.contactList}).name||null}</Col> */}
              <Col sm={2}><Button 
                onClick={()=>handleDelete(campaign._id)}>X
                  </Button> 
                </Col>
              {/* <Col sm={2}>{campaign.account}</Col>      */}
            </Row>
          );
        })}
      </div>
    );
  }

  // const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  //   { field: "firstName", headerName: "Campaign", width: 130 },
  //   { field: "lastName", headerName: "Last name", width: 130 },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     width: 90,
  //   },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
  // ];

  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // ];

  // let content;
  // if (isLoading) {
  //   content = <SkeletonLoader />;
  // } else if (error) {
  //   content = <div>Error: {error?.data?.message}</div>;
  // } else {
  //   content = (
  //     <div style={{ height: 600, width: "100%" }}>
  //       <DataGrid
  //         rows={rows}
  //         columns={columns}
  //         initialState={{
  //           pagination: {
  //             paginationModel: { page: 0, pageSize: 10 },
  //           },
  //         }}
  //         pageSizeOptions={[5, 10]}
  //         checkboxSelection
  //       />
  //     </div>
  //   );
  // }


  const { handleTimeout } = useIdleLogout();

  return (
    <>
      <IdleTimeout timeout={1800000} onTimeout={handleTimeout} />
      <div className=" py-3 d-flex justify-content-between">
        <h2>Campains</h2>
        <AppModal
          buttonText="Add New Campaign"
          buttonAttributes={{ variant: "outlined" }}
          title={"Add New Campaign"}
          modalContent={<CampaignAdd accountNumber={accountInfo.number} />}
        />
      </div>

      {/* {content} */}
      {campaignsContent}

    </>
  );
}
