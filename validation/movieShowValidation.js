const {body,param} = require("express-validator");


module.exports = {
    createShow:()=>{
        return [
            body("Multiplex").notEmpty(),
            body("screen").notEmpty(),
            body("show_timing").notEmpty(),
            body("movie").notEmpty(),
            body("total_ticket").notEmpty(),
            body("available_ticket").notEmpty(),
            body("show_date").notEmpty()
        ]
    },
    updateShow:()=>{
        return [
            param('id')
            .isMongoId().notEmpty(),
            body("Multiplex").notEmpty(),
            body("screen").notEmpty(),
            body("show_timing").notEmpty(),
            body("movie").notEmpty(),
            body("total_ticket").notEmpty(),
            body("available_ticket").notEmpty(),
            body("show_date").notEmpty()
        ]

    }
}
