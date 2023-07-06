const { Task } = require("../models");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json({
      task,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findOne({
      where: { id: taskId },
    });
    if (task) {
      return res.status(200).json({ task });
    }
    return res.status(404).send("Task with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const [updated] = await Task.update(req.body, {
      where: { id: taskId },
    });
    if (updated) {
      const updatedTask = await Task.findOne({ where: { id: taskId } });
      return res.status(200).json({ task: updatedTask });
    }
    throw new Error("Task not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const deleted = await Task.destroy({
      where: { id: taskId },
    });
    if (deleted) {
      return res.status(204).send("Task deleted");
    }
    throw new Error("Task not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
