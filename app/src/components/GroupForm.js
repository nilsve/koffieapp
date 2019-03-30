import React from 'react';
import {AuthConsumer} from 'stores/AuthStore';

import {groupApi, userApi} from 'apis';

class GroupForm extends React.Component {

  state = {
    username: '',
    allUsers: [],
    allGroups: [],
    userGroups: [],
    newGroupname: '',
    currentGroupname: '',
    newUser: '',
    status: 'notInGroup', // inGroup/notInGroup
  }

  async componentDidMount() {
    this.refreshTables()
  }

  render() {
    return <AuthConsumer>
      {(authData) => this.renderBody(authData)}
    </AuthConsumer>;
  }

  renderBody(authData) {
    const {allGroups, allUsers, userGroups, newGroupname, currentGroupname, status} = this.state
    let formContent
    let ableToRender

    if (userGroups === undefined) ableToRender = true

    if (status === 'notInGroup') {
      formContent = <div>
        <h3>Nieuwe groep maken</h3>
          <input type="text" placeholder="Groepsnaam" value={newGroupname} onChange={this.handleUpdateField('newGroupname')} />
          <input type="submit" value="Aanmaken" onClick={(e) => this.handleGroupRegistration(e, authData)}/>
        </div>
    } else {
      formContent = <div>
        <h3>{ableToRender && 'Je zit in groep: ' + currentGroupname}</h3>
          <select className="newUser" onChange={this.handleUpdateField('newUser')}>
            {allUsers.map((user) => <option key={user._id}>{user.username}</option>)}
          </select>
          <input type="submit" value="Toevoegen" onClick={(e) => this.addUser(e, authData)}/>
        </div>
    }


    return <div className="GroupForm">
      <form className="GroupForm_form">
      <h2>Groepen</h2>
      {formContent}
      </form>
      <h3>Groepsleden</h3>
      <div className="UserGroupsTable">
        <table>
          <thead>
            <tr>
              <th><b>Leden</b></th>
            </tr>
          </thead>
          <tbody>
            {userGroups.map((group) => <tr><td>{group.members}</td></tr>)}
          </tbody>
        </table>
      </div>
      <div>
       <h3>Alle groepen</h3>
        <table className="AllGroupsTable">
          <thead>
            <tr>
              <th><b>Groep</b></th>
              <th><b>Leden</b></th>
            </tr>
          </thead>
          <tbody>
            {allGroups.map((group) => <tr><td>{group.name}</td><td>{group.members.join(', ')}</td></tr>)}
          </tbody>
        </table>
       </div>
    </div>;
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
    // const userGroupsResult  = await groupApi.getUserGroup()
    const allGroupsResult   = await groupApi.getGroups()
    const allUserResult     = await userApi.getUsers()

    // console.log('userGroupsResult: ', userGroupsResult)

    this.setState({
      // userGroups      : userGroupsResult,
      // currentGroupname: userGroupsResult[0].name,
      allGroups       : allGroupsResult,
      allUsers        : allUserResult,
    })

    // if (userGroupsResult.length > 0) this.setState({ status: 'inGroup'})
  	// else this.setState({ status: 'notInGroup' })
  }

  handleUpdateField = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value,
    });
  }
}

export default GroupForm;
