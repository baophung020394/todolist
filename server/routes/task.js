const { Router } = require("express");
const tasksController = require("../controllers/tasksController");

const router = Router();

router.post("/", tasksController.createTask);
router.get("/", tasksController.getAllTasks);
router.get("/:taskId", tasksController.getTaskById);
router.put("/:taskId", tasksController.updateTask);
router.delete("/:taskId", tasksController.deleteTask);

module.exports = router;
