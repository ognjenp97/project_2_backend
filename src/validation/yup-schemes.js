import * as yup from "yup";

export const HotelSchema = yup.object().shape({
  body: yup.object({
    name: yup.string().required(),
    type: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    distance: yup.number().min(0).required(),
    photos: yup.array().of(yup.string()).notRequired(),
    title: yup.string().required(),
    desc: yup.string().required(),
    rating: yup.number().min(0).max(5).notRequired(),
    rooms: yup.array().of(yup.string()).notRequired(),
    cheapestPrice: yup.number().min(1).required(),
    userId: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/)
      .required(),
    featured: yup.boolean().notRequired().default(true),
    unavailableDates: yup
      .array()
      .of(
        yup.object().shape({
          userId: yup
            .string()
            .matches(/^[0-9a-fA-F]{24}$/)
            .required(),
          date: yup.date().required(),
        })
      )
      .notRequired(),
  }),
});

export const RoomSchema = yup.object().shape({
  body: yup.object({
    title: yup.string().required(),
    price: yup.number().min(1).required(),
    maxPeople: yup.number().min(1).required(),
    desc: yup.string().required(),
    roomNumbers: yup.array().of(
      yup.object().shape({
        number: yup.number().min(1).required(),
        unavailableDates: yup.array().of(
          yup.object().shape({
            userId: yup
              .string()
              .matches(/^[0-9a-fA-F]{24}$/)
              .required(),
            date: yup.date().required(),
          })
        ),
      })
    ),
  }),
});

export const RegisterSchema = yup.object().shape({
  body: yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
});

export const LoginSchema = yup.object().shape({
  body: yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }),
});
