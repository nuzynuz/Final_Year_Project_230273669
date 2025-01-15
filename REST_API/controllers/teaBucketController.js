const Joi = require("joi");
const validateWith = require("../middleware/validation");
const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const dayjs = require("dayjs");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const db = require("../models");
const sequelize = db.sequelize; //To execut row queries
const teaBucket = require("../models/teaBucket");
const Tag = db.tag;
const TeaBucket = db.teaBucket;
const Farmer = db.farmer;
const FarmerRevenue = db.farmerRevenue;
const UserProfile = db.userProfile;
const ColRegion = db.collectingRegion;
const Rate = db.rate;

router.get("/year-sum/:year", async (req, res) => {
  const year = req.params.year;

  const jan_sum = await sequelize.query(
    "SELECT SUM(netWeight) as total_weight FROM teabuckets WHERE date >= '" +
      year +
      "-01-01 ' AND  date <= '" +
      year +
      "-01-31 '",
    {
      raw: true,
    }
  );

  const feb_sum = await sequelize.query(
    "SELECT SUM(netWeight) as total_weight FROM teabuckets WHERE date >= '" +
      year +
      "-02-01 ' AND  date <= '" +
      year +
      "-02-31 '",
    {
      raw: true,
    }
  );

  const march_sum = await sequelize.query(
    "SELECT SUM(netWeight) as total_weight FROM teabuckets WHERE date >= '" +
      year +
      "-03-01 ' AND  date <= '" +
      year +
      "-03-31 '",
    {
      raw: true,
    }
  );

  const april_sum = await sequelize.query(
    "SELECT SUM(netWeight) as total_weight FROM teabuckets WHERE date >= '" +
      year +
      "-04-01 ' AND  date <= '" +
      year +
      "-04-31 '",
    {
      raw: true,
    }
  );

  const may_sum = await sequelize.query(
    "SELECT SUM(netWeight) as total_weight FROM teabuckets WHERE date >= '" +
      year +
      "-05-01 ' AND  date <= '" +
      year +
      "-05-31 '",
    {
      raw: true,
    }
  );

  const juny_sum = await sequelize.query(
    "SELECT SUM(netWeight) as total_weight FROM teabuckets WHERE date >= '" +
      year +
      "-06-01 ' AND  date <= '" +
      year +
      "-06-31 '",
    {
      raw: true,
    }
  );

  const july_sum = await sequelize.query(
    "SELECT SUM(netWeight) as total_weight FROM teabuckets WHERE date >= '" +
      year +
      "-07-01 ' AND  date <= '" +
      year +
      "-07-31 '",
    {
      raw: true,
    }
  );

  const aug_sum = await sequelize.query(
    "SELECT SUM(netWeight) as total_weight FROM teabuckets WHERE date >= '" +
      year +
      "-08-01 ' AND  date <= '" +
      year +
      "-08-31 '",
    {
      raw: true,
    }
  );

  const sep_sum = await sequelize.query(
    "SELECT SUM(netWeight) as total_weight FROM teabuckets WHERE date >= '" +
      year +
      "-09-01 ' AND  date <= '" +
      year +
      "-09-31 '",
    {
      raw: true,
    }
  );

  const oct_sum = await sequelize.query(
    "SELECT SUM(netWeight) as total_weight FROM teabuckets WHERE date >= '" +
      year +
      "-09-01 ' AND  date <= '" +
      year +
      "-09-31 '",
    {
      raw: true,
    }
  );

  const nov_sum = await sequelize.query(
    "SELECT SUM(netWeight) as total_weight FROM teabuckets WHERE date >= '" +
      year +
      "-11-01 ' AND  date <= '" +
      year +
      "-11-31 '",
    {
      raw: true,
    }
  );

  const dec_sum = await sequelize.query(
    "SELECT SUM(netWeight) as total_weight FROM teabuckets WHERE date >= '" +
      year +
      "-12-01 ' AND  date <= '" +
      year +
      "-12-31 '",
    {
      raw: true,
    }
  );

  return res.status(200).send({
    jan: jan_sum[0][0].total_weight === null ? 0 : jan_sum[0][0].total_weight,
    feb: feb_sum[0][0].total_weight === null ? 0 : feb_sum[0][0].total_weight,
    march:
      march_sum[0][0].total_weight === null ? 0 : march_sum[0][0].total_weight,
    april:
      april_sum[0][0].total_weight === null ? 0 : april_sum[0][0].total_weight,
    may: may_sum[0][0].total_weight === null ? 0 : may_sum[0][0].total_weight,
    juny:
      juny_sum[0][0].total_weight === null ? 0 : juny_sum[0][0].total_weight,
    july:
      july_sum[0][0].total_weight === null ? 0 : july_sum[0][0].total_weight,
    aug: aug_sum[0][0].total_weight === null ? 0 : aug_sum[0][0].total_weight,
    sep: sep_sum[0][0].total_weight === null ? 0 : sep_sum[0][0].total_weight,
    oct: oct_sum[0][0].total_weight === null ? 0 : oct_sum[0][0].total_weight,
    nov: nov_sum[0][0].total_weight === null ? 0 : nov_sum[0][0].total_weight,
    dec: dec_sum[0][0].total_weight === null ? 0 : dec_sum[0][0].total_weight,
  });
});

router.get("/monthly-sum/:year/:month", async (req, res) => {
  const year = req.params.year;
  const month = req.params.month;

  const mStart = year + "-" + month + "-1";
  const mEnd = year + "-" + month + "-31";

  const monthly_sum = await sequelize.query(
    "SELECT date,SUM(netWeight) as total_weight FROM teabuckets WHERE date >= '" +
      mStart +
      "' AND  date <= '" +
      mEnd +
      "' GROUP BY date ",
    {
      raw: true,
    }
  );
  // if (tbl_status2) nextAutoIncID2 = monthly_sum[0][0].Auto_increment;
  if (!monthly_sum) return res.status(400).send({ error: "error" });

  const entierMonthSum = await sequelize.query(
    "SELECT SUM(weight) as month_sum FROM teabuckets WHERE date >= '" +
      mStart +
      "' AND  date <= '" +
      mEnd +
      "'",
    {
      raw: true,
    }
  );

  //Note: Always use 0th element of the raw query result. it has 2 duplicate result element

  return res
    .status(200)
    .send({ daily: monthly_sum[0], month_sum: entierMonthSum[0] });
});

//Add New Bucket      -verifyToken has been temporary disabled
router.post("/", async (req, res) => {
  let { teaBucket } = req.body;

  teaBucket.tag.activatedTime = dayjs();
  teaBucket.tag.releaseTime = dayjs().add(12, "hour");

  const findFarmer = await Farmer.findOne({
    where: { supplierCode: teaBucket.farmerId },
  });
  if (!findFarmer)
    return res.status(400).send({ error: "Invalid Supplier ID" });
  teaBucket.farmerId = findFarmer.id;

  const findTag = await Tag.findOne({
    where: { tagId: teaBucket.tag.tagId },
  });
  if (findTag) {
    if (dayjs().isBefore(dayjs(findTag.releaseTime)) === true)
      return res.status(400).send({ error: "Given tag is still active" });

    await findTag.destroy();
  }

  // const newTag = await Tag.create(tag, {
  //   association: Tag.TeaBucket,
  //   include: [TeaBucket],
  // });
  let payment_for_weight = teaBucket.weight;
  let deduction_for_loan = 0.0;
  let deduction_for_advance = 0.0;
  let total_Rervenue = teaBucket.weight * 100;

  let farmerRevenue = {
    payment_for_weight: payment_for_weight,
    deduction_for_loan: deduction_for_loan,
    deduction_for_advance: deduction_for_advance,
    total_Rervenue: total_Rervenue,
    date: Date.now(),
    remark: Date.now() + " - Revenue",
  };

  teaBucket.farmerRevenue = farmerRevenue;

  //todayDate
  var date = new Date().toISOString().slice(0, 10);
  let tea_bucket = { date, ...teaBucket };

  const tagData = {
    tea_bucket,
  };

  const newTag = await TeaBucket.create(tagData.tea_bucket, {
    include: [Tag, FarmerRevenue],
  });
  if (!newTag)
    return res.status(400).send({ error: "Error! Server having some trubles" });

  return res.status(200).send({ data: "New bucket has tagged" });
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const findUser = await UserProfile.findOne({
    where: { loginId: userId },
  });
  if (!findUser) return res.status(400).send({ error: "Invalid Supplier ID" });

  const findFarmer = await Farmer.findOne({
    where: { userProfileId: findUser.id },
  });
  if (!findFarmer)
    return res.status(400).send({ error: "Invalid Supplier ID" });

  const buckets = await TeaBucket.findAll({
    where: { farmerId: findFarmer.id },
    include: [FarmerRevenue],
  });

  if (!buckets) return res.status(400).send({ error: "Invalid Supplier ID" });
  return res.status(200).send({ data: buckets });
});

router.post("/verify", async (req, res) => {
  const data = req.body;

  let teaBucket = await TeaBucket.findOne({
    include: {
      model: Tag,
      where: { tagId: data.rfid },
    },
  });
  if (!teaBucket) return res.status(400).send({ error: "Not Found" });

  const farmer = await Farmer.findByPk(teaBucket.farmerId, {
    attributes: ["supplierCode", "collectingRegionId"],
  });
  const colRegion = await ColRegion.findByPk(farmer.collectingRegionId, {
    attributes: ["name"],
  });

  // include: {
  //   model: Tag,
  //   where: { tagId: data.rfid }, //Where clause for inner model
  // },

  teaBucket.dataValues.supplierCode = farmer.supplierCode;
  teaBucket.dataValues.colRegion = colRegion.name;
  teaBucket.dataValues.weightNow = data.weight;
  let shortage = data.weight - teaBucket.netWeight;
  teaBucket.dataValues.weightShortage = shortage.toFixed(2);
  return res.status(200).send({ data: teaBucket });
});

router.post("/addRate", async (req, res) => {
  const rate = req.body;
  const addRate = Rate.create(rate);
  if (!addRate) return res.status(400).send({ error: "Error" });
  return res.status(200).send({ data: "Tea Rate has been added" });
});

module.exports = router;
