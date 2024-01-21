import express from 'express'
import * as diaryServices from '../services/diary.services'
const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})
router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(+req.params.id)

  return (diary != null) ? res.send(diary) : res.sendStatus(404)
})

// TODO: ADD VALIDATIONS FOR POST REQUEST
router.post('/', (req, res) => {
  const { date, weather, visibility, comment } = req.body

  const newDiaryEntry = diaryServices.addDiary({ date, weather, visibility, comment })

  res.json(newDiaryEntry)
})

export default router
