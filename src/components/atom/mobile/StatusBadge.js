import React from 'react';

const StatusBadgeMobile = ({status})=> {
  return (
    <p className={status === 'paid' ? 'p-0 text-right rounded-lg text-base uppercase m-status-paid2' :
      (status === 'pending' ? 'p-0 text-right rounded-lg uppercase text-base m-status-pending2' :
        'p-0 text-right rounded-lg text-base uppercase m-status-fail2')}>{status}</p>
  );
}
export default StatusBadgeMobile