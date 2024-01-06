const express = require("express")
const {
  getContacts,
  createContact,
  updateContact,
  getContact,
  deleteContact,
} = require("../controllers/contactController")
const validateToken = require("../middleware/validateTokenHandler")
const router = express.Router()

router.use(validateToken)
router.route("/").get(getContacts)
router.route("/").post(createContact)
router.route("/:id").put(updateContact).get(getContact).delete(deleteContact)

module.exports = router
