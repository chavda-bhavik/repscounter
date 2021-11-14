module.exports = {
    purge: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    highlight: '#F5CB5C',
                    darker: '#242423',
                    dark: '#333533',
                    white: '#F2F2F2',
                    light: '#E8EDDF',
                    lighter: '#CFDBD5',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['bumblebee'],
        logs: true,
        styled: true,
        base: true,
        utils: true,
    },
};
