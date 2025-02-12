import winston from "winston";

// const logger = new winston.Logger({
//   transports: [
//     new winston.transports.Console({
//       timestamp: function () {
//         return Date.now();
//       },

//       formatter: function (options) {
//         // - Return string will be passed to logger.
//         // - Optionally, use options.colorize(options.level, <string>) to
//         //   colorize output based on the log level.
//         return (
//           options.timestamp() +
//           " " +
//           config.colorize(options.level, options.level.toUpperCase()) +
//           " " +
//           (options.message ? options.message : "") +
//           (options.meta && Object.keys(options.meta).length
//             ? "\n\t" + JSON.stringify(options.meta)
//             : "")
//         );
//       },
//     }),
//     new winston.transports.File({ filename: "combined.log" }),
//   ],
// });

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      let log = `${timestamp} ${level.toUpperCase()} ${message}`;
      if (Object.keys(meta).length) {
        log += `\n\t${JSON.stringify(meta)}`;
      }
      return `${timestamp} : ${level} : ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export default logger;
