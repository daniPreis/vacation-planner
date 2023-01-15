import { useQueries, useQuery } from 'react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { UserContext } from '@src/components/Application';

const baseUrl = 'http://vacationplannerv2-be-dev3.eba-pisehxks.us-east-1.elasticbeanstalk.com';

const PersonsView = () => {
  const { user, setUser } = useContext(UserContext);

  const { data: personsData } = useQuery('persons', async () => {
    return await axios.get(`${baseUrl}/persons/`, { headers: { Authorization: `Bearer ${user.token}` } });
  }, { enabled: !!user.token });

  if (personsData) {
    return <div>Personen angekommen</div>;
  } else {
    return <div>Warte noch....</div>;
  }
};

export default PersonsView;
