import { useEffect, useRef, useState } from 'react';

// hook taken from:- https://gist.github.com/gragland/b61b8f46114edbcf2a9e4bd5eb9f47f5#gistcomment-3577415
// @ts-ignore-file
export function useKeyPress(options) {
    if (!options || Object.keys(options).length === 0) {
        throw new Error(`No object parameter found use: {userKeys: ... } `);
    }

    // 'options' properties.
    const userKeys = options.userKeys || null;
    const order = options.order || false;
    const ref = options.ref || window;

    // React hooks.
    const [keyPress, setKeyPress] = useState<any>(false);
    const [anyKeyPressed, setAnyKeyPressed] = useState<any>([]); // new with arrays

    // A reference to determine if a key has been pressed already.
    const prevKey = useRef('');

    const settings = {
        type: null,
        objRef: ref,
        downHandler: undefined,
        upHandler: undefined,
        useEffect: null,
        output: null,
    };

    const setData = (settings: any) => {
        // Check that we have a 'userKey'  property
        if (userKeys) {
            // Check if the Object is a string, if so add the 'singleKey' properties to
            // 'option' object.
            if (typeof userKeys === 'string') {
                settings.output = keyPress;
                settings.downHandler = downHandler;
                settings.upHandler = upHandler;
                settings.useEffect = Init;
                settings.type = 'STRING';
            }
            // Check if the Object is an array, if so add the 'multiKeys' properties to
            // 'option' object.
            if (Array.isArray(userKeys)) {
                // @ts-ignore
                settings.output = areKeysPressed(userKeys, anyKeyPressed);
                settings.downHandler = downMultiHandler;
                settings.upHandler = upMultiHandler;
                settings.useEffect = Init;
                settings.type = 'ARRAY';
            }
            if (Number.isInteger(userKeys)) {
                throw new Error(
                    `Invalid 'userKeys' property: must be {userKeys:'KEY'} or {userKeys:[KEY, ...]}`
                );
            }
        } else {
            throw new Error(
                `Invalid 'userKeys' property: must be {userKeys:'KEY'} or {userKeys:[KEY, ...]}`
            );
        }

        return settings;
    };

    const downHandler = ({ key }: any) => {
        // Escape this function if these two values match
        // (proof the key has already been pressed).
        if (prevKey.current === userKeys) return;
        if (key === userKeys) {
            setKeyPress(true);
            // set prevKey for future reference.
            prevKey.current = key;
        }
    };

    const upHandler = ({ key }: any) => {
        if (key === userKeys) {
            setKeyPress(false);
            // reset the value of prevKey
            prevKey.current = '';
        }
    };

    const downMultiHandler = ({ key, repeat }: any) => {
        // NOTE: prevents double key entry in array
        if (repeat) return;

        setAnyKeyPressed((prevState: any) => [...prevState, key]);
    };

    const upMultiHandler = ({ key }: any) => {
        // NOTE: Needed to call on set state again due to how state works.
        // Otherwise would need for the function to dismount and remount which is not wanted.
        setAnyKeyPressed((prevState: any) => [...prevState]);
        setAnyKeyPressed((prevState: any) => [...prevState.filter((item: any) => item !== key)]);
    };

    const areKeysPressed = (keys = [], Pressed = []) => {
        // Create a new Array
        const required = [...keys];

        // Return an array which does not have matching items of
        // 'Pressed'
        const anyOrder = required.filter((itemA) => {
            return !Pressed.some((itemB) => itemB === itemA);
        });

        // Check that 'keys' and 'Pressed' match and that the input
        // entries of 'Pressed' are identically in order.
        const inOrder =
            required.length === Pressed.length &&
            required.every((value, index) => {
                return value === Pressed[index];
            });

        let result;

        // If 'order' has not been set use the 'anyOrder' calculation.
        // otherwise use the 'inOrder' calculation.
        !order ? (result = anyOrder.length === 0) : (result = inOrder);

        return result;
    };

    function Init() {
        useEffect(() => {
            // If 'ref' after initialisation has the property of 'current' then it refers
            // to a referenced element in which case 'element' should refer to THIS.
            // Otherwise proceed with the default state (the window object).
            const element = ref.current ? ref.current : ref;

            // Add event listeners
            element.addEventListener('keydown', settings.downHandler);
            element.addEventListener('keyup', settings.upHandler);
            //console.log('useAllKeyPress - hookAsMount');
            return () => {
                element.removeEventListener('keydown', settings.downHandler);
                element.removeEventListener('keyup', settings.upHandler);
                //console.log('useAllKeyPress - hookAsUnmount');
            };
        }, []); // Empty array ensures that effect is only run on mount and unmount
    }

    /**
     * Configure 'settings' object.
     */
    setData(settings);

    /**
     * Initialise the event listeners
     */
    //@ts-ignore
    settings.useEffect();

    /**
     * Returns a 'boolean' value from keyboard inputs
     */
    return settings.output;
}
/* tslint:disable */
