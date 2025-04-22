import logo from './assets/logo.svg';
import './assets/index.css'

export default function Header() {
    return (
        <header className='row'>
            <div  className='col-3 wrapperLogo'> <a href='https://nkw.framer.website'> <img src={logo}></img> </a></div>
            <article className='col-9 navHeader'>
                <ul>
                    <li><a href='https://nkw.framer.website/#hero'>Início</a></li>
                    <li><a href='https://nkw.framer.website/#fundadores'>Fundadores</a></li>
                    <li><a href='https://nkw.framer.website/#solucoes'>Soluções</a></li>
                    <li><a href='https://nkw.framer.website/#valores'>Valores</a></li>
                    <li><a href='https://nkw.framer.website/#nkw+'>NKW+</a></li>
                    <li><a className='btnContato'>Fale Conosco</a></li>
                </ul>
            </article>
        </header>
    )
}