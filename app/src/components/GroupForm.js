import './GroupForm.scss';
import React from 'react';
import {AuthConsumer} from 'stores/AuthStore';
import {groupApi, userApi} from 'apis';

// Material
import {
  Paper, Grid,                                                // Backgrounds
  Button, IconButton , TextField,                             // Buttons
  FormControl, Select, InputLabel, OutlinedInput, MenuItem,   // Select Lists
  Table, TableBody, TableCell, TableHead, TableRow,           // Tables
  Typography
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

class GroupForm extends React.Component {
  state = {
    username: '',
    allUsers: [],
    allGroups: [],
    currentGroup: [],
    newGroupname: '',
    currentGroupname: '',
    newUser: '',
    status: 'notInGroup', // inGroup/notInGroup
  }

  componentDidMount() {
    this.refreshTables()
  }

  render() {
    return <AuthConsumer>
      {(authData) => this.renderBody(authData)}
    </AuthConsumer>;
  }

  renderBody(authData) {
    const {allGroups, allUsers, currentGroup, newGroupname, currentGroupname, status} = this.state
    let formContent

    if (status === 'notInGroup') {
      formContent = <div>
          <TextField
            style={{ width: 180}}
            variant="outlined"
            label="Naam"
            onChange={this.handleUpdateField('newGroupname')}
            >
            {newGroupname}
          </TextField>
          <IconButton justify="right" onClick={(e) => this.handleGroupRegistration(e, authData)}>
            <AddIcon/>
          </IconButton>
      </div>
    } else {
      formContent = <div>
            <FormControl variant="outlined">
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
            >
            &nbsp;Gebruikers
            </InputLabel>
            <Select
              style={{ width: 180}}
              value={this.state.newUser}
              onChange={this.handleUpdateField('newUser')}
              input={
                <OutlinedInput
                  labelWidth={90}
                />
              }
            >
              {allUsers.map((user) => <MenuItem value={user._id}>{user.username}</MenuItem>)}
            </Select>
          </FormControl>
          <IconButton onClick={(e) => this.addUser(e, authData)}>
              <AddIcon/>
          </IconButton>
      </div>
    }

    console.log('allGroups.members: ', allGroups)

    return <div className="GroupForm">
        <Grid container className="container" spacing={40}>
          <Grid item xs={4}>
            <Typography variant="h5" gutterBottom>Groepen</Typography>
            <Paper className="PaperForm" elevation={2}>
              {formContent}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            { currentGroupname != undefined && <Typography variant="h5" gutterBottom>{currentGroupname}</Typography>}
            { currentGroup.members != undefined &&
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Leden</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentGroup.members.map(member => (
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
            <Grid item xs={5}>
            { allGroups.length > 0 && <Typography variant="h5" gutterBottom>Alle groepen</Typography>}
            { allGroups.length > 0 && <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Groep</TableCell>
                    <TableCell align="right">Leden</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allGroups.map(group => (
                    <TableRow group={group._id}>
                      <TableCell component="th" scope="row">
                        {group.name}
                      </TableCell>
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

  handleGroupRegistration = async (e, authData) => {
    e.preventDefault()
    const {newGroupname} = this.state

    try {
      await groupApi.insertGroup(newGroupname, authData.userInfo.username)

      this.refreshTables(authData)
    } catch (error) {
      console.log(error)
    }
  }

  addUser = async (e, authData) => {
    e.preventDefault()
    const {currentGroupname, newUser} = this.state

    try {
      await groupApi.addUser(currentGroupname, newUser)

      this.refreshTables(authData)
    } catch (error) {
      console.log(error)
    }
  }

  refreshTables = async () => {
    try {
      const currentGroupResult  = await groupApi.getUserGroup()
      const allGroupsResult     = await groupApi.getGroups()
      const allUserResult       = await userApi.getUsers()

      console.log('refreshTables: ', currentGroupResult)

      this.setState({
        currentGroup    : currentGroupResult[0],
        currentGroupname: currentGroupResult[0].name,
        allGroups       : allGroupsResult,
        allUsers        : allUserResult,
      })

      if (currentGroupResult.length > 0) this.setState({ status: 'inGroup'})
      else this.setState({ status: 'notInGroup' })
    } catch (error) {
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
