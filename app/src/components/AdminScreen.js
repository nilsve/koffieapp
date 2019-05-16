import React from 'react';
import _ from 'lodash';
import {userApi} from 'apis';
import Checkbox from '@material-ui/core/Checkbox';


// Material
import {
  Paper, Grid,                                                          // Backgrounds
  Button,                                                               // Buttons
  FormControl, Select, InputLabel, OutlinedInput, MenuItem,             // Select Lists
  Table, TableBody, TableCell, TableHead, TableRow,                     // Tables
  Typography,                                                           // Text
  IconButton,                                                           // icons
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, // Dialogs
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AdminScreen extends React.Component {
  state = {
    allUsers: [],
  }

  componentDidMount() {
    this.refreshData()
  }

  render() {
    const {allUsers} = this.state;
    console.log(allUsers)
    return <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Gebruiker</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allUsers.map(user => (
          <TableRow key={user.username}>
            <TableCell>
              {user.username}
            </TableCell>
            <TableCell>
              <Checkbox
                checked={user.isAdmin}
                onChange={() => {this.handleToggleAdmin(user)}}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </Paper>
  }

  handleToggleAdmin = (user) => {
    
  }

  async refreshData() {
    const users = await userApi.getUsers()
    this.setState({
      allUsers: users
    })
  }

}

export default AdminScreen;
