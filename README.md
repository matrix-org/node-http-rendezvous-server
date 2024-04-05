# Node.js HTTP Rendezvous Server

A standalone implementation of the rendezvous session API proposed by [MSC4108: Mechanism to allow OIDC sign in and E2EE set up via QR code](https://github.com/matrix-org/matrix-spec-proposals/pull/4108).

Functionality constraints:

- the in progress rendezvous do not need to be persisted between server restarts
- the server does not need to work in a clustered/sharded deployment
