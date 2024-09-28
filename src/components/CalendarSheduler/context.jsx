import React, { createContext, useRef } from 'react';

export const SchedulerContext = createContext();

export const SchedulerProvider = ({ children }) => {
    const calendarRef = useRef(null);

    return (
        <SchedulerContext.Provider value={calendarRef}>
            {children}
        </SchedulerContext.Provider>
    );
};
