const { CronJob } = require("cron");
const { logger } = require("../../config/index");

function createCronJob(cronExpression, taskFn) {
  const job = new CronJob(cronExpression, async () => {
    logger.info(`Cron job triggered: ${cronExpression}`);

    try {
      await taskFn();
    } catch (error) {
      logger.error("Error during cron task execution", error);
    }
  });

  job.start();
}

module.exports = {
  createCronJob,
};
