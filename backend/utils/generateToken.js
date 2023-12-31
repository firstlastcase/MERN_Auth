import jsw from 'jsonwebtoken';


const generateToken = (res, userId)=>{

    const token = jsw.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:'30 days'
    })
    res.cookie('jwt', token,{
    httpOnly:true,
    secure: process.env.NODE_ENV!=='development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

export default generateToken