# punch-connection-encoding

Compact encoding for public keys + boostrap

```  javascript
  const publicKey = Buffer.alloc(32)
  const address = { host: '127.0.0.1', port: 49736 }
  const encoded = c.encode(punchConnection, { publicKey, bootstrap: [address] })
  console.log(encoded.toString())
```
