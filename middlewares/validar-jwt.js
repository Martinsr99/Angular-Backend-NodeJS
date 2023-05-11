const jwt = require('jsonwebtoken')

const validarJWT = (req,res,next) => {

    const token = req.header('x-token')

    if(!token) return res.status(401).json({
        msg:'Token missing',
        ok:false
    })

    try {
        const {uid} = jwt.verify(token,process.env.JWT_SECRET)

        req.uid = uid

    } catch (error) {
        return res.status(401).json({
            msg:'Token invalid',
            ok:false
        })
    }

    next()
}

module.exports = validarJWT