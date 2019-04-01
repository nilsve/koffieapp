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

  insertGroup(groupId, userId) {
    return this.postJson(
      '',
      { _id: groupId, member: userId}
    )
  }

  addMember(groupId, userId) {
    return this.putJson(
      'add-user',
      { _id: groupId, member: userId }
    )
  }

  removeMember(groupId, userId) {
    return this.putJson(
      'remove-user',
      { _id: groupId, member: userId }
    )
  }
}
