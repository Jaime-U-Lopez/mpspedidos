import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventName, setEventName] = useState('');

  const setEvent = (name) => {
    setEventName(name);
  };

  return (
    <EventContext.Provider value={{ eventName, setEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  return useContext(EventContext);
};