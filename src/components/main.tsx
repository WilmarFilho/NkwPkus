import CustomForm from './form';

import './assets/index.css'

export default function Main() {

    return (
        <section className="main">

            <article className='titles'>
                <h1>&lt; Seja bem-vindo /&gt;</h1>
                <h2>Como posso te ajudar hoje?</h2>
            </article>

            <CustomForm/>
               

        </section>
    )
}