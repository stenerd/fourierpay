import React from 'react';

const LinkStatusBadge = ({ status, other }) => {
    const statusMap = {
        active: 'Active',
        inactive: 'Not Active',
        expired: 'Expired',
        paused: 'Paused',
        terminated: 'Terminated',
    }
  return (
      <p className={
            status === 'active' ? 'py-2 px-2 rounded-lg text-sm uppercase link-status-active' :
            (status === 'inactive' ? 'py-2 px-2 rounded-lg uppercase text-sm link-status-inactive' :
            (status === 'paused' ? 'py-2 px-2 rounded-lg uppercase text-sm link-status-paused' :
            (status === 'expired' ? 'py-2 px-2 rounded-lg uppercase text-sm link-status-expired' :
            'py-2 px-2 rounded-lg text-sm uppercase status-fail2')))}>{statusMap[status]} {other} </p>
  );
}
export default LinkStatusBadge