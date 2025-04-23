import { useState } from 'react';
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
                            content:
                                "Você é o assistente virtual da NKW, chamado Neko. Responda como um parceiro tecnológico jovem, criativo e inteligente. Seja claro e direto ao ponto, com um tom de conversa moderna.",
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
                        Authorization: `Bearer API AQUI`,
                    },
                }
            );

            const respostaBot = response.data.choices[0].message.content;

            setMensagens((prev) => [
                ...prev,
                { id: Date.now() + 1, texto: respostaBot, tipo: "bot" },
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


    return (
        <section className="main">

            {!temMensagem ? (
                <article className="titles">
                    <h1>&lt; Seja bem-vindo /&gt;</h1>
                    <h2>Como posso te ajudar hoje?</h2>
                </article>
            ) : (
                <div className="chat">
                    {mensagens.map((msg) => (
                        <div key={msg.id} className={`mensagem ${msg.tipo}`}>
                            {msg.texto}
                        </div>
                    ))}
                    {loading && <div className="mensagem bot">Digitando...</div>}
                </div>
            )}

            <CustomForm temMensagem onEnviar={enviarMensagem} />

        </section>
    );
}
