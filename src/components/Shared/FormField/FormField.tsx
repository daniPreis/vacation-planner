import React from 'react';
import { useFormContext } from 'react-hook-form';
import './FormField.scss';

interface Props {
  name: string;
  label: string;
}

const FormField = (props: Props) => {

  const { register } = useFormContext();

  return (
    <div>
      <label>{props.label}</label>
      <div className={'field'}>
        <input {...register(props.name, { required: true })} />
        <div className={'line'} />
      </div>
    </div>
  );
};

export default FormField;
