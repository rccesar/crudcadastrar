import React, { useEffect, useState } from 'react';
import { FaUpload, FaImage } from "react-icons/fa";


function Formulario({ botao, eventoDigite, cadastrar, obj, cancelar, remover, alterar }) {

    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = false;

        input.click();

        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedImage(reader.result);
                };
                reader.readAsDataURL(file);
                console.log(`Arquivo selecionado: ${file.name}`);
            }
        };
    };

    const viewImage = () => {
        if (selectedImage) {
            alert('Exibindo a imagem'); // Pode ser substituído por uma lógica para exibir em um modal, por exemplo
        } else {
            alert('Nenhuma imagem selecionada');
        }
    };
    return (
        <form>
            <div style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={obj.tarefa}
                    onChange={eventoDigite}
                    name='tarefa'
                    placeholder="Tarefa"
                    className="form-control"
                />
                <button style={{ marginLeft: 1 }} type="button" onClick={handleFileUpload}>
                    <FaUpload />
                </button>
            </div>
            <select
                name="status"
                value={obj.status}
                onChange={eventoDigite}
                className="form-control"
            >
                <option value="" disabled hidden>Selecione...</option>
                <option value="Pendente">Pendente</option>
                <option value="Finalizada">Finalizada</option>

            </select>
            {
                botao
                    ?
                    <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary"></input>
                    :
                    <div>
                        <input type="button" onClick={alterar} value="Alterar" className="btn btn-warning"></input>
                        <input type="button" onClick={remover} value="Remover" className="btn btn-danger"></input>
                        <input type="button" onClick={cancelar} value="Cancelar" className="btn btn-secondary"></input>
                        <button type="button" onClick={viewImage} className="btn btn-warning">
                            Ver imagem <FaImage />
                        </button>
                        {selectedImage && (
                            <div id="image-container">
                                <img src={selectedImage} alt="Imagem Selecionada" style={{ maxWidth: '100%' }} />
                            </div>
                        )}
                    </div>

            }

        </form>
    )
}

export default Formulario;