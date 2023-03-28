const c = require('compact-encoding')
const { ipAddress } = require('compact-encoding-net')

module.exports.punchConnection = {
  preencode (state, info) {
    c.fixed32.preencode(state)
    if (info.bootstrap) info.bootstrap.forEach(b => ipAddress.preencode(state, b))
  },
  encode (state, info) {
    c.fixed32.encode(state, info.publicKey)
    if (info.bootstrap) info.bootstrap.forEach(b => ipAddress.encode(state, b))
  },
  decode (state) {
    const publicKey = c.fixed32.decode(state)
    const bootstrap = []
    while (state.start < state.end) {
      bootstrap.push(ipAddress.decode(state))
    }
    return { publicKey, bootstrap }
  }
}
