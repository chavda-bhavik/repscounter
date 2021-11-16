import React from 'react';

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <div className="min-h-screen flex flex-col">{children}</div>;
};
