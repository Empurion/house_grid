global.log = require('./log')
const hassio = require('./Home-Assistant')
const Grid = require('./Grid')


// Connect to home-assistant
global.ha = new hassio({
  host: '192.168.1.11'
})

global.ha.connect()
  .then(() => {
    ha.on('state:input_boolean.test_switch', data => {
      console.log(data)
    })

    // call a service
  })
  .catch(console.error)

global.ha.on('connection', info => {
  console.log('connection changed', info)
})

global.grid = new Grid()

