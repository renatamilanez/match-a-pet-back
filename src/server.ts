import app, { init } from "@/app";
import { redisConnect } from "@/app";

const port = +process.env.PORT || 4000;

init().then(async () => {
  await redisConnect();
  app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Server is listening on port ${port}.`);
  });
});
