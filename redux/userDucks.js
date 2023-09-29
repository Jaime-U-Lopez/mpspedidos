import firebase from 'firebase/compat/app';


//const o  datos iniciales


const dataInicial={

  loading:false,
  activo:false
}

//type

const LOADING="LOADING"
const USUARIO_ERROR='USUARIO_ERROR'




//reducer


export default function userReducer(state=dataInicial, action ){


  switch (action.type) {
      
    case LOADING:
      return { ...state, loading:true}
    case USUARIO_ERROR:
      return {...dataInicial }
    default:
      
    return{...state}
    
  
  }
}

//action

export const enterUserAction =() => async (  dispatch,getState)=>{

  dispatch({
    type:"LOADING"
  })
  try{

    const   provider=new firebase.auth.GoogleAuthProvider();

  }catch(error){
    console.log(error);
    dispatch({
        type:USUARIO_ERROR,
    })

  }


}
