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

const GET_PRODUCTO_SUCCESS = "GET:PRODUCTOS_SUCCESS";
const GET_PRODUCTO_SUCCESS_NEW = "GET_PRODUCTOS_SUCCESS_NEW";
const GET_PRODUCTO_SUCCESS_ṔROVIDER = "GET_PRODUCTOS_SUCCESS_ṔROVIDER";
const PRODUCTO_INFO_SUCCESS = "POKE_INFO_SUCCESS";

//reducer

export default function productosReducer(state = dataInitial, action) {
  switch (action.type) {
    case GET_PRODUCTO_SUCCESS:
      return { ...state, ...action.payload };
    case GET_PRODUCTO_SUCCESS_NEW:
      return { ...state, ...action.payload };
    case GET_PRODUCTO_SUCCESS_ṔROVIDER:
      return { ...state, ...action.payload };
      case PRODUCTO_INFO_SUCCESS:
        return { ...state, unProducto:action.payload };    
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
    const res = await axios.get('http://localhost:8082/apiPedidosMps/v1/productos/');
    
    dispatch({
      type: GET_PRODUCTO_SUCCESS,
      payload: res.data,
    });

    console.log("datos solicitados a la api ");

    localStorage.setItem("offset=0", JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const nextGetProductoAction = (a) => async (dispatch, getState) => {
  
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

