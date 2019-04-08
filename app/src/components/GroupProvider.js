import './GroupProvider.scss';
import React, {Component} from 'react';
import _ from 'lodash';
// Material
import {
  FormControl, Select, InputLabel, OutlinedInput,   // Select Lists
  MenuItem, Typography, TextField, Button
} from '@material-ui/core'

import {groupApi} from 'apis';

class GroupProvider extends Component {
  state = {
    group: null,
    allGroups: [],
    selectedGroup: '',
    newGroup: '',
  };

  async componentDidMount() {
    const group = await groupApi.getUserGroup();
    const allGroups = await groupApi.getGroups();

    this.setState({
      group,
      allGroups,
    })
  }

  render() {
    const {group, allGroups, selectedGroup, newGroup} = this.state;
    if (group) {
      return this.props.children;
    } else {
      return <div className="GroupProvider">
        {!_.isEmpty(allGroups) && <>
          <Typography variant="h5" gutterBottom>Kies een groep</Typography>
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

        <Typography variant="h5" gutterBottom>Of maak een nieuwe groep</Typography>
        <FormControl fullWidth variant="outlined" >
          <TextField
            placeholder="Groepsnaam"
            value={newGroup}
            onChange={(val) => this.setState({newGroup: val.target.value})}
            input={<OutlinedInput labelWidth={102} />}
          />
        </FormControl>
        <Button variant="contained" color="primary" fullWidth default onClick={this.handleCreateGroupClick}>Klaar</Button>
      </div>
    }
  }

  handleCreateGroupClick = async () => {
    const {newGroup} = this.state

    await groupApi.insertGroup(newGroup);

    this.setState({
      group: {},
    });
    
  }

  handleSelectGroupClick = async () => {
    const {selectedGroup} = this.state;

    await groupApi.setUserGroup(selectedGroup);

    this.setState({
      group: {},
    });
  }
}

export default GroupProvider;
