const _ = require('lodash');
const admin = require('firebase-admin');

const firebase = admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

module.exports.getAllUsers = async (req, res) => {
  const { users } = await firebase.auth().listUsers();
  let results = users.map(u => ({
    id: u.uid,
    displayName: u.displayName || '',
    email: u.email,
    enabled: !u.disabled,
  }));

  results = _.sortBy(results, 'displayName');

  res.send({ data: results });
};

module.exports.getUserById = async (req, res) => {
  let id = req.params.id;
  const u = await firebase.auth().getUser(id);
  res.send({
    id: u.uid,
    displayName: u.displayName || '',
    email: u.email,
    enabled: !u.disabled,
  });
};

module.exports.deleteUserById = async (req, res) => {
  let id = req.params.id;
  await firebase.auth().deleteUser(id);
  res.send({
    id
  });
};

module.exports.deleteUsersByIds = async (req, res) => {
  const data = req.body;
  const deletedIds = [];
  for (let id of data) {
    await firebase.auth().deleteUser(id);
    deletedIds.push(id);
  }
  res.send({
    ids: deletedIds
  });
};

module.exports.saveUser = async (req, res) => {
  let { email, password, displayName } = req.body;

  const firebaseUser = await firebase.auth().createUser({
    email,
    password,
    displayName
  });

  res.send({
    id: firebaseUser.uid,
    displayName,
    email: firebaseUser.email,
    enabled: !firebaseUser.disabled
  });
};

module.exports.updateUser = async (req, res) => {
  let id = req.params.id;
  // Create UserRecord
  let { displayName, email } = req.body;
  const userRecord = await firebase.auth().updateUser(id, {
    email,
    displayName
  });
  res.send({
    id: id,
    email: userRecord.email,
    enabled: userRecord.disabled
  });
};
