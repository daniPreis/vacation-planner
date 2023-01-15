import { useQueries, useQuery } from 'react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '@src/components/Application';
import { FormProvider, useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { CheckAbsences } from '@src/interfaces/check-absences.interface';
import DatePicker from 'react-datepicker';
import { Person } from '@src/interfaces/person.interface';
import Select from 'react-select';
import './AbsencesView.scss';
import Button from '@src/components/Shared/Button/Button';
import moment from 'moment';

const baseUrl = 'http://vacationplannerv2-be-dev3.eba-pisehxks.us-east-1.elasticbeanstalk.com';

const AbsencesView = () => {
  const { user, setUser } = useContext(UserContext);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const methods = useForm<CheckAbsences>({
    defaultValues: {
      end: moment().clone().add(1, 'days').toDate(),
      start: new Date(),
    },
  });

  const { data: personsData, isFetched: personsFetched } = useQuery('persons', async () => {
    return (await axios.get<{ list: Person[] }>(`${baseUrl}/persons/`, { headers: { Authorization: `Bearer ${user.token}` } })).data.list.map(person => {
      return {
        value: person.id,
        label: person.name,
      };
    });
  }, { enabled: !!user.token });

  return (
    <div className={'absences'}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => console.log('DATA'))} className={'abscences-form'}>
          <div className={'field'}>
            <label>Personen</label>
            {personsFetched && <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  width: '400px',
                }),
              }}
              name="colors" isMulti
              options={personsFetched ? personsData : []}
              onChange={(e: {
                value: number,
                label: string,
              }[]) => methods.setValue('persons', e.map(i => i.value))} inputValue={''}
            />}
          </div>
          <div className={'field'}>
            <label>Verfügbarkeitsbereich</label>
            <DatePicker
              onChange={(dates) => {
                setDateRange(dates);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange={true}
            />
          </div>
          <Button label={'Verfügbarkeiten prüfen'} />
        </form>
      </FormProvider>
    </div>
  );
};

export default AbsencesView;
