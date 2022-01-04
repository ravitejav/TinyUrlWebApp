import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Spinner from './Components/Spinner';

const HomePage = React.lazy(() => import('./Components/HomePage'));
const LandingPage = React.lazy(() => import('./Components/Landing'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createUrl" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
