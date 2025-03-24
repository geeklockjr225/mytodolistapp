const express = require('express')
const {createTask,getTasks} = require('../controllers/taskController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()
const {Task} = require('../models')

router.post("/",authMiddleware,createTask)
router.get("/",authMiddleware,getTasks)

// Modifier une tâche
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { completed } = req.body;
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.userId } });

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    task.completed = completed;
    await task.save();

    res.json({ message: "Tâche mise à jour", task });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});
  
 // Supprimer une tâche
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.userId } });

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    await task.destroy();
    res.json({ message: "Tâche supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});
  
  

module.exports = router;