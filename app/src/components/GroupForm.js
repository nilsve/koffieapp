import './GroupForm.scss';
import React from 'react';
import {AuthConsumer} from 'stores/AuthStore';
import {groupApi, userApi} from 'apis';

// Material
import {
  Paper, Grid,                                                // Backgrounds
  Button, TextField,                                          // Buttons
  FormControl, Select, InputLabel, OutlinedInput, MenuItem,   // Select Lists
  Table, TableBody, TableCell, TableHead, TableRow,           // Tables
  Typography                                                  // Text
} from '@material-ui/core'

class GroupForm extends React.Component {
  state = {
    username        : '',
    allUsers        : {},
    group           : {},
    allGroups       : {},
    membersToAdd    : [],
    currentGroup    : [],
    currentGroupname: '',
    members         : [],
    membersToRemove : [],
    newGroupname    : '',
    userToAdd       : '',
    userToRemove    : '',
    status          : 'notInGroup', // inGroup/notInGroup
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
    const {
      allGroups,
      membersToAdd,
      members,
      membersToRemove,
      newGroupname,
      currentGroupname,
      userToAdd,
      userToRemove,
      status,
    } = this.state
    let formContent

    // Determining which screen to put out based on status state variable (inGroup/notInGroup)
    if (status === 'notInGroup') {
      formContent = <Grid item xs={12}>
          <TextField
            style={{ width: 180}}
            variant="outlined"
            label="Naam"
            onChange={this.handleUpdateField('newGroupname')}
            >
            {newGroupname}
          </TextField>
        <Button fullWidth onClick={(e) => this.insertGroup(e, authData)}>
        Aanmaken
        </Button>
      </Grid>
    } else {
      formContent = <Grid item xs={12}>
        { membersToAdd !== undefined && membersToAdd.length > 0 &&
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" >
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
            >
            Lid toevoegen
            </InputLabel>
            <Select
              value={userToAdd}
              onChange={this.handleUpdateField('userToAdd')}
              input={
                <OutlinedInput
                  labelWidth={102}
                />
              }
            >
            {membersToAdd.map((user) => <MenuItem value={user._id}>{user.username}</MenuItem>)}
            </Select>
          </FormControl>
          <Button fullWidth onClick={(e) => this.addMember(e, authData)}>
          Toevoegen
          </Button>
        </Grid>
        }
        { membersToRemove !== undefined && membersToRemove.length > 0 &&
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
              >
              Lid verwijderen
              </InputLabel>
              <Select
                value={userToRemove}
                onChange={this.handleUpdateField('userToRemove')}
                input={
                  <OutlinedInput
                    labelWidth={108}
                  />
                }
              >
              {membersToRemove.map((user) => <MenuItem value={user}>{user}</MenuItem>)}
              </Select>
            </FormControl>
            <Button fullWidth onClick={(e) => this.removeMember(e, authData)}>
            Verwijderen
            </Button>
          </Grid>
        }
        {members.length > 0 &&
        <Button fullWidth onClick={(e) => this.removeGroup(e, authData)}>
        Groep verwijderen
        </Button>
        }
      </Grid>
    }

    return <div className="GroupForm">
        <Grid container className="container" spacing={40}>
          <Grid item xs={3}>
            <Typography variant="h5" gutterBottom>Groepen</Typography>
              {formContent}
          </Grid>
          <Grid item xs={3}>
            { currentGroupname !== undefined && <Typography variant="h5" gutterBottom>{currentGroupname}</Typography>}
            { members !== undefined && members.length > 0 &&
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Leden</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members.map(member => (
                    <TableRow group={member}>
                      <TableCell component="th" scope="row">
                        {member}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            }
            </Grid>
            <Grid item xs={6}>
            { allGroups.length > 0 && <Typography variant="h5" gutterBottom>Alle groepen</Typography>}
            { allGroups.length > 0 && <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Groep</TableCell>
                    <TableCell>Oprichter</TableCell>
                    <TableCell align="right">Leden</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(allGroups).map(group => (
                    <TableRow group={group._id}>
                      <TableCell component="th" scope="row">
                        {group.name}
                      </TableCell>
                      <TableCell align="right">{group.creator}</TableCell>
                      <TableCell align="right">{group.members.join(', ')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>}
          </Grid>
        </Grid>
      </div>
  }

  insertGroup = async (e, authData) => {
    e.preventDefault()
    const {newGroupname} = this.state

    try {
      await groupApi.insertGroup(newGroupname, authData.userInfo.username)
      this.refreshData(authData)
    } catch (error) {
      // TODO: Error dialog?
      console.log(error)
    }
  }

  removeGroup = async (e, authData) => {
    e.preventDefault()
    const {currentGroupname} = this.state

    try {
      await groupApi.removeGroup(currentGroupname)
      this.refreshData(authData)
      this.setState({
        status: 'notInGroup',
      })
    } catch (error) {
      // TODO: Error dialog?
      console.log(error)
    }
  }

  addMember = async (e, authData) => {
    e.preventDefault()
    const {currentGroupname, userToAdd} = this.state

    try {
      await groupApi.addMember(currentGroupname, userToAdd)
      this.refreshData(authData)
    } catch (error) {
      // TODO: Error dialog?
      console.log(error)
    }
  }

  removeMember = async (e, authData) => {
    e.preventDefault()
    const {currentGroupname, userToRemove} = this.state

    try {
      await groupApi.removeMember(currentGroupname, userToRemove)
      this.refreshData(authData)
    } catch (error) {
      // TODO: Error dialog?
      console.log(error)
    }
  }

  refreshData = async () => {
    try {
      // Get all data from API's
      const group     = await groupApi.getUserGroup()
      const allGroups = await groupApi.getGroups()
      const allUsers  = await userApi.getUsers()

      // Variables for member data
      let members;
      let membersToRemove;
      let membersToAdd;

      try {
        // Determine member data based on API-data
        members         = group.members
        membersToRemove = [...members]
        // Shift the first member (creator), who cannot be removed from group
        membersToRemove.shift()
        // Filter members out of all user
        membersToAdd    = await allUsers.filter( user => { return members.indexOf(user._id) === -1 })
      } catch {
        // If something went wrong determing member data, make arrays empty
        // TODO: Error dialog?
        this.setState({
          members         : [],
          membersToRemove : [],
          membersToAdd    : [],
        })
      }

      // Set state
      this.setState({
        allUsers        : allUsers,
        membersToAdd    : membersToAdd,
        allGroups       : allGroups,
        currentGroup    : group,
        members         : members,
        membersToRemove : membersToRemove,
        currentGroupname: group.name,
      })

      // Determine which screen to display
      if (Object.values(group).length > 0) this.setState({ status: 'inGroup'})
      else this.setState({ status: 'notInGroup' })

    } catch (error) {
      // Something went wrong getting API data or setting it, make arrays empty
      // TODO: Error dialog?
      this.setState({
        allUsers        : [],
        allGroups       : [],
        currentGroup    : [],
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
}

export default GroupForm;
