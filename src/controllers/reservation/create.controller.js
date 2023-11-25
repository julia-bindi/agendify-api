const { StatusCodes } = require("http-status-codes");
const { ReservationService } = require("../../services");
const yup = require("yup");


module.exports = {
    create: async (req, res) => {
        try{
            const schema = yup.object().shape({
                serviceId: yup.number().required(),
                date: yup.string().required(),
                time: yup.string().required()
            });

            await schema.validate(req.body, {
                stripUnknown: true,
              });
            
            const [scheme, credentials] = req.headers.authorization.split(" ");
            const { serviceId, date, time } = req.body;
            const response = await ReservationService.create(credentials, serviceId, date, time);
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