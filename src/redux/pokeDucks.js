import axios from "axios"

// cosntantes, dataInicial toma nuestro estado
const dataInicial = {
  array: [],
  offset: 0
}

//declarar types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'
const ANTERIOR_POKEMONES_EXITO = 'ANTERIOR_POKEMONES_EXITO'

//reducer, procesa las acciones
export default function pokeReducer (state = dataInicial, action){
  switch (action.type){ 
    case OBTENER_POKEMONES_EXITO:
      return {...state, array: action.payload}
    case SIGUIENTE_POKEMONES_EXITO:
      return {...state, array: action.payload.array, offset: action.payload.offset}
    case ANTERIOR_POKEMONES_EXITO:
      return {...state, array: action.payload.array, offset: action.payload.offset}
    default:
      return state
  }
}

//acciones
export const obtenerPokemones = () => async (dispatch, getState) =>{
  //obtner el offset del state
  const {offset} = getState().pokemones
  // otra forma es const offset = getState().pokemones.offset
  console.log (offset)
  try{
    const res = await axios.get (`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
    // res.data.results guarda los pokemones
    //activar switch con dispatch
    dispatch ({
      type: OBTENER_POKEMONES_EXITO,
      //payload es una convencion que se ocupa para enviar datos en un action
      payload: res.data.results 
    })
    
  }catch (error){
    console.log (error)
  }
}

//accion siguientes 20 pokemones
export const siguientesPokemones = (numero) => async (dispatch, getState) =>{

  const {offset} = getState().pokemones
  const siguientes = offset + numero
  try {
    const res = await axios.get (`https://pokeapi.co/api/v2/pokemon?offset=${siguientes}&limit=20`)
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: {
        array: res.data.results,
        offset: siguientes
      }
    })
  }catch (error){
    console.log (error)
  }
}
export const anterioresPokemones = (numero) => async (dispatch, getState) =>{

  const {offset} = getState().pokemones
  const anteriores = offset - numero
  if (anteriores >= 0){
    try {
      const res = await axios.get (`https://pokeapi.co/api/v2/pokemon?offset=${anteriores}&limit=20`)
      dispatch({
        type: SIGUIENTE_POKEMONES_EXITO,
        payload: {
          array: res.data.results,
          offset: anteriores
        }
      })
    }catch (error){
      console.log (error)
    }
  }else{
    document.alert ("NO HAY MENOS PA")
  }
  
}