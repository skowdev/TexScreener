import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './providers/WalletProvider';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreateTokenPage from './pages/CreateTokenPage';
import TokenDetailPage from './pages/TokenDetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="create" element={<CreateTokenPage />} />
            <Route path="token/:id" element={<TokenDetailPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;