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
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, // Dialogs
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
    const {session} = this.props;
    const {members, group, currentGroupname} = this.state;
    let isCreator
    let isNotCreator

    if (!_.isEmpty(group)) {
      isCreator = group.creator === session.userInfo.username
      isNotCreator = group.creator !== session.userInfo.username
    }

    const grid = {
      minWidth: '700px',
      direction: 'row',
      alignItems: 'flex-start',
    }
    const button = {
      margin: '10px 0px 10px 0px',
    }

    return <div>
      <Grid container spacing={40} style={grid}>
        {!_.isEmpty(members) &&
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
                          {member === group.creator ? member + ' (Leider)' : member }
                        </TableCell>
                        {!_.isEmpty(group) && isCreator &&
                          <TableCell align="right">
                            {!_.isEmpty(group) && isCreator && member !== session.userInfo.username &&
                              <IconButton onClick={() => this.removeMember(member)}>
                                <DeleteIcon fontSize="small" />
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
                  {isCreator &&
                    <Button fullWidth color="secondary" style={button} onClick={this.removeGroup}>
                      Groep verwijderen
                      </Button>
                  }
                  {members.length > 1 && session.userInfo.username === group.creator && <>
                    <Button fullWidth color="secondary" style={button} onClick={this.handleClickOpen}>
                      Uit {currentGroupname} stappen
                    </Button>
                    {this.renderDialog(session)}
                  </>
                  }
                  {isNotCreator &&
                    <Button fullWidth color="secondary" style={button} onClick={() => this.removeMember(session.userInfo.username)}>
                      Uit {currentGroupname} stappen
                    </Button>
                  }
            </Grid>
          </>
        }
      </Grid>
    </div>
  }

  renderDialog(session) {
    const {members, currentGroupname, newLeader} = this.state;

    return <Dialog
      open={this.state.dialogOpen}
      onClose={this.handleClose}
      TransitionComponent={Transition}
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
            {_.without(members, session.userInfo.username).map((user) => <MenuItem value={user}>{user}</MenuItem>)}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={this.handleClose}>
          Annuleer
      </Button>
        <Button color="secondary" onClick={(e) => this.removeLeader(e)}>
          Stap uit {currentGroupname}
        </Button>
      </DialogActions>
    </Dialog>
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

      this.props.session.setUserGroup(null);
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
    const {session} = this.props;

    if (this.state.members.length === 1) {
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

    if (session.userInfo.username === member) {
      session.setUserGroup(null);
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
    this.setState({dialogOpen: true});
  }

  handleClose = () => {
    this.setState({dialogOpen: false});
  }
}

function GroupFormContainer(props) {
  return <AuthConsumer>{session => <GroupForm {...props} session={session}/>}</AuthConsumer>
}

export default GroupFormContainer;
