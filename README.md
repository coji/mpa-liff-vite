# Multiple LIFF App in single vite project (MPA) boilerplate.

- Define mutiple app in apps.json

```
{
  "app1": {
    "liffId": {
      "development": "development app1 liff id here",
      "production": "production app1 liff id here"
    }
  },
  "app2": {
    "liffId": {
      "development": "development app2 liff id here",
      "production": "production app2 liff id here"
    }
  }
}
```

- Create a app subdirecty in src directory.

```
src/
  app1
    main.ts
    App.vue
    index.html
    index.css
  app2
    main.ts
    App.vue
    index.html
    index.css
```

- You can style your page, components in [Daisy UI](https://daisyui.com/) and [TailwindCSS](https://tailwindcss.com/).

- You can create custom theme in tailwind.config.js

```
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
```
