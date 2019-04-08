import express from 'express';

const router = express.Router()

// Get all groups
router.get('/', async (req, res) => {
  const groups = await res.locals.db.groupsCollection.getAllGroups();
  return res.json(groups)
})

// Get user's group
router.get('/user-group', async (req, res) => {
  const {userInfo} = res.locals;
  const result = await res.locals.db.groupsCollection.findUserGroup(userInfo.username);
  return res.json(result);
})

// Set user to group
router.post('/user-group', async (req, res) => {
  const userinfo = res.locals.userInfo;

  await res.locals.db.groupsCollection.addMember(userinfo.username, req.body.groupName);

  return res.json({});
})

// Make new group
router.post('/', async (req, res) => {
  const {username} = res.locals.userInfo;
  
  await res.locals.db.groupsCollection.createGroup(req.body.groupName, username);
  return res.json({})
})

// Remove user from group
router.delete('/member', async (req, res) => {
  const {username} = req.body;
  
  await res.locals.db.groupsCollection.removeMember(username, req.body.groupName);
  return res.json({});
})

// Delete group
router.delete('/', async (req, res) => {
  await res.locals.db.groupsCollection.removeGroup(req.body.groupName);
  return res.json({})
})

module.exports = router
