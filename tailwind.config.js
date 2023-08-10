/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
    },
  },
  daisyui:{
    themes:[
      {
        defaultTheme:{
                    'primary':'#1D5D9B',
                    'secondary':'#75C2F6',
                    'accent':'#F4D160',
                    'neutral':'#FBEEAC',
                    'info':'#0079FF',
                    'success':'#5D9C59',
                    'error':'#DF2E38',
                    'snow': '#DDF7E3'
        }
      }
    ]
  },
  plugins: [
    require('daisyui'),
  ],
}


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './index.html',
//     './src/**/*.{js,ts,jsx,tsx}',
// ],
//     daisyui: {
//       themes:[
//         {
//           mytheme: {
//             "primary": "#748DA6",
//             "secondary": "#F000B8",
//             "accent": "#37CDBE",
//             "neutral": "#F5EBEB",
//             "base-100": "#FFFFFF",
//             "error": "#F87272",
//             "white": "fffff",
//           }
//         }
//       ]
//     },
//     theme: {
//       extend: {
//         fontFamily: {
//           'poppins': ['poppins'],
//         },
//       },
//     },
//     plugins: [
//       require("daisyui")
//     ],
//   }