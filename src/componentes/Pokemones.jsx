import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { obtenerPokemones, siguientesPokemones, anterioresPokemones } from '../redux/pokeDucks'

const Pokemones = () => {
    /*usamos dispatch para llamar o dispar a la accion
    que esta en pokeDucks*/
    const dispatch = useDispatch()
    /*usamos useSelector para leer el array de pokemones*/
    const pokemones = useSelector (store => store.pokemones.array)
    

  return (
    <div>Pokemones
        <button onClick={() => dispatch(obtenerPokemones())}> Obtener pokemones</button>
        <button onClick={() => dispatch(siguientesPokemones(20))}> siguientes 20</button>
        <button onClick={() => dispatch(anterioresPokemones(20))}> anteriores 20</button>

        <ul>
            {pokemones.map (poke => <li key={poke.name}>{poke.name}</li>)}
        </ul>
    </div>
  )
}

export default Pokemones