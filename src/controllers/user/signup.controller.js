const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../../services");
const yup = require("yup");

module.exports = {
    signup: async (req, res) =>{
        try{
            const schema = yup.object().shape({
                name: yup.string().required(),
                email: yup.string().required(),
                password: yup.string().required(),
                photo: yup.string(),
                phone: yup.string().required(),
                type: yup.string().required(),
                description: yup.string(),
                openHours: yup.string(),
                category: yup.string(),
            });

            await schema.validate(req.body, {
                stripUnknown: true,
              });

            const { nome, email, password, photo, phone, type, description, openHours, category } = req.body;
            const response = await UserService.signup(nome, email, password, photo, phone, type, description, openHours, category);
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
    },
}