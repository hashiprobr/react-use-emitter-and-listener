import { useContext } from 'react';

export default function useEmitter(Event) {
    const [getter, setter] = useContext(Event);

    return () => {
        setter(!getter);
    };
}
