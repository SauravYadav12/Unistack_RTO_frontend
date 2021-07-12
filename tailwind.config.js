module.exports = {
  purge: {
    enabled: process.env.WEBPACK_DEV_SERVER === 'true' && process.argv.join(' ').indexOf('build') !== -1,
    content: [
      "./src/**/*.{html,ts}",
      "./projects/**/*.{html,ts}"
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        uniblue:{
          100:'#00BBF9'
        },
        unipink:{
          100:'#ff34ac'
        },
        uniyellow:{
          100: '#FEE440'
        }
      }
    },
    
  },
  variants: {},
  plugins: [],
}