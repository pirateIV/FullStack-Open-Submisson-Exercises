import React from 'react';

const Notification = ({ message, status }) => {
  return (
    <>
      {message !== null && (
        <div
          id='message'
          style={{
            color: `${status}`,
            border: `3px solid ${status}`,
          }}>
          {message}
        </div>
      )}
    </>
  );
};

export default Notification;
