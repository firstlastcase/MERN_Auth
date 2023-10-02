import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function ContactListContacts({contactList}) {

    const contacts = contactList.contacts;

    let tableContents;
    if (contacts.length === 0) {
        tableContents = <div>Nothing to show here</div>
    } else {
        tableContents = 
            <TableBody>
          {contacts.map((contact) => (
            <TableRow
              key={contact._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {contact.phoneNumber}
              </TableCell>
              <TableCell align="right">{contact.everContacted?'Yes':'Never'}</TableCell>
              <TableCell align="right">{contact.lastContactedDate}</TableCell>

            </TableRow>
          ))}
        </TableBody>
    }

    
  return (
    <>

    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Phone Number</TableCell>
            <TableCell align="right">Ever Contacted?</TableCell>
            <TableCell align="right">Last Contacted Date</TableCell>
          </TableRow>
        </TableHead>

        {tableContents}


    {/* <TableBody>
           {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}

      </Table>
    </TableContainer>
    </>
  );
}