import "dotenv/config";
import { app } from "./src/app";

const URL = process.env.SERVER_URL || "http://localhost";
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on  ${URL}:${PORT}`);
});
