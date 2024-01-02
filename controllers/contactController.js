const asyncHandler = require("express-async-handler")
const Contact = require("../model/contactModel")

// @desc get contacts
// @route GET /api/contacts
// access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find()
  res.status(200).json(contacts)
})

// @desc create contact
// @route POST /api/contacts
// access public
const createContact = asyncHandler(async (req, res) => {
  console.log(`contact body is: ${req.body}`)
  const { name, email, phone } = req.body
  if (!name || !email || !phone) {
    res.status(400)
    throw new Error("All fields are mandatory")
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  })
  res.status(201).json(contact)
})

// @desc get contact
// @route GET /api/contacts/:id
// access public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error("Contact not founc")
  }
  res.status(200).json(contact)
})

// @desc update contact
// @route PUT /api/contacts/:id
// access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error("Contact not founc")
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(201).json({ message: `Contact updated for ${req.params.id}` })
})

// @desc delete contact
// @route DELETE /api/contacts/:id
// access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error("Contact not founc")
  }
  await Contact.deleteOne({ _id: req.params.id })
  res.status(200).json(contact)
})

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
}
