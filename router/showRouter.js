var express = require("express");
var router = express.Router();
var showMovieBLayer = require("../business-layer/showMovieBlayer");
var movieShowValidation = require("../validation/movieShowValidation");
const {validationResult} = require("express-validator");

router.post('/createshow', movieShowValidation.createShow(),(req,res,next)=>{
    const errors =  validationResult(req);
    console.log(errors,"errors")
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    showMovieBLayer.createMovieShow(req.body)
    .then((responce) =>{
        res.send(responce);
    })
    .catch(err=>{
        next(err);
    })
});
router.get('/showlist',(req,res,next)=>{
    showMovieBLayer.getMovieList()
    .then((responce)=>{
        res.send(responce);
    })
    .catch(err=>{
        next(err)
    })
})
router.put('/:id', movieShowValidation.updateShow(),(req,res,next)=>{
    showMovieBLayer.updateMovieList(req.params.id,req.body)
    .then((responce)=>{
        res.send(responce);
    })
    .catch(err=>{
        next(err)
    })
})
module.exports =  router;