const Joi = require("joi");
const validateWith = require("../middleware/validation");
const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

const db = require("../models");
const Login = db.login;
const UserProfile = db.userProfile;
const Farmer = db.farmer;
const Coordinator = db.coordinator;
const collectingAgent = db.collectingAgent;
const collectingRegion = db.collectingRegion;

const ROLE = require("../config/roleEnum");
const { date } = require("joi");

router.get("/getUsers/:role/:myid", verifyToken, async (req, res) => {
  const myid = req.params.myid;
  const role = req.params.role;

  const myAccount = await UserProfile.findOne({
    where: {
      loginId: myid,
    },
    attributes: ["id"],
  });
  if (!myAccount) return res.status(400).send({ error: "Data Not found." });

  const coordinator = await Coordinator.findOne({
    where: {
      userProfileId: myAccount.id,
    },
    attributes: ["empId"],
    include: {
      model: collectingRegion,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  });
  if (!coordinator) return res.status(400).send({ error: "Data Not found." });
  let usersList;
  switch (role) {
    case "farmer":
      usersList = await Farmer.findAll({
        where: {
          collectingRegionId: coordinator.collectingRegion.id,
        },
        attributes: ["id"],
        include: {
          model: UserProfile,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: {
            model: Login,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        },
      });
      break;
    case "cagent":
      usersList = await collectingAgent.findAll({
        where: {
          collectingRegionId: coordinator.collectingRegion.id,
        },
        attributes: ["id"],
        include: {
          model: UserProfile,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: {
            model: Login,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        },
      });
  }
  if (!usersList) return res.status(400).send({ error: "No users found." });
  res.status(200).send({
    usersList,
    collectingRegionId: coordinator.collectingRegion.id,
    collectingRegion: coordinator.collectingRegion.name,
  });

  /* Simulate slow N/W
  setTimeout(() => {
    
   }, 2000);
   */
});

router.get("/getMyRegionId/:myLoginId", async (req, res) => {
  const myid = req.params.myLoginId;

  const myAccount = await UserProfile.findOne({
    where: {
      loginId: myid,
    },
    attributes: ["id"],
  });
  if (!myAccount) return res.status(400).send({ error: "Data Not found." });

  const coordinator = await Coordinator.findOne({
    where: {
      userProfileId: myAccount.id,
    },
    attributes: ["empId"],
    include: {
      model: collectingRegion,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  });
  if (!coordinator) return res.status(400).send({ error: "Data Not found." });

  return res.status(200).send({
    region: {
      id: coordinator.collectingRegion.id,
      name: coordinator.collectingRegion.name,
    },
  });
});

module.exports = router;
