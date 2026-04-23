import Joi  from "joi";

export  const userRegisterValidation = (data)=>{
    const schema = Joi.object({
        fullName: Joi.string().min(6).max(12).required().trim(),
         password: Joi.string().min(6).max(10).required(),
         email:Joi.string().email({
            minDomainSegments: 2,
            tlds:{allow: ['com' , 'net']}
         }).required()
    })
    return schema.validate(data)
}
