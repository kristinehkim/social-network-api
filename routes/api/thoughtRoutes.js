const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    removeReaction,
} = require('../../controllers/thought-controller')

// /api/thoughts
router.route('/').get(getThoughts).post(createThought)

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction).delete(removeReaction);


module.exports = router;