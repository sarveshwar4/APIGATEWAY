const axios = require("axios");

const AuthorisedUser = async (req, res, next) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/v1/isAuthenticated",
      {
        headers: {
          "x-auth-token": req.headers["x-auth-token"],
        },
      }
    );
    if (response.data.success) {
      next();
    }
    else{
        return res.status(401).json({message:'ANAUTHORISED'});
    }
  } catch (error) {
      return res.status(401).json({
        message:'ANAUTHORISED'
      });
  }
};

module.exports = { AuthorisedUser };
