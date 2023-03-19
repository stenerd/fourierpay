import React from 'react';

const StatusBadge = ({status})=> {
  return (
    <p className={status === 'paid' ? 'py-2 px-2 rounded-lg text-sm uppercase status-paid2' :
      (status === 'pending' ? 'py-2 px-2 rounded-lg uppercase text-sm status-pending2' :
        'py-2 px-2 rounded-lg text-sm uppercase status-fail2')}>{status}</p>
  );
}
export default StatusBadge