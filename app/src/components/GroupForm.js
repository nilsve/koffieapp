import './GroupForm.scss';
import React from 'react';
import _ from 'lodash';
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
    username: '',
    allUsers: {},
    allGroups: {},
    membersToAdd: [],
    currentGroupname: '',
    members: [],
    membersToRemove: [],
    newGroupname: '',
    userToAdd: '',
    userToRemove: '',
    group: null,
  }

  componentDidMount() {
    this.refreshData()
  }

  render() {
    const {
      allGroups,
      members,
      currentGroupname,
      group,
    } = this.state

    return <div className="GroupForm">
      <Grid container className="container" spacing={40}>
        <Grid item xs={3}>
          <Typography variant="h5" gutterBottom>Groepen</Typography>
          {group ? this.renderInGroup() : this.renderNotInGroup()}
        </Grid>
        <Grid item xs={3}>
          {!!currentGroupname && <Typography variant="h5" gutterBottom>{currentGroupname}</Typography>}
          {!_.isEmpty(members) &&
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
          {allGroups.length > 0 && <Typography variant="h5" gutterBottom>Alle groepen</Typography>}
          {allGroups.length > 0 && <Paper>
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

  renderNotInGroup() {
    const {newGroupname} = this.state;
    return <Grid item xs={12}>
      <TextField
        style={{width: 180}}
        variant="outlined"
        label="Naam"
        onChange={this.handleUpdateField('newGroupname')}>
        {newGroupname}
      </TextField>
      <Button fullWidth onClick={this.insertGroup}>
        Aanmaken
    </Button>
    </Grid>;
  }

  renderInGroup() {
    const {membersToAdd, membersToRemove, userToAdd, userToRemove, members} = this.state;
    return <Grid item xs={12}>
      {!_.isEmpty(membersToAdd) &&
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
              {membersToAdd.map(userName => <MenuItem value={userName}>{userName}</MenuItem>)}
            </Select>
          </FormControl>
          <Button fullWidth onClick={this.addMember}>
            Toevoegen
</Button>
        </Grid>
      }
      {membersToRemove !== undefined && membersToRemove.length > 0 &&
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
          <Button fullWidth onClick={this.removeMember}>
            Verwijderen
</Button>
        </Grid>
      }
      {members.length > 0 &&
        <Button fullWidth onClick={this.removeGroup}>
          Groep verwijderen
</Button>
      }
    </Grid>;
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

  removeMember = async (e) => {
    e.preventDefault()
    const {currentGroupname, userToRemove} = this.state

    try {
      await groupApi.removeMember(currentGroupname, userToRemove)
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

      const {members, creator} = group;

      if (group) {
        this.setState({
          members,
          group,
          currentGroupname: group.name,
          membersToRemove: _.without(members, creator),
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
}

export default GroupForm;
