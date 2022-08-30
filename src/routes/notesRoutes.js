const express = require('express');
const {getNotes, createNote, getNoteById, deleteNoteById, updateNoteById} = require('../controllers/notesController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getNotes)
router.route('/create').post(protect,createNote);
 router.route('/:id').get(getNoteById).delete(protect,deleteNoteById)
  .put(protect,updateNoteById)

module.exports = router