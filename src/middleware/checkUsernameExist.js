import { User } from "../../database/models/user.model.js";


export const checkUsernameExist = async (req, res, next) => {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
        return res.status(409).json({ message: "username already exists, write diffirent username" });
    }

    next();
   
};