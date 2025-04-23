import { useState } from 'react';
import logo from './assets/logo.svg';
import './assets/index.css';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className={`row header ${menuAberto ? 'ativo' : ''}`}>
      <div className="col-7  col-md-3 col-lg-3 wrapperLogo">
        <a href="https://nkw.framer.website">
          <img src={logo} alt="Logo" />
        </a>
      </div>

      {/* Botão Hamburguer */}
      <div className={`col-5 col-md-9 col-lg-9 menu-toggle ${menuAberto ? 'ativo' : ''}`} onClick={() => setMenuAberto(!menuAberto)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <article className={`col-8 col-md-9 col-lg-9 navHeader ${menuAberto ? 'ativo' : ''}`}>
        <ul>
          <li><a href="https://nkw.framer.website/#hero">Início</a></li>
          <li><a href="https://nkw.framer.website/#fundadores">Fundadores</a></li>
          <li><a href="https://nkw.framer.website/#solucoes">Soluções</a></li>
          <li><a href="https://nkw.framer.website/#valores">Valores</a></li>
          <li><a href="https://nkw.framer.website/#nkw+">NKW+</a></li>
          <li><a href="https://wa.link/ej8dzw" className="btnContato">Fale Conosco</a></li>
        </ul>
      </article>
    </header>
  );
}
