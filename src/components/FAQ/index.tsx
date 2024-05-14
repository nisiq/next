import Accordion from "../Accordion";

const FAQ = () => {
    return (
        <div className="p-4 bg-white rounded-lg w-[100%] m-11">
            <h1 className="font-bold">Popular</h1>
            <hr className="h-px my-3 bg-palette-line border-0 " />
            <Accordion
                title='Edição de dados'
                answer='Descubra como editar seus registros no diario de bordo, 
            editar suas tarefas e também individual de cada usuário.'/>
            <hr className="h-px my-3 bg-palette-line border-0 " />
            <Accordion
                title='Integração autenticação'
                answer='Mantenha seus dados seguros e respeitando os padrões Bosch. 
            Integre seus aplicativos e aplicações utilizando nosso serviço de autenticação.'/>
            <hr className="h-px my-3 bg-palette-line border-0 " />
            <Accordion
                title='Login individual'
                answer='Tenha o seu próprio usuário para que possa ser acompanhado nas suas atividades' />
            <hr className="h-px my-3 bg-palette-line border-0 " />
        </div>
    )
};

export default FAQ;