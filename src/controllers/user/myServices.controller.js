const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../../services");
const yup = require("yup");


module.exports = {
    myServices: async (req, res) => {
        try{
            const [scheme, credentials] = req.headers.authorization.split(" ");
            const response = await UserService.myServices(credentials);
            return res.status(StatusCodes.OK).json(response);
        }catch (error) {
            console.error(error);
            return res
              .status(
                error.name == "ValidationError"
                  ? StatusCodes.UNPROCESSABLE_ENTITY
                  : error.status || StatusCodes.INTERNAL_SERVER_ERROR
              )
              .json(error.message);
          }
    }
}