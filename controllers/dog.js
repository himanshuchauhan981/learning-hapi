var Dog = require('../models/dog')

exports.create = (req,h) =>{
    const dogData = {
        name: req.payload.name,
        breed: req.payload.breed,
        age: req.payload.age,
        image: req.payload.image
    }
    return Dog.create(dogData).then((dog=>{
        return {msg:'Dog created successfully',dog:dog}
    })).catch((err)=>{
        return {err:err}
    })
}

exports.get = (req,h) =>{
    return Dog.findById(req.params.id).exec().then((dog)=>{
        if(!dog) return {message:'Dog not found'}
        else return {dog}
    })
}

exports.update = (req,h) =>{
    let {payload} = req;

    return Dog.findByIdAndUpdate(req.params.id,
        {
            $set:{
                name:payload.name,
                breed: payload.breed,
                image: payload.image,
                age: payload.age
            }
        }).then((dog)=>{
            if(!dog) return {message:'Dog not found'}
            else return {message:'Dog updated successfull'}
        }).catch((error) =>{
            console.log('error caused')
        })
}
