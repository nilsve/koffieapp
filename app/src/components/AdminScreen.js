import React from 'react';
import {userApi, drinkApi} from 'apis';
import Checkbox from '@material-ui/core/Checkbox';
import {AuthConsumer} from 'stores/AuthStore';

// Material
import {
  Grid,
  Paper,                                                                                        // Backgrounds
  Button,                                                                                       // Buttons
  Table, TableBody, TableCell, TableHead, TableRow,                                             // Tables
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,                         // Dialogs
  IconButton,                                                                                   // icons
  TextField, Typography,                                                                        // Text
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AdminScreen extends React.Component {
  state = {
    allUsers: [],
    allDrinks: [],
    dialogOpen: false,
    dialogAddOpen: false,
    dialogEditOpen: false,
    editDrink: '',
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
            {this.renderDialogAdd()}
            {this.renderDialogEdit()}
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
                  <TableCell>Verwijderen</TableCell>
                  <TableCell>
                    <IconButton onClick={() => this.setState({dialogAddOpen: true})}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allDrinks.map(drink => (
                  <TableRow>
                    <TableCell>
                      {drink.drink}
                    </TableCell>
                    <TableCell>
                      {drink.desc}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => this.handleRemoveDrink(drink)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => this.openEdit(drink)}>
                        <BuildIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button style={style} variant="contained" onClick={this.handleUpdateDrinks}>
              Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>
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

  renderDialogAdd() {
    return <Dialog
      open={this.state.dialogAddOpen}
      onClose={this.handleClose}
      TransitionComponent={Transition}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Drank toevoegen</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Voer onderstaande velden in om een drank toe te voegen
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="drink"
          label="Naam van drank"
          fullWidth
        />
        <TextField
          margin="dense"
          id="desc"
          label="Omschrijving van drank"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => this.handleAddDrink(document.getElementById('drink').value, document.getElementById('desc').value)}>
          Toevoegen
        </Button>
        <Button color="primary" onClick={this.handleClose}>
          Annuleren
        </Button>
      </DialogActions>
    </Dialog>
  }

  openEdit(drink) {
    this.setState({
      dialogEditOpen: true,
      editDrink: drink,
    })
  }

  renderDialogEdit() {
    const drink = this.state.editDrink

    return <Dialog
      open={this.state.dialogEditOpen}
      onClose={this.handleClose}
      TransitionComponent={Transition}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Omschrijving aanpassen</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="newDesc"
          value={drink.desc}
          onChange={() => this.handleEditDrinkTemp(document.getElementById('newDesc').value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => this.handleEditDrink()}>
          Aanpassen
        </Button>
        <Button color="primary" onClick={this.handleClose}>
          Annuleren
        </Button>
      </DialogActions>
    </Dialog>
  }

  handleClose = () => {
    this.setState({
      dialogOpen: false,
      dialogAddOpen: false,
      dialogEditOpen: false,
    });
    this.refreshData()
  }

  handleEditDrinkTemp(newDesc) {
    const drink = this.state.editDrink
    drink.desc = newDesc
    this.setState({
      editDrink: drink
    })
  }

  handleEditDrink() {
    const drink = this.state.editDrink
    this.handleUpdateDrink(drink)
    this.handleClose()
  }

  handleAddDrink = async (drink, desc) => {
    await drinkApi.addDrink(drink, desc)
    this.refreshData()
    this.handleClose()
  }

  handleUpdateDrink = async (drink) => {
    await drinkApi.updateDrink(drink);
    this.refreshData()
  }

  handleRemoveDrink = async (drink) => {
    await drinkApi.removeDrink(drink.drink)
    this.refreshData()
    this.handleClose()
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
