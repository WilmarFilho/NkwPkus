import { useState } from 'react';

import icon from './assets/icon.svg';

interface CustomFormProps {
  formHeight?: string; 
}

export default function CustomForm( {formHeight = '160px'} : CustomFormProps) {
  const [valor, setValor] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Valor enviado:", valor);
  };

  return (
    <form style={{ height: formHeight }} className='row' onSubmit={handleSubmit}>
      <input
        className='inputCustom col-9'
        
        name="pergunta"
        type="text"
        placeholder="Pergunte qualquer coisa"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <div className='col-3 wrapperButton'>
        <button  type="submit"><img className='iconSubmit' src={icon} /></button>
      </div>
      
    </form>
  );
}
