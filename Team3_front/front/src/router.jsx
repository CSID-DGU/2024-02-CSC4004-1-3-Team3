import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './pages/main/Main';
import Login from './pages/Login/Login';
import MyPage from './pages/MyPage/MyPage';
import Author from './pages/Author/Author';
import Auction from './pages/Auction/Auction';
import ArtWork from './pages/ArtWork/ArtWork';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'artwork',
        element: <ArtWork />,
      },
      {
        path: 'author',
        element: <Author />,
      },
      {
        path: 'auction',
        element: <Auction />,
      },
    ],
  },
]);

export default router;
