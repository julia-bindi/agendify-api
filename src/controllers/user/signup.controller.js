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
                imageName: yup.string(),
                imageType: yop.string(),
                imageData: yup.string(),
                phone: yup.string().required(),
                type: yup.string().required(),
                description: yup.string(),
                workDays: yup.string(),
                openHours: yup.string(),
                category: yup.string(),
            });

            await schema.validate(req.body, {
                stripUnknown: true,
              });

            const { name, email, password, imageName, imageType, imageData, phone, type, description, workDays, openHours, category } = req.body;
            const response = await UserService.signup(name, email, password, photo, phone, type, description, openHours, category);
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