const { StatusCodes } = require("http-status-codes");
const { ServiceService } = require("../../services");
const yup = require("yup");


module.exports = {
    destroy: async (req, res) => {
        try{
            const schema = yup.object().shape({
                serviceId: yup.string().required(),
            });

            await schema.validate(req.body, {
                stripUnknown: true,
              });
            
            const [scheme, credentials] = req.headers.authorization.split(" ");
            const { serviceId } = req.body;
            const response = await ServiceService.destroy(credentials, serviceId);
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