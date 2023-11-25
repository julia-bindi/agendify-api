const { StatusCodes } = require("http-status-codes");
const { ServiceService } = require("../../services");
const yup = require("yup");


module.exports = {
    create: async (req, res) => {
        try{
            const schema = yup.object().shape({
                name: yup.string().required(),
                cost: yup.number().required(),
                duration: yup.number().required(),
                description: yup.string().required(),
            });

            await schema.validate(req.body, {
                stripUnknown: true,
              });
            
            const [scheme, credentials] = req.headers.authorization.split(" ");
            const { name, cost, duration, description } = req.body;
            const response = await ServiceService.create(credentials, name, cost, duration, description);
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