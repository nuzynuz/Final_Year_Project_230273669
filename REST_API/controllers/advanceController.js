const Joi = require("joi");
const validateWith = require("../middleware/validation");
const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

const db = require("../models");
const Farmer = db.farmer;
const Advance = db.advance;
const UserProfile = db.userProfile;

const schema = Joi.object({
  reqestedAmount: Joi.number().required().min(1),
  comment: Joi.string().required(),
  loginId: Joi.number().required().min(1),
});

router.get("/", async (req, res) => {
  const result = await Advance.findAll();
  if (!result) return res.status(400).send({ error: "error occured." });
  return res.status(200).send({ data: result });
});

router.get("/:loginId", async (req, res) => {
  const loginId = req.params.loginId;

  const userProfRow = await UserProfile.findOne({
    where: { loginId: loginId },
    attributes: ["id"],
  });
  if (!userProfRow)
    return res.status(400).send({ error: "Farmer's Account Not Found" });

  const farmerRow = await Farmer.findOne({
    where: { userProfileId: userProfRow.id },
    attributes: ["id"],
  });
  if (!farmerRow)
    return res.status(400).send({ error: "Farmer's Account Not Found" });

  const result = await Advance.findAll({
    where: { farmerId: farmerRow.id },
  });
  if (!result) return res.status(400).send({ error: "error occured." });
  return res.status(200).send({ data: result });
});

router.get("/getByRegion/:regionId", async (req, res) => {
  const regionId = req.params.regionId;

  const result = await Advance.findAll({
    include: {
      model: Farmer,
      required: true,
      where: {
        collectingRegionId: regionId,
      },
    },
  });
  // where: {
  //   collectingRegionId: regionId,
  // },

  return res.status(200).send({ data: result });
});

router.post("/", validateWith(schema), async (req, res) => {
  console.log("========== advance request")
  const data = req.body;
  //Find Farmer ID
  const userProfRow = await UserProfile.findOne({
    where: { loginId: data.loginId },
    attributes: ["id"],
  });
  if (!userProfRow)
    return res.status(400).send({ error: "Farmer's Account Not Found" });

  const farmerRow = await Farmer.findOne({
    where: { userProfileId: userProfRow.id },
    attributes: ["id"],
  });
  if (!farmerRow)
    return res.status(400).send({ error: "Farmer's Account Not Found" });
  //......................

  const result = await Advance.create({
    reqestedAmount: data.reqestedAmount,
    comment: data.comment,
    farmerId: farmerRow.id,
  });
  if (!result) return res.status(400).send({ error: "error occured." });
  return res
    .status(200)
    .send({ data: "Advance request has been sent successfully" });
});

module.exports = router;
