import axios from "axios";

//constantes  almacenan la informacion

const dataInitial = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  unPokemon:[]
};
//tipes  son como variables de entorno

const GET_PEDIDOS_SUCCESS = "GET:PEDIDOS_SUCCESS";
const GET_PEDIDOS_SUCCESS_NEW = "GET_PEDIDOS_SUCCESS_NEW";
const GET_PEDIDOS_SUCCESS_ṔROVIDER = "GET_PEDIDOS_SUCCESS_ṔROVIDER";
const PEDIDOS_INFO_SUCCESS = "POKE_INFO_SUCCESS";

//reducer

const res = await axios.get(
  "http://localhost:8082/apiPedidosMps/v1/productos/"
);

console.log(res);


export default function pedidosReducer(state = dataInitial, action) {
  switch (action.type) {
    case GET_PEDIDOS_SUCCESS:
      return { ...state, ...action.payload };
    case GET_PEDIDOS_SUCCESS_NEW:
      return { ...state, ...action.payload };
    case GET_PEDIDOS_SUCCESS_ṔROVIDER:
      return { ...state, ...action.payload };
      case PEDIDOS_INFO_SUCCESS :
        return { ...state, unPokemon:action.payload };
    
      default:
      return state;
  }
}

//acciones
export const getProductoAction = () => async (dispatch, getState) => {
  if (localStorage.getItem("offset=0")) {
    console.log("datos guardardos");
    dispatch({
      type: GET_PRODUCTO_SUCCESS,
      payload: JSON.parse(localStorage.getItem("offset=0")),
    });
    return;
  }

  try {
    const res = await axios.get(
      "http://localhost:8082/apiPedidosMps/v1/productos/"
    );
    dispatch({
      type: GET_PRODUCTO_SUCCESS,
      payload: res.data,
    });

    console.log("datos solicitados a la api " );

    localStorage.setItem("offset=0", JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const nextGetPokemAction = (a) => async (dispatch, getState) => {
  
  console.log(a)
  const { next } = getState().pokemones;
  const { results } = getState().pokemones;

  try {
    if (results.length === 0) {
      console.log("no hay valores para mostrar");
      return;
    }
    if (localStorage.getItem(next)) {
      console.log("datos guardardos next");
      dispatch({
        type: GET_POKEMON_SUCCESS_NEW,
        payload: JSON.parse(localStorage.getItem(next)),
      });
      return;
    }

    const res = await axios.get(next);

    dispatch({
      type: GET_POKEMON_SUCCESS_NEW,
      payload: res.data,
    });
    localStorage.setItem(next, JSON.stringify(res.data));

    console.log("Hola cambiando las secciones");
  } catch (error) {
    console.log(error);
  }
};

export const providerPokemon = () => async (dispatch, getState) => {
  const { next } = getState().pokemones;

  const { previous } = getState().pokemones;

  try {
    if (next === null || previous === null) {
      console.log("no hay valores para mostrar");
      return;
    }

    if (localStorage.getItem(previous)) {
      dispatch({
        type: GET_POKEMON_SUCCESS_ṔROVIDER,
        payload: JSON.parse(localStorage.getItem(previous)),

      });
    console.log("devolviendomente desde LocalStorage ");
      return
    }

    const res = await axios.get(previous);
    dispatch({
      type: GET_POKEMON_SUCCESS_ṔROVIDER,
      payload: res.data,
    });

    localStorage.setItem(previous, JSON.stringify(res.data));
    console.log("devolviendomente al menu anterior");
  } catch (error) {
    console.log(error);
  }
};


export const DetallePokemon =(url="https://pokeapi.co/api/v2/pokemon/1/")=> async (dispatch, getState)=>{

  try{
    if (localStorage.getItem(url)) {
      dispatch({
        type: POKE_INFO_SUCCESS,
        payload: 
        JSON.parse(localStorage.getItem(url)),

      });
    console.log("devolviendomente desde LocalStorage ");
      return
    }

    const res = await axios.get(url)

    console.log(res.data)
    dispatch({

      type: POKE_INFO_SUCCESS,
      payload:
      {
        nombre:res.data.name,
        ancho:res.data.weight,
        alto:res.data.height,
        foto:res.data.sprites.other.dream_world.front_default
      }
    })

    localStorage.setItem(url, JSON.stringify({
      nombre:res.data.name,
      ancho:res.data.weight,
      alto:res.data.height,
      foto:res.data.sprites.other.dream_world.front_default

    }))
  }catch (error) {
    console.log(error)
 }

}


