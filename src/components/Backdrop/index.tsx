import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { toggleOverflowHidden } from '@/utils/helper';
import gsap from 'gsap';

interface BackdropProps {
    show: boolean;
    onClose: () => void;
}

export const Backdrop: React.FC<BackdropProps> = ({ show, onClose, children }) => {
    const nodeRef = useRef(null);

    useEffect(() => {
        toggleOverflowHidden(show);
        AnimateBackdrop(show);
    }, [show]);

    const AnimateBackdrop = (show: boolean) => {
        if (show) {
            gsap.to(nodeRef.current, {
                duration: 0.1,
                opacity: 1,
                // visibility: 'visible',
                pointerEvents: 'auto',
                ease: 'none',
            });
        } else {
            gsap.to(nodeRef.current, {
                duration: 0.1,
                opacity: 0,
                // visibility: 'hidden',
                pointerEvents: 'none',
                ease: 'none',
            });
        }
    };

    return (
        <div className={classNames('modal')} ref={nodeRef} style={{ visibility: 'visible' }}>
            <div
                className="fixed h-screen w-screen inset-0 cursor-pointer translate-y-"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="modal-box pb-12 sm:pb-6">{children}</div>
        </div>
    );
};
