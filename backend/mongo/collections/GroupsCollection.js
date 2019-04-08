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

  deleteGroup(groupName) {
    return this.collection.deleteOne({ _id: groupName })
  }
}
