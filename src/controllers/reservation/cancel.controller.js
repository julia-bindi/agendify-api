const { StatusCodes } = require("http-status-codes");
const { ReservationService } = require("../../services");
const yup = require("yup");


module.exports = {
    cancel: async (req, res) => {
        try{
            const schema = yup.object().shape({
                reservationId: yup.number().required(),
            });

            await schema.validate(req.body, {
                stripUnknown: true,
              });

            const { reservationId } = req.body;
            const response = await ReservationService.cancel(reservationId);
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