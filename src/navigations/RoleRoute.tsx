import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import {useAppSelector} from 'hooks';

type Props = {
  requireRoles?: string[];
  children: React.ReactNode;
};

const RoleRoute: React.FC<Props> = ({ children, requireRoles = [] }) => {
  // const role = useAppSelector(roleSelector);
  const role = 'admin';

  const navigate = useNavigate();

  useEffect(() => {
    if (!role || requireRoles.length === 0) return;

    const checkRole = requireRoles.includes(role);
    if (!checkRole) {
      // navigate(PATH_NAME.PLAY_BACKGROUND);
      // alert('Permission denied');
    }
  }, [navigate, role, requireRoles]);

  return children;
};

export default RoleRoute;
