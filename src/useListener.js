import { useContext, useEffect } from 'react';

export default function useListener(create, evts) {
    if (!Array.isArray(evts) || evts.length === 0) {
        throw TypeError('Second argument of useListener must be a non-empty array');
    }

    const deps = [];

    for (const Event of evts) {
        let value;
        try {
            value = useContext(Event);
        } catch (error) {
            throw new TypeError('Second argument of useListener must be an array of events');
        }
        deps.push(value[0]);
    }

    return useEffect(create, deps);
}
