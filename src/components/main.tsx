import CustomForm from './form';
import './assets/index.css';
import iconChat from './assets/iconChat.svg'

export default function Main() {
    //const temMensagem = false;

    const temMensagem = true;

    const mensagensFake = [
        { id: 1, texto: "Olá! Como posso te ajudar?", tipo: "bot" },
        { id: 2, texto: "Quero saber mais sobre os serviços", tipo: "user" },
        { id: 3, texto: "Claro! Temos suporte para gamers, empresas e mais.", tipo: "bot" },
        { id: 4, texto: "Olá! Como posso te ajudar?", tipo: "bot" },
        { id: 5, texto: "Quero saber mais sobre os serviços", tipo: "user" },
        { id: 6, texto: "Claro! Temos suporte para gamers, empresas e mais.", tipo: "bot" },
        { id: 7, texto: "Olá! Como posso te ajudar?", tipo: "bot" },
        { id: 8, texto: "Quero saber mais sobre os serviços", tipo: "user" },
        { id: 9, texto: "Claro! Temos suporte para gamers, empresas e mais.", tipo: "bot" },
    ];


    return (
        <section className="main">

            {!temMensagem ? (
                <article className="titles">
                    <h1>&lt; Seja bem-vindo /&gt;</h1>
                    <h2>Como posso te ajudar hoje?</h2>
                </article>
            ) : (
                <div className='chat'>
                    {mensagensFake.map(msg => (
                        <div key={msg.id} className={`mensagem ${msg.tipo}`}>
                             {msg.texto}
                        </div>
                    ))}
                </div>
            )}

            <CustomForm temMensagem={temMensagem} />

        </section>
    );
}
