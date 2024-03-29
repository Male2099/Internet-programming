const joiValidation = (schema) => {
    return async (req, res, next) => {
        const param = req.body
        try{
            await schema.validateAsync(param);
        }catch(err){
            return res.json({
                success: false,
                err: err
            })
        }
        next();
    }
}
module.exports = {
    joiValidation
}