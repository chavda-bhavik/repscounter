import { toggleOverflowHidden } from '@/utils/helper';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Icon } from '..';

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
