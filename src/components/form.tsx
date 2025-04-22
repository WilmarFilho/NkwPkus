import { useState } from 'react';

import icon from './assets/icon.svg';

export default function CustomForm() {
  const [valor, setValor] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Valor enviado:", valor);
  };

  return (
    <form className='row' onSubmit={handleSubmit}>
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
