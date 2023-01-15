import React, { useEffect, useState } from 'react';
import './Application.scss';
import { icons } from './Icons';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginView from './Login/LoginView';
import PersonsView from './PersonsView';
import { UserInterface } from '@src/interfaces/user.interface';
import { QueryClient, QueryClientProvider } from 'react-query';
import AbsencesView from '@src/components/Absences/AbsencesView';

export const UserContext = React.createContext({
  user: { token: null },
  setUser: (user: UserInterface) => {
  },
});

const queryClient = new QueryClient();

const Application: React.FC = () => {
  const [user, setUser] = useState({ token: null });
  const value = { user, setUser };
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginView />,
    },
    {
      path: '/persons',
      element: <PersonsView />,
    },
    {
      path: '/absences',
      element: <AbsencesView />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={value}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default Application;
