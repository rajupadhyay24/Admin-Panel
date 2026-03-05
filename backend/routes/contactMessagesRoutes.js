const express = require("express");
const router = express.Router();
const controller = require("../controllers/contactMessagesController");

// Create a new contact message
router.post("/", controller.createMessage);

// Update an existing contact message
router.put("/:id", controller.updateMessage);

// Get all messages
router.get("/", controller.getMessages);

// Get a single message by ID
router.get("/:id", controller.getMessageById);      
// Delete a message
router.delete("/:id", controller.deleteMessage);

module.exports = router;