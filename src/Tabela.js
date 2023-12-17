import React from 'react';

function Tabela({vetor}) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tarefa</th>
                    <th>Status</th>
                    <th>Selecionar</th>

                </tr>
            </thead>

            <tbody>
                {
                    vetor.map((obj, indice) => (
                        <tr key={indice}>
                            <td>{indice+1}</td>
                            <td>{obj.tarefa}</td>
                            <td>{obj.status}</td>
                            <td><button className="btn btn-success">Selecionar</button></td>

                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Tabela;