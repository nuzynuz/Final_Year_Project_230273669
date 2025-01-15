const Joi = require("joi");
const validateWith = require("../middleware/validation");
const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

const db = require("../models");
const UserProfile = db.userProfile;
const VialationReport = db.vialationsReport;

router.post("/", async (req, res) => {
  const data = req.body;

  const profileRow = await UserProfile.findOne({
    where: {
      loginId: data.loginId,
    },
  });

  if (!profileRow) return res.status(400).send({ error: "Unauthorized user" });

  const result = VialationReport.create({
    description: data.description,
    userProfileId: profileRow.id,
  });
  if (!result) return res.status(400).send({ error: "could not save data" });

  return res.status(200).send({ data: "Successfully saved" });
});

module.exports = router;
