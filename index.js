const c = require('compact-encoding')
const { ipAddress } = require('compact-encoding-net')
const { compile, array } = require('compact-encoding-struct')

const punchConnection = compile({
  publicKey: c.fixed32,
  bootstrap: array(ipAddress)
})

module.exports = {
  punchConnection
}
