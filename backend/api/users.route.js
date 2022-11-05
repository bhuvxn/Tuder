import express from 'express'

//file that will contain diffrent routes for people to go to, for now demonstration of ,/
const router = express.Router() // get access to express router
router.route('/').get((req,res) => res.send('hello world'))
export default router