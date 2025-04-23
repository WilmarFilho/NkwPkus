import { useState } from 'react';
import icon from './assets/icon.svg';

interface CustomFormProps {
  temMensagem?: boolean;
  onEnviar: (mensagem: string) => void;
}

export default function CustomForm({ temMensagem = false, onEnviar }: CustomFormProps) {
  const [valor, setValor] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valor.trim()) return;

    onEnviar(valor.trim()); // Envia pro Main
    setValor(""); // Limpa o input
  };

  return (
    <form className={`row ${temMensagem ? 'rodando' : 'parado'}`} onSubmit={handleSubmit}>
      <input
        className="inputCustom col-9"
        name="pergunta"
        type="text"
        placeholder="Pergunte qualquer coisa"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <div className="col-3 wrapperButton">
        <button type="submit">
          <img className="iconSubmit" src={icon} />
        </button>
      </div>
    </form>
  );
}
