const getdb = require("../mongodbConnection").getDb
const {SHOWS_COLLECTION} = require("../constants/collectionConstants");
const { ObjectID } = require("mongodb")

module.exports={
    createMovieShow : ((data)=>{
        return new Promise((resolve,reject)=>{
            let query= {
                "Multiplex":data.Multiplex,
                "screen":data.screen,
                "show_timing":data.show_timing,
                "movie":data.movie,
                "show_date":data.show_date
            }
            getdb(SHOWS_COLLECTION).findOne(query,(err,res)=>{
                if(err){
                    return reject(err);
                }
                if(!res){
                    getdb(SHOWS_COLLECTION).insertOne(data,(err,responce)=>{
                        if(err){
                            return reject(err);
                        }
                        return resolve(responce);
                    })
                }else{
                    return reject("Record Exist");
                } 

            })

        })
    }),
    getMovieList:(()=>{
        return new Promise((resolve,reject)=>{
            getdb(SHOWS_COLLECTION).find({}).toArray((err,res)=>{
                if(err){
                    return reject(err);
                }
                return resolve(res);
            })
        })
    }),
    updateMovieList:((id,data)=>{
        return new Promise((resolve,reject)=>{
            var query =[
                {
                  '$match': {
                    '$and': [
                      {
                        '_id': {
                          '$nin': [
                            new ObjectID(id)
                          ]
                        }
                      }, {
                        "Multiplex":data.Multiplex,
                        "screen":data.screen,
                        "show_timing":data.show_timing,
                        "movie":data.movie,
                        "show_date":data.show_date
                      }
                    ]
                  }
                }
              ]
            getdb(SHOWS_COLLECTION).aggregate(query).toArray((err,res)=>{ 
                if(err){
                    return reject(err);
                }
                if(res.length>0){
                    getdb(SHOWS_COLLECTION).updateOne({"_id":ObjectID(id)},{$set:data},(err,res)=>{
                        if(err){
                            return reject(err);
                        }
                        return resolve(res);
                    })
                }
            })

        })
    })
}