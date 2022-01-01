import { useEffect, useState } from "react";

export function useOnlineStatus() {
    const [online, setOnline] = useState(window.navigator.onLine)

    const makeOnline = () => setOnline(true);
    const makeOffline = () => setOnline(false);

    useEffect(() => {
        window.addEventListener("online", makeOnline);
        window.addEventListener("offline", makeOffline);
        return () => {
            window.removeEventListener('online', makeOnline);
            window.removeEventListener('offline', makeOffline);
        }
    }, [])

    return online;
}