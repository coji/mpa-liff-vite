module.exports = {
  content: ['./src/**/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'dark',
      {
        app1: {
          primary: '#a991f7',
          secondary: '#f6d860',
          accent: '#37cdbe',
          neutral: '#3d4451',
          'base-100': '#ffffff',
        },
      },
      {
        app2: {
          primary: '#991fa9',
          secondary: '#d860f6',
          accent: '#cdbe37',
          neutral: '#51443d',
          'base-100': '#aaaaaa',
        },
      },
    ],
  },
}
