const express= require("express");
const {handleGenerateShortURL, handleRedirect, handleActivity }= require("../controllers/url")

const router = express.Router();
router.post('/', handleGenerateShortURL);

router.get('/:id', handleRedirect);
router.get('/analytics/:id', handleActivity)
module.exports=router;