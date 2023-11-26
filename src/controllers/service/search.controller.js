const { StatusCodes } = require("http-status-codes");
const { ServiceService } = require("../../services");
const yup = require("yup");


module.exports = {
    search: async (req, res) => {
        try{
            const schema = yup.object().shape({
                category: yup.array(),
                startTime: yup.string(),
                endTime: yup.string(),
                smallPrice: yup.number(),
                biggestPrice: yup.number(),
                state: yup.string(),
                city: yup.string()
            });

            await schema.validate(req.body, {
                stripUnknown: true,
              });
            
            const { category, startTime, endTime, smallPrice, biggestPrice, state, city } = req.body;
            const response = await ServiceService.search(category, startTime, endTime, smallPrice, biggestPrice, state, city);
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