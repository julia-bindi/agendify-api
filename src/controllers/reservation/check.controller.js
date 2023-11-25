const { StatusCodes } = require("http-status-codes");
const { ReservationService } = require("../../services");
const yup = require("yup");


module.exports = {
    check: async (req, res) => {
        try{
            const id = req.query.id
            const date = req.query.date
            const response = await ReservationService.check(id, date);
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