react-use-emitter-and-listener
==============================

**React Hooks for emitting and listening to events with a syntax inspired by
contexts and effects**

This module provides one function and two React Hooks that allow components to
create and emit events with a syntax inspired by contexts, and to listen to
events with a syntax inspired by `useEffect`.

* The `createEvent` function creates and returns a new event. Like a context,
  this event has a `Provider` component that should wrap all components that
  intend to use it.

* The `useEmitter` hook receives an event and returns a function that should be
  called whenever the component wants to emit this event.

* The `useListener` hook is similar to `useEffect`. The difference is that,
  while the latter should use props or states as dependencies, the former should
  use events. Whenever any of the events in the list is emitted, the function is
  called.


Peer dependencies
-----------------

``` json
{
    "@hashiprobr/react-create-state-context": "1.0.6",
    "react": "17.0.2"
}
```


Install
-------

With npm:

```
npm install @hashiprobr/react-use-emitter-and-listener
```

With yarn:

```
yarn add @hashiprobr/react-use-emitter-and-listener
```

If using Expo, add the module to `webpack.config.js`:

``` js
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync({
        ...env,
        babel: {
            dangerouslyAddModulePathsToTranspile: [
                '@hashiprobr/react-create-state-context',
            ],
        },
    }, argv);
    return config;
};
```

If `webpack.config.js` does not exist, create it with:

```
expo customize:web
```


Example
-------

``` js
import React, { useState } from 'react';

import { Text, Button } from 'react-native';

import { createEvent, useEmitter, useListener } from '@hashiprobr/react-use-emitter-and-listener';

const IncrementEvent = createEvent();

function A() {
    const emitIncrement = useEmitter(IncrementEvent);

    return (
        <Button title="+" onPress={emitIncrement} />
    );
}

function B() {
    const [counter, setCounter] = useState(0);

    useListener(() => {
        setCounter(counter + 1);
    }, [IncrementEvent]);

    return (
        <Text>{counter}</Text>
    );
}

export default function MyApp() {
    return (
        <IncrementEvent.Provider>
            <A />
            <B />
        </IncrementEvent.Provider>
    );
}
```
