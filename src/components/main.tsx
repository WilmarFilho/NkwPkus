import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomForm from './form';
import './assets/index.css';

type Mensagem = {
    id: number;
    texto: string;
    tipo: "user" | "bot";
};

export default function Main() {

    const [temMensagem, setTemMensagem] = useState(false);

    const [mensagens, setMensagens] = useState<Mensagem[]>([]);

    const [loading, setLoading] = useState(false);

    const scrollParaFim = () => {
        const chatDiv = document.querySelector('.chat');
        if (chatDiv) {
            chatDiv.scrollTop = chatDiv.scrollHeight;
        }
    };


    const enviarMensagem = async (mensagemUser: string) => {
        const novaMensagem: Mensagem = {
            id: Date.now(),
            texto: mensagemUser,
            tipo: "user",
        };

        if (!temMensagem) setTemMensagem(true);

        const mensagensAtualizadas = [...mensagens, novaMensagem];
        setMensagens(mensagensAtualizadas);
        setLoading(true);

        try {
            const response = await axios.post(
                "https://api.nkwclub.com/api/chat", 
                {
                    mensagens: mensagensAtualizadas.map((msg) => ({
                        tipo: msg.tipo,
                        texto: msg.texto,
                    }))
                }
            );

            const respostaBot = response.data.resposta;
            const textoFormatado = formatarTexto(respostaBot);

            setMensagens((prev) => [
                ...prev,
                { id: Date.now() + 1, texto: textoFormatado, tipo: "bot" },
            ]);
        } catch (error) {
            console.error("Erro ao chamar a API do Laravel:", error);
            setMensagens((prev) => [
                ...prev,
                { id: Date.now() + 1, texto: "Erro ao se conectar. Tente novamente mais tarde.", tipo: "bot" },
            ]);
        } finally {
            setLoading(false);
        }
    };


    // Função para formatar o texto da resposta, se necessário
    const formatarTexto = (texto: string) => {
        // Exemplo simples de formatação, transformando quebras de linha em <br>
        // e marcando partes do texto para negrito ou listas, se necessário.
        let textoFormatado = texto;

        // Transformar listas no formato markdown em HTML
        textoFormatado = textoFormatado.replace(/(\d+\.\s)/g, "<li>").replace(/\n/g, "</li><br>");

        // Adicionar outros tipos de formatação, se necessário
        textoFormatado = textoFormatado.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // Negrito com **texto**

        return textoFormatado;
    };

    useEffect(() => {
        scrollParaFim();
    }, [mensagens]);


    return (
        <section className={`main ${temMensagem ? 'comMensagem' : 'semMensagem'}`}>

            {!temMensagem ? (
                <article className="titles">
                    <h1>&lt; Seja bem-vindo /&gt;</h1>
                    <h2>Como posso te ajudar hoje?</h2>
                </article>
            ) : (
                <div className="chat">
                    {mensagens.map((msg) => (
                        <div key={msg.id} className={` mensagem ${msg.tipo}`}>
                            <div dangerouslySetInnerHTML={{ __html: msg.texto }} />
                        </div>
                    ))}
                    {loading && <div className="mensagem bot">Pensando, espere um pouco ...</div>}
                </div>
            )}

            <CustomForm temMensagem onEnviar={enviarMensagem} />

        </section>
    );
}
