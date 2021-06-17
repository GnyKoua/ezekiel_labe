export default async ({ user }, res, next) => {
    try {
     return res.json({
        success: true,
        user
      })
    } catch (err) {
      return next(err)
    }
  }
