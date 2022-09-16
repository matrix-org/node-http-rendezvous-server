# [2.1.0](https://github.com/matrix-org/node-http-rendezvous-server/compare/v2.0.2...v2.1.0) (2022-09-16)


### Features

* add /health endpoint ([51879b1](https://github.com/matrix-org/node-http-rendezvous-server/commit/51879b12c32f670c4385ec9dd816704d892ce700))

## [2.0.2](https://github.com/matrix-org/node-http-rendezvous-server/compare/v2.0.1...v2.0.2) (2022-09-09)


### Bug Fixes

* expose X-Max-Bytes and make allowed headers explicit ([f4f0526](https://github.com/matrix-org/node-http-rendezvous-server/commit/f4f0526b03de57656e2055958d5e1ce7c30a20de))

## [2.0.1](https://github.com/matrix-org/node-http-rendezvous-server/compare/v2.0.0...v2.0.1) (2022-09-09)


### Bug Fixes

* include last-modified time in etag calculation ([063cef2](https://github.com/matrix-org/node-http-rendezvous-server/commit/063cef2f8d54682269ffce2c2e70bbfa7d2208ea))
* respect RZ_PORT environment variable ([2b982b2](https://github.com/matrix-org/node-http-rendezvous-server/commit/2b982b289331acb2504819aab26ffcd90e97eefe))

# [2.0.0](https://github.com/matrix-org/node-http-rendezvous-server/compare/v1.0.0...v2.0.0) (2022-09-07)


### Features

* use Location and X-Max-Bytes headers for POST response ([02e37dc](https://github.com/matrix-org/node-http-rendezvous-server/commit/02e37dccccee580c571daec0cc97148d0a1e1c22))


### BREAKING CHANGES

* POST / no longer returns JSON

# 1.0.0 (2022-09-07)


### Features

* initial prototype for MSC3886 ([c95dca4](https://github.com/matrix-org/node-http-rendezvous-server/commit/c95dca483f1ba37b3bcc26694c4ed6c838e2bb7c))
