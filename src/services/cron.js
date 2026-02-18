import cron from "cron";
import https from "https";

const url = process.env.VITE_API_URL;
const job = new cron.CronJob("*/14 * * * *", function () {
    https
        .get(url, (res) => {
            if (res.statusCode === 200) console.log("Get request sent successfully!");
            else console.error("Error sending GET request", res.statusCode);
        })
        .on("error", (e) => {
            console.error("Error while sending request", e);
        });
});

export default job;