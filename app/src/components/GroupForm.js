import './GroupForm.scss';
import React from 'react';
import _ from 'lodash';
import {AuthConsumer} from 'stores/AuthStore';
import {groupApi, userApi} from 'apis';

// Material
import {
  Paper, Grid,                                                          // Backgrounds
  Button,                                                               // Buttons
  FormControl, Select, InputLabel, OutlinedInput, MenuItem,             // Select Lists
  Table, TableBody, TableCell, TableHead, TableRow,                     // Tables
  Typography,                                                           // Text
  IconButton,                                                           // icons
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions  // Dialogs
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

class GroupForm extends React.Component {
  state = {
    username: '',
    allUsers: {},
    allGroups: {},
    membersToAdd: [],
    currentGroupname: '',
    members: [],
    group: {},
    newGroupname: '',
    userToAdd: '',
    newLeader: '',
    dialogOpen: false,
  }

  componentDidMount() {
    this.refreshData()
  }

  render() {
    return <AuthConsumer>
      {(authData) => this.renderInGroup(authData)}
    </AuthConsumer>
  }

  renderInGroup(authData) {
    const {members, group, currentGroupname, newLeader} = this.state;
    let isCreator
    let isNotCreator

    if (!_.isEmpty(group)) {
      isCreator = group.creator === authData.userInfo.username
      isNotCreator =  group.creator !== authData.userInfo.username
    }

    return <div className="GroupForm">
      <Grid container spacing={16}>
        { !_.isEmpty(members) &&
          <>
            <Grid item xs={8}>
              <Typography variant="h5" gutterBottom>{currentGroupname}</Typography>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Lid</TableCell>
                      {!_.isEmpty(group) && isCreator &&
                        <TableCell align="right">Verwijderen</TableCell>
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {members.map(member => (
                      <TableRow group={member} key={member}>
                        <TableCell>
                          {member}
                        </TableCell>
                        {!_.isEmpty(group) && isCreator &&
                          <TableCell align="right">
                            {!_.isEmpty(group) && isCreator && member !== authData.userInfo.username &&
                              <IconButton onClick={() => this.removeMember(member)}>
                                <DeleteIcon fontSize="small"/>
                              </IconButton>
                            }
                          </TableCell>
                        }
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>Acties</Typography>
              { isCreator &&
                  <Button fullWidth onClick={this.removeGroup}>
                    Groep verwijderen
                  </Button>
              }
              { members.length > 1 && authData.userInfo.username === group.creator && <>
                <Button fullWidth onClick={this.handleClickOpen}>
                  Uit {currentGroupname} stappen
                </Button>
                <Dialog
                  open={this.state.dialogOpen}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Uit de groep stappen</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Als je als leider uit de groep stapt, dien je een nieuwe leider aan te wijzen.
                  </DialogContentText>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                      >
                      Nieuwe leider
                      </InputLabel>
                      <Select
                        value={newLeader}
                        onChange={this.handleUpdateField('newLeader')}
                        input={
                          <OutlinedInput
                            labelWidth={108}
                          />
                        }
                      >
                      {_.without(members, authData.userInfo.username).map((user) => <MenuItem value={user}>{user}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Annuleer
                  </Button>
                    <Button onClick={(e) => this.removeLeader(e)} color="primary">
                      Stap uit {currentGroupname}
                  </Button>
                  </DialogActions>
                </Dialog>
              </>
            }
              { isNotCreator &&
                <Button fullWidth onClick={() => this.removeMember(authData.userInfo.username)}>
                  Uit {currentGroupname} stappen
                </Button>
              }
            </Grid>
          </>
        }
      </Grid>
    </div>
  }

  insertGroup = async (e) => {
    e.preventDefault()
    const {newGroupname} = this.state

    try {
      await groupApi.insertGroup(newGroupname)
      this.refreshData()
    } catch (error) {
      // TODO: Error dialog?
      console.log(error)
    }
  }

  removeGroup = async (e) => {
    e.preventDefault()
    const {currentGroupname} = this.state

    try {
      await groupApi.removeGroup(currentGroupname)
      this.refreshData()
      this.setState({
        group: null,
        members: null,
        currentGroupname: ''
      })
    } catch (error) {
      // TODO: Error dialog?
      console.log(error)
    }
  }

  addMember = async (e) => {
    e.preventDefault()
    const {currentGroupname, userToAdd} = this.state

    try {
      await groupApi.addMember(currentGroupname, userToAdd)
      this.refreshData()
    } catch (error) {
      // TODO: Error dialog?
      console.log(error)
    }
  }

  removeMember = async (member) => {
    if (this.state.members.length === 1){
      await groupApi.removeGroup(this.state.currentGroupname)
      this.setState({
        group: null,
        members: null,
        currentGroupname: ''
      })
    } else {
      try {
        await groupApi.removeMember(member)
        this.refreshData()
        this.setState({
          members: null,
        })
      } catch (error) {
        // TODO: Error dialog?
        console.log(error)
      }
    }
  }

  removeLeader = async (e) => {
    e.preventDefault()
    const {newLeader, group} = this.state

    try {
      await groupApi.setLeader(newLeader)
      await this.removeMember(group.creator)
      this.refreshData()
    } catch (error) {
      // TODO: Error dialog?
      console.log(error)
    }
  }

  refreshData = async () => {
    try {
      // Get all data from API's
      const group = await groupApi.getUserGroup()
      const allGroups = await groupApi.getGroups()
      const allUsers = await userApi.getUsers()
      const userNames = _.map(allUsers, user => user.username);

      if (group) {
        const {members, creator} = group;
        this.setState({
          members,
          group,
          currentGroupname: group.name,
          creator: _.without(members, creator),
          membersToAdd: _.without(userNames, ...members),
        })
      }

      this.setState({
        allUsers,
        allGroups,
      })

    } catch (error) {
      // Something went wrong getting API data or setting it, make arrays empty
      // TODO: Error dialog?
      this.setState({
        allUsers: [],
        allGroups: [],
        currentGroupname: [],
      })
      console.log(error)
    }
  }

  handleUpdateField = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value,
    });
  }

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  }

  handleClose = () => {
    this.setState({ dialogOpen: false });
  }
}

export default GroupForm;
