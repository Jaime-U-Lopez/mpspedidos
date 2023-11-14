
'use client';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

import  {useAuth } from './UserContext';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const { state , login, user} = useAuth();
    const [inactiveTimer, setInactiveTimer] = useState(null);
    const handleInactive = () => {
      sessionStorage.removeItem('qwqetd');
      router.push('/login');
    };
    const resetTimer = () => {
      if (inactiveTimer) {
        clearTimeout(inactiveTimer);
      }

      setInactiveTimer(setTimeout(handleInactive, 50000));
    };

    var dato;

    dato = sessionStorage.getItem('qwqetd');



    useEffect(() => {

     
      if (dato=="erdfy") {
       
      }
      else{

        router.push('/login');

        resetTimer();

     
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);

      }
    }, [dato, router]);

    return dato? <WrappedComponent {...props}  />:null;
  };

  return AuthenticatedComponent;
};

export default withAuth;