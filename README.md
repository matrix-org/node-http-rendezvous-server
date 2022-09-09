# Node.js HTTP Rendezvous Server

A standalone implementation of [MSC3886: Simple rendezvous capability](https://github.com/matrix-org/matrix-spec-proposals/pull/3886).

Functionality constraints:

- the in progress rendezvous do not need to be persisted between server restarts
- the server does not need to work in a clustered/sharded deployment
- no authentication is needed for use of the server
