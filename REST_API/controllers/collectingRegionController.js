const Joi = require("joi");
const router = require("express").Router();

const validateWith = require("../middleware/validation");
const db = require("../models");
const sequelize = db.sequelize; //To execut row queries
const collectingRegion = db.collectingRegion;

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

//get all
router.get("/", async (req, res) => {
  const regions = await collectingRegion.findAll(); //{ attributes: ["id", "name"],}
  if (!regions) return res.status(400).send({ error: "No regions founds!" });
  return res.status(200).send(regions);
});

router.get("/farmers_count_by_regions/", async (req, res) => {
  let query =
    "SELECT farmers.collectingRegionId, collectingregions.name, SUM(farmers.collectingRegionId) as farmers_count ";
  query += "FROM farmers ";
  query += "INNER JOIN collectingregions ON ";
  query += "collectingregions.id = farmers.collectingRegionId ";
  query += " GROUP By (farmers.collectingRegionId) ";

  const result = await sequelize.query(query, {
    raw: true,
  });
  // if (tbl_status2) nextAutoIncID2 = monthly_sum[0][0].Auto_increment;
  if (!result) return res.status(400).send({ error: "error" });

  //Note: Always use 0th element of the raw query result. it has 2 duplicate result element

  return res.status(200).send(result[0]);
});

//get by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const region = await collectingRegion.findByPk(id);
  if (!region)
    return res
      .status(400)
      .send({ error: "Sorry!, No region founds under given id." });

  return res.status(200).send(region);
});

//create
router.post("/", validateWith(schema), async (req, res) => {
  const { name, description } = req.body;

  const oldRegion = await collectingRegion.findOne({ where: { name: name } });
  if (oldRegion)
    return res.status(400).send({ error: "This region is already exist!" });

  const newRegion = await collectingRegion.create({ name, description });
  return res.status(200).send(newRegion);
});

//update
router.put("/:id", validateWith(schema), async (req, res) => {
  const { name, description } = req.body;
  const id = req.params.id;

  const oldRegion = await collectingRegion.findByPk(id);
  if (!oldRegion)
    return res.status(400).send({ error: "Requested region not exist!" });

  oldRegion.set({
    name: name,
    description: description,
  });

  const updated = await oldRegion.save();
  return res.status(200).send(updated);
});

//delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const oldRegion = await collectingRegion.findByPk(id);
  if (!oldRegion)
    return res.status(400).send({ error: "Requested region not exist!" });

  oldRegion
    .destroy({
      where: {
        id: id, //this will be your id that you want to delete
      },
    })
    .then(
      function (rowDeleted) {
        // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
          console.log("Deleted successfully");
        }
      },
      function (err) {
        console.log(err);
      }
    );

  return res.status(200).send({ data: "Region has been deleted" });
});

module.exports = router;
