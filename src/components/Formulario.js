import React, {useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';

const Formulario = ({guardarGasto,guardarCrearGasto}) => {
    const [ nombre, guardarNombre ] = useState('');
    const [ cantidad, guardarCantidad ] = useState(0);
    const [ error, guardarError] = useState(false);
    const agregarGasto = e =>{
        e.preventDefault();

        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        console.log(gasto);
        guardarGasto(gasto);
        guardarCrearGasto(true);
        guardarNombre('');
        guardarCantidad(0);
    }
    return(
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>
            { error ? 
            (
                <Error mensaje="Comprueba la información ingresada y que el presupuesto sea correcto"/>
            ) : 
            (
                null
            )}
            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Comida"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>  
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value),10)}
                />
            </div>

            <input 
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
    );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;