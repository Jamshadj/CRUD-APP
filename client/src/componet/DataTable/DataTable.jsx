import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { deleteData, editdata, getdata } from '../../services/api';
import Swal from 'sweetalert2';

export default function BasicTable({ tasks }) {

  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const userId = localStorage.getItem('userId');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getdata(userId);
        console.log(response.data);

        // Check if response data is null or empty array
        if (response.data && response.data.length > 0) {
          setRows(response.data);
        } else {
          // Set an empty array to rows if response data is null or empty
          setRows([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Set loading state to false after data is fetched
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId,tasks]);


 const handleEdit = (id, currentDescription) => {
  Swal.fire({
    title: 'Edit Description',
    input: 'text',
    inputValue: currentDescription, // Set the current description as the default input value
    inputValidator: (value) => {
      if (!value) {
        return 'Description cannot be empty';
      }
      // Handle sending the edited description to the API (using editdata function) here
      editDescription(id, value);
    },
  });
};

const editDescription = async (id, newDescription) => {
  try {
    // Call the API to edit the description
    const response = await editdata(id, { description: newDescription });
    if (response.status === 200) {
      // Update the local state with the edited data
      const updatedRows = rows.map((row) =>
        row.id === id ? { ...row, description: newDescription } : row
      );
      setRows(updatedRows);
      Swal.fire('Success', 'Description updated successfully!', 'success');
    } else {
      Swal.fire('Error', 'Failed to update description', 'error');
    }
  } catch (error) {
    console.error('Error updating description:', error);
    Swal.fire('Error', 'Failed to update description', 'error');
  }
};

const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this task!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Call the API to delete the task
        const response = await deleteData(id);
        if (response.status === 200) {
          // Remove the deleted task from local state (rows)
          const updatedRows = rows.filter((row) => row.id !== id);
          setRows(updatedRows);
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        } else {
          Swal.fire('Error', 'Failed to delete task', 'error');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        Swal.fire('Error', 'Failed to delete task', 'error');
      }
    }
  });
};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell align="right">
                <Button variant="outlined" color="primary" onClick={() => handleEdit(row.id,row.description)}>
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDelete(row.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {rows.length === 0 && <div>No tasks available.</div>}
    </TableContainer>
  );
}
