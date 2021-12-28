import React from 'react';
import { Link } from 'wouter';
import { Icon } from '../Icon';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    return (
        <header className="navbar shadow-lg bg-primary-dark justify-between sticky top-0">
            <div className="flex-none">
                <Link href="/">
                    <a>
                        <Icon icon="anchor" className="text-primary-highlight" />
                    </a>
                </Link>
            </div>
            <div className="flex-none space-x-5">
                <Link href="/dashboard">
                    <a>
                        <Icon icon="dashboard" className="text-primary-lighter" />
                    </a>
                </Link>
                <Link href="/exercises">
                    <a>
                        <Icon icon="taskList" className="text-primary-lighter" />
                    </a>
                </Link>
            </div>
        </header>
    );
};
