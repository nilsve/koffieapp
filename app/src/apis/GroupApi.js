import BaseApi from './BaseApi';

export default class GroupApi extends BaseApi {
  constructor() {
    super('groups')
  }

  getGroups() {
    return this.getJson('')
  }

  getUserGroup() {
    return this.getJson('user-group')
  }

  setUserGroup(groupName) {
    return this.postJson('user-group', {groupName})
  }

  insertGroup(groupName) {
    return this.postJson('', {groupName})
  }

  removeGroup(groupName) {
    console.log('GroupApi Removing Group: ', groupName)
    return this.deleteJson('', {groupName});
  }

  addMember(groupName, userName) {
    return this.putJson('add-user', {groupName, userName})
  }

  removeMember(username) {
    console.log('GroupApi Removing User: ', username)
    return this.deleteJson('member', {username})
  }

  setLeader(newLeader) {
    console.log("Setting new leader to: ", newLeader)
    return this.postJson('new-leader', {newLeader})
  }
}
