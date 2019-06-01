import React from 'react';
import _ from 'lodash';
import {userApi, drinkApi} from 'apis';
import Checkbox from '@material-ui/core/Checkbox';
import {AuthConsumer} from 'stores/AuthStore';



// Material
import {
  Paper,                                                                // Backgrounds
  Button,                                                               // Buttons
  Table, TableBody, TableCell, TableHead, TableRow,                     // Tables
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, // Dialogs
} from '@material-ui/core'
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AdminScreen extends React.Component {
  state = {
    allUsers: [],
    allDrinks: [],
    dialogOpen: false,
  }

  componentDidMount() {
    this.refreshData()
  }

  render() {
    return <AuthConsumer>
      {(authData) => this.renderBody(authData)}
    </AuthConsumer>;
  }

  renderBody(authData) {
    const {allUsers, allDrinks} = this.state
    return <div>
      <h3>Admins</h3>
      <Paper>
      {this.renderDialog()}
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
                  onChange={() => {this.handleToggleAdmin(user, authData)}}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    <br/>
    <h3>Dranken</h3>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Drank</TableCell>
            <TableCell>Omschrijving</TableCell>
            <TableCell>Plaatje</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allDrinks.map(drink => (
            <TableRow key={drink.drink}>
              <TableCell>
                {drink.drink}
              </TableCell>
              <TableCell>
                {drink.desc}
              </TableCell>
              <TableCell>
                Upload
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </div>
  }

  handleToggleAdmin = async (user, authData) => {
    if (user.username !== authData.userInfo.username) {
      await userApi.setUserAdmin(user.username, !user.isAdmin)
      this.refreshData()
    } else {
      this.setState({dialogOpen: true});
    }

  }

  renderDialog() {
    return <Dialog
      open={this.state.dialogOpen}
      onClose={this.handleClose}
      TransitionComponent={Transition}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Waarschuwing</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Je kunt niet je eigen adminrechten weghalen. Vraag een collega om dit voor je te doen.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={this.handleClose}>
          Verbergen
        </Button>
      </DialogActions>
    </Dialog>
  }

  handleClose = () => {
    this.setState({dialogOpen: false});
  }

  async refreshData() {
    const users = await userApi.getUsers()
    const drinks = await drinkApi.getDrinks()
    this.setState({
      allUsers: users,
      allDrinks: drinks,
    })
  }

}

export default AdminScreen;
