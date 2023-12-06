import jwt from 'jsonwebtoken'

export const checkCookie = async (req, res, next) => {
    const { token } = req.cookies;

    // userID
    if (!token) {
        // console.log("call next")
        next();
    }
    else {
        return res.json({
            success: false,
            messsage: "User is Already logged in. Pls Log out first to Register/Login"
        })
    }
}