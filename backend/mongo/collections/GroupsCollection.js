import CollectionBase from "./CollectionBase";

export default class GroupsCollection extends CollectionBase {
  getAllGroups() {
    return this.collection.find({}).toArray();
  }

  findUserGroup(username) {
    return this.collection.findOne({
      members: username,
    });
  }

  addMember(username, groupName) {
    return this.collection.updateOne(
      {_id: groupName},
      {$addToSet: {members: username}}
    );
  }

  removeMember(username, groupName) {
    console.log('GroupsCollection Username: ', username)
    return this.collection.updateOne(
      { _id: groupName },
      { $pull: { members: username } }
    )
  }

  createGroup(groupName, username) {
    return this.collection.insertOne({
      _id: groupName,
      name: groupName,
      creator: username,
      members: [username],
    });
  }

  removeGroup(groupName) {
    console.log('GroupsCollection GroupName: ', groupName)
    return this.collection.deleteOne({ _id: groupName })
  }

  setLeader(newLeader, username) {
    console.log('GroupsCollection newLeader: ', newLeader)
    return this.collection.updateOne(
      { creator: username},
      { $set : {creator : newLeader} }
    )
  }
}
