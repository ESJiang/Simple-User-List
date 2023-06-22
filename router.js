const express = require("express");
const router = express.Router();
let user = [
    { name: "Ben", age: 20 },
    { name: "Amy", age: 23 },
    { name: "Chris", age: 34 },
    { name: "Jack", age: 18 },
];

router.get("/api/users", (req, res) => res.send(user));
router.post("/api/user", (req, res) => {
    user.push(req.body);
    res.send({
        msg: "add user successfully",
        data: req.body,
    });
});

router.delete("/api/clearsingle", (req, res) => {
    const messageName = req.query.name;
    const messageIndex = user.findIndex(msg => msg.name === messageName);
    if (messageIndex !== -1) {
        const deletedMessage = user.splice(messageIndex, 1)[0];
        console.log("deletedMessage", deletedMessage);
        res.status(201).json({ msg: "delete successfully", deleteData: deletedMessage });
    } else res.status(404).json({ msg: "cannot delete" });
});

router.delete("/api/clear", (req, res) => {
    user = [];
    res.send("User list has been cleared");
});

module.exports = router;
