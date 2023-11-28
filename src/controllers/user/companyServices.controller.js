const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../../services");
const yup = require("yup");


module.exports = {
    companyServices: async (req, res) => {
        try{
            const { email } = req.params
            const response = await UserService.companyServices(email);
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