import { useContext, useEffect } from 'react';

export default function useListener(create, evts) {
    if (!Array.isArray(evts) || evts.length === 0) {
        throw TypeError('Second argument of useListener must be a non-empty array');
    }

    const deps = [];

    try {
        for (const Event of evts) {
            const value = useContext(Event);
            deps.push(value[0]);
        }
    } catch (error) {
        throw new TypeError('Second argument of useListener must be an array of events');
    }

    return useEffect(create, deps);
}
