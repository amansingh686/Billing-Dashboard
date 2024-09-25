const express = require("express");
const { createItems, getAllItems, updateItems, deleteItems, getItemsDetails } = require("../controller/itemsController");
const router = express.Router();

router.route("/add").post(createItems);
router.route("/details").get(getAllItems);
router.route('/details/:id')
  .put(updateItems)
  .delete(deleteItems)
  .get(getItemsDetails);


module.exports = router;
