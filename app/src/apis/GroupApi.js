import BaseApi from './BaseApi';

export default class GroupApi extends BaseApi {
  constructor() {
    super('groups')
  }

  getGroups() {
    return this.getJson('')
  }

  getUserGroup() {
    return this.getJson('userGroups')
  }

  insertGroup(groupName, userId) {
    return this.postJson(
      '',
      {
        _id     : groupName,
        name    : groupName,
        creator : userId,
        members : [
          userId
        ]
      }
    )
  }

  addUser(groupId, userId) {
    return this.putJson(
      '',
      { _id: groupId, newMember: userId }
    )
  }
}
