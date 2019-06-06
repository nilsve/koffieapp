import React from 'react';
import _ from 'lodash';
import {userApi, drinkApi} from 'apis';
import Checkbox from '@material-ui/core/Checkbox';
import {AuthConsumer} from 'stores/AuthStore';

// Material
import {
  Grid,
  Paper,                                                                                        // Backgrounds
  Button, ButtonBase,                                                                           // Buttons
  Table, TableBody, TableCell, TableHead, TableRow,                                             // Tables
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,                         // Dialogs
  TextField, Typography,                                                                        // Text
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
    const style = {
      margin: 20,
    }
    return <div>
      <Grid container className="container" spacing={40}>
        <Grid item xs={4}>
          <Typography variant="h5" gutterBottom>Admins</Typography>
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
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5" gutterBottom>Dranken</Typography>
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
                  <TableRow>
                    <TableCell>
                      <TextField
                        value={drink.drink}
                        onChange={(e) => this.handleDrinkNameChange(drink, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={drink.desc}
                        onChange={(e) => this.handleDrinkDescChange(drink, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      Upload
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              
            </Table>
            <Button style={style} variant="contained" onClick={this.handleChange}>
                Submit
              </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  }

  handleDrinkNameChange = (_drink, newName) => {
    const newDrinks = this.state.allDrinks.map(drink => {
      if (drink.drink === _drink.drink) {
        return {
          ...drink,
          drink: newName,
        }
      } else {
        return drink;
      }
    });

    this.setState({
      allDrinks: newDrinks,
    })
  }

  handleDrinkDescChange = (_drink, newName) => {
    const newDrinks = this.state.allDrinks.map(drink => {
      if (drink.drink === _drink.drink) {
        return {
          ...drink,
          desc: newName,
        }
      } else {
        return drink;
      }
    });

    this.setState({
      allDrinks: newDrinks,
    })
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

  handleChange = async () => {
    // await drinkApi.updateDrink();
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
