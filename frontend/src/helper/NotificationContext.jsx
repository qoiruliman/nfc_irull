import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => {
        setNotification(null);
      }, notification.duration || 3000);

      return () => clearTimeout(timeout);
    }
  }, [notification]);

  const showNotification = (message, type = "info", duration = 3000) => {
    setNotification({ message, type, duration });
  };
  console.log(children);
  console.log(notification);
  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div className={`notif ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};
