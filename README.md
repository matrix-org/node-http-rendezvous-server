# Node.js HTTP Rendezvous Server

## This repository is archived

[Synapse](https://github.com/element-hq/synapse) has this capability built in since v1.106.0 and is the preferred implementation. Hence this repository is now archived.

n.b. This repository implemented the [2024 version of MSC4108](https://github.com/matrix-org/matrix-spec-proposals/blob/87f8317a902cd7bc5c2d2d225f71021b3a509e2d/proposals/4108-oidc-qr-login.md) which will be superseded.

---
A standalone implementation of the rendezvous session API proposed by [MSC4108: Mechanism to allow OIDC sign in and E2EE set up via QR code](https://github.com/matrix-org/matrix-spec-proposals/pull/4108).

Functionality constraints:

- the in progress rendezvous do not need to be persisted between server restarts
- the server does not need to work in a clustered/sharded deployment
