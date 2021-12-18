import React, { useEffect } from 'react';
import classNames from 'classnames';

import { Icon } from '../Icon';
import { toggleOverflowHidden } from '@/utils/helper';

interface BackdropProps {
    show: boolean;
    onClose: () => void;
}

export const Backdrop: React.FC<BackdropProps> = ({ show, onClose, children }) => {
    useEffect(() => {
        toggleOverflowHidden(show);
    }, [show]);

    return (
        <div className={classNames('modal', { active: show })}>
            <button className="absolute top-5 right-5 rounded-full bg-gray-50" onClick={onClose}>
                <Icon icon="close" className="text-primary-dark" />
            </button>
            {children}
        </div>
    );
};
