import jwt from 'jsonwebtoken'

export const checkLogin = async (req, res, next) => {
    const { token } = req.cookies;

    // userID
    if (token) {
        const userID = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = userID._id;
        //if login then saving userid from token to req for accessing it in further routes
        // req.userID = user
        // console.log("call next")
        next();
    }
    else {
        return res.json({
            success: false,
            messsage: "User Not logged in. Pls Login"
        })
    }
}