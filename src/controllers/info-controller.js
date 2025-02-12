import status from "http-status";

const info = (req, res) => {
  return res.status(status.OK).json({
    success: true,
    message: "API is like",
    error: {},
    data: {},
  });
};

export default { info };
