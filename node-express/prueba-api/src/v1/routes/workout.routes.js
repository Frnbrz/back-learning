const express = require('express');
const router = express.Router();
const workoutController = require('../../controllers/workout.controller');
const recordController = require('../../controllers/record.controller');

router
  .get('/',workoutController.getAllWorkouts)
  .get('/:workoutId',workoutController.getOneWorkout)
  .get('/:workoutId/records',recordController.getRecordForWorkout)
  .post('/',workoutController.createNewWorkout)
  .patch('/:workoutId', workoutController.updateOneWorkout)
  .delete('/:workoutId', workoutController.deleteOneWorkout);


module.exports = router;
