import './GroupProvider.scss';
import React, {Component} from 'react';
import _ from 'lodash';
// Material
import {
  FormControl, Select, InputLabel, OutlinedInput,   // Select Lists
  MenuItem, Typography, TextField, Button, Grid
} from '@material-ui/core'

import {groupApi} from 'apis';
import {AuthConsumer} from 'stores/AuthStore';

class GroupProvider extends Component {
  state = {
    selectedGroup: '',
    newGroup: '',
  };

  async componentWillReceiveProps() {
    this.loadData(false);
  }

  componentDidMount() {
    this.loadData(true);
  }

  async loadData(refreshUserGroup) {
    if (refreshUserGroup) {
      const group = await groupApi.getUserGroup();
      this.props.session.setUserGroup(group);
    }

    const allGroups = await groupApi.getGroups();

    this.setState({
      allGroups,

      selectedGroup: '',
      newGroup: '',
    })
  }

  render() {
    const {session} = this.props;
    const {allGroups, selectedGroup, newGroup} = this.state;

    if (session.userInfo.group) {
      return this.props.children;
    } else {
      return <div className="GroupProvider">
        <Typography variant="h4" gutterBottom>Geen groep!</Typography>
        <Typography variant="subtitle2">Je zit nog niet in een groep. Als er al groepen bestaan kun je hier in stappen, maak anders een nieuwe groep aan.</Typography>
        <Grid container spacing={16}>
        <Grid item xs={6}>
          {!_.isEmpty(allGroups) && <>
            <Typography variant="h6" gutterBottom>Kies een groep</Typography>
            <FormControl fullWidth variant="outlined" >
              <InputLabel htmlFor="select-groepen">
                Groep toevoegen
              </InputLabel>
              <Select
                inputProps={{
                  id: 'select-groepen'
                }}
                value={selectedGroup}
                onChange={(val) => this.setState({selectedGroup: val.target.value})}
              >
                {allGroups.map(group => <MenuItem key={group.name} value={group.name}>{group.name}</MenuItem>)}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" fullWidth default onClick={this.handleSelectGroupClick}>Inschrijven</Button>
          </>}
        </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>Maak een nieuwe groep</Typography>
            <FormControl fullWidth variant="outlined" >
              <TextField
                placeholder="Groepsnaam"
                value={newGroup}
                onChange={(val) => this.setState({newGroup: val.target.value})}
                input={<OutlinedInput labelWidth={102} />}
              />
            </FormControl>
            <Button variant="contained" color="primary" fullWidth default onClick={this.handleCreateGroupClick}>Klaar</Button>
          </Grid>
        </Grid>
      </div>
    }
  }

  handleCreateGroupClick = async () => {
    const {newGroup} = this.state
    const {session} = this.props;

    await groupApi.insertGroup(newGroup);
    session.setUserGroup(newGroup);
  }

  handleSelectGroupClick = async () => {
    const {selectedGroup} = this.state;
    const {session} = this.props;

    await groupApi.setUserGroup(selectedGroup);
    session.setUserGroup(selectedGroup);
  }
}

function GroupProviderContainer(props) {
  return <AuthConsumer>{session => <GroupProvider {...props} session={session}/>}</AuthConsumer>
}

export default GroupProviderContainer;

