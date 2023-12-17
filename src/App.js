import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  const tarefa = {
    codigo: 0,
    tarefa:'',
    status:''

  }

  const[btnCadastrar,setBtncadastrar] = useState(true);
  const[tarefas,setTarefas] = useState([]);
  const [objTarefa,setObjTarefa] = useState(tarefa);

  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setTarefas(retorno_convertido));
  },[]);

  const digite = (e) =>{
    console.log(e.target);
    setObjTarefa({...objTarefa,[e.target.name]:e.target.value});
  }

  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar",{
      method:'post',
      body:JSON.stringify(objTarefa),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      console.log(retorno_convertido);

      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);

      }else{
        setTarefas([...tarefas,retorno_convertido]);
        alert('Tarefa Registrada')
        limparFormulario()
      }

    })
  }

  const limparFormulario = () =>{
    setObjTarefa(tarefa);

  }

  return (
    <div >
      <Formulario botao={btnCadastrar} eventoDigite={digite} cadastrar={cadastrar} obj={objTarefa}></Formulario>
      <Tabela vetor={tarefas}></Tabela>
    </div>
  );
}

export default App;
