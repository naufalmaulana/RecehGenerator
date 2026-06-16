import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import jokesRoutes from './routes/jokes.routes';
import favoritesRoutes from './routes/favorites.routes';
import notificationsRoutes from './routes/notifications.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jokes', jokesRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/notifications', notificationsRoutes);

app.get('/', (req, res) => {
  res.send('RecehGenerator API is running!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
