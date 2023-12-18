import React from 'react';

function Formulario({ botao,eventoDigite,cadastrar,obj,cancelar,remover,alterar}) {
    return (
        <form>
            <input type="text" value={obj.tarefa} onChange={eventoDigite} name='tarefa' placeholder="Tarefa" className="form-control"></input>
            <input type="text" value={obj.status} onChange={eventoDigite} name='status' placeholder="Status" className="form-control"></input>
            {
                botao
                    ?
                    <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary"></input>
                    :
                    <div>
                        <input type="button" onClick={alterar} value="Alterar" className="btn btn-warning"></input>
                        <input type="button" onClick={remover} value="Remover" className="btn btn-danger"></input>
                        <input type="button" onClick={cancelar} value="Cancelar" className="btn btn-secondary"></input>
                    </div>
            }

        </form>
    )
}

export default Formulario;