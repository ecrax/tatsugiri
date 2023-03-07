const isLoggingEnabled = process.env.LOGGING_ENABLED === "true";

const logger = (...args: unknown[]) => {
  if (isLoggingEnabled) {
    console.log(...args);
  }
};

export default logger;
