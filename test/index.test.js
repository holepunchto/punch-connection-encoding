const c = require('compact-encoding')
const { punchConnection } = require('../index.js')
const test = require('brittle')

test('encode and decode', (t) => {
  t.plan(5)

  const publicKey = Buffer.alloc(32)
  const address = { host: '127.0.0.1', port: 8080 }
  const encoded = c.encode(punchConnection, { publicKey, bootstrap: [address] })

  t.ok(encoded)

  const decoded = c.decode(punchConnection, encoded)

  t.ok(Buffer.compare(publicKey, decoded.publicKey) === 0)
  t.is(decoded.bootstrap.length, 1)
  t.is(decoded.bootstrap[0].host, '127.0.0.1')
  t.is(decoded.bootstrap[0].port, 8080)
})

test('bootstrap array', (t) => {
  t.plan(7)

  const publicKey = Buffer.alloc(32)
  const addressA = { host: '127.0.0.1', port: 8080 }
  const addressB = { host: '128.0.0.1', port: 8081 }
  const encoded = c.encode(punchConnection, { publicKey, bootstrap: [addressA, addressB] })

  t.ok(encoded)

  const decoded = c.decode(punchConnection, encoded)

  t.ok(Buffer.compare(publicKey, decoded.publicKey) === 0)
  t.is(decoded.bootstrap.length, 2)
  t.is(decoded.bootstrap[0].host, '127.0.0.1')
  t.is(decoded.bootstrap[0].port, 8080)
  t.is(decoded.bootstrap[1].host, '128.0.0.1')
  t.is(decoded.bootstrap[1].port, 8081)
})

test('bootstrap empty array', (t) => {
  t.plan(3)

  const publicKey = Buffer.alloc(32)
  const encoded = c.encode(punchConnection, { publicKey, bootstrap: [] })

  t.ok(encoded)

  const decoded = c.decode(punchConnection, encoded)

  t.ok(Buffer.compare(publicKey, decoded.publicKey) === 0)
  t.is(decoded.bootstrap.length, 0)
})

test('bootstrap undefined array', (t) => {
  t.plan(3)

  const publicKey = Buffer.alloc(32)
  const encoded = c.encode(punchConnection, { publicKey })

  t.ok(encoded)

  const decoded = c.decode(punchConnection, encoded)

  t.ok(Buffer.compare(publicKey, decoded.publicKey) === 0)
  t.is(decoded.bootstrap.length, 0)
})
