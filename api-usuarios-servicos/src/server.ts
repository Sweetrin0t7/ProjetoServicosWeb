import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();
const PORT = 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
