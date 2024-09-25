const express = require("express");
const { createCustomers, getAllCustomers, getCustomersDetails, updateCustomers, deleteCustomers } = require("../controller/customersController");
const router = express.Router();

router.route("/add").post(createCustomers);
router.route("/details").get(getAllCustomers);
router.route('/details/:id')
  .put(updateCustomers)
  .delete(deleteCustomers)
  .get(getCustomersDetails);

module.exports = router;
