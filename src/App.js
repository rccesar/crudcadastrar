import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  const tarefa = {
    codigo: 0,
    tarefa: '',
    status: ''

  }

  const [btnCadastrar, setBtncadastrar] = useState(true);
  const [tarefas, setTarefas] = useState([]);
  const [objTarefa, setObjTarefa] = useState(tarefa);

  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setTarefas(retorno_convertido));
  }, []);

  const digite = (e) => {
    console.log(e.target);
    setObjTarefa({ ...objTarefa, [e.target.name]: e.target.value });
  }

  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar", {
      method: 'post',
      body: JSON.stringify(objTarefa),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        console.log(retorno_convertido);

        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);

        } else {
          setTarefas([...tarefas, retorno_convertido]);
          alert('Tarefa Registrada')
          limparFormulario()
        }

      })
  }

  const remover = () => {
    fetch("http://localhost:8080/remover/" + objTarefa.codigo, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        console.log(retorno_convertido);

        alert(retorno_convertido.mensagem);

        let vetorTemp = [...tarefas];

        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objTarefa.codigo;
        });

        vetorTemp.splice(indice, 1);

        setTarefas(vetorTemp);
        limparFormulario();

      })
  }

  const alterar = () => {
    fetch("http://localhost:8080/alterar", {
      method: 'put',
      body: JSON.stringify(objTarefa),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        console.log(retorno_convertido);

        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);

        } else {
          alert('Tarefa Atualizada')

          let vetorTemp = [...tarefas];

          let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objTarefa.codigo;
          });

          vetorTemp[indice] = objTarefa;

          setTarefas(vetorTemp);

          limparFormulario()
        }

      })
  }


  const limparFormulario = () => {
    setObjTarefa(tarefa);
    setBtncadastrar(true);

  }

  const selecionarTarefa = (indice) => {
    setObjTarefa(tarefas[indice]);
    setBtncadastrar(false);


  }
  return (
    <div >
      <Formulario botao={btnCadastrar} eventoDigite={digite} cadastrar={cadastrar} obj={objTarefa} cancelar={limparFormulario} remover={remover} alterar={alterar}></Formulario>
      <Tabela vetor={tarefas} selecionar={selecionarTarefa}></Tabela>
    </div>
  );
}

export default App;
