import { useState, useRef, useEffect } from 'react';
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

    const chatContainerRef = useRef<HTMLDivElement | null>(null);

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
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "Você é NKW PLUS, o assistente virtual da NKW. Sua missão é ajudar pessoas, mesmo aquelas que não têm muita familiaridade com tecnologia. Seja claro, simples e direto, como um amigo inteligente e criativo. Sempre explique de forma didática, usando exemplos se necessário. Caso não saiba o nome do usuário, pergunte uma vez e use o nome dele nas próximas mensagens. Mantenha um tom jovem, acolhedor e descontraído, como se estivesse conversando com alguém próximo, mas sem perder o profissionalismo."
                        },
                        ...mensagensAtualizadas.map((msg) => ({
                            role: msg.tipo === "user" ? "user" : "assistant",
                            content: msg.texto,
                        })),
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "SUA API AQUI"},
                }
            );

            const respostaBot = response.data.choices[0].message.content;

            const textoFormatado = formatarTexto(respostaBot);

            setMensagens((prev) => [
                ...prev,
                { id: Date.now() + 1, texto: textoFormatado, tipo: "bot" },
            ]);
        } catch (error) {
            console.error("Erro ao chamar a OpenAI:", error);
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
                        <div key={msg.id} className={`mensagem ${msg.tipo}`}>
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
