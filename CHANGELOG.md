## [3.2.1](https://github.com/matrix-org/node-http-rendezvous-server/compare/v3.2.0...v3.2.1) (2024-04-23)


### Bug Fixes

* return error body with 412 response ([ecc8037](https://github.com/matrix-org/node-http-rendezvous-server/commit/ecc80372cad9dd56defda77065ce840675a39352))

# [3.2.0](https://github.com/matrix-org/node-http-rendezvous-server/compare/v3.1.0...v3.2.0) (2024-04-23)


### Bug Fixes

* if not trusting proxy then put port in returned URL ([065952c](https://github.com/matrix-org/node-http-rendezvous-server/commit/065952c335547c1a929c276cd2c59b3f88f892c0))


### Features

* require content-type of text/plain ([632e52a](https://github.com/matrix-org/node-http-rendezvous-server/commit/632e52ab0e79486609e972cab646a6078ecaa061))
* set default maximum payload size to 4KB ([03350b6](https://github.com/matrix-org/node-http-rendezvous-server/commit/03350b68e36c254d2a6fab4d959046916830ecb8))
* use unstable errcode prefix for M_CONCURRENT_WRITE ([4d0d8e3](https://github.com/matrix-org/node-http-rendezvous-server/commit/4d0d8e39f07a7630bfa1d30e594b7adb91b73345))

# [3.1.0](https://github.com/matrix-org/node-http-rendezvous-server/compare/v3.0.1...v3.1.0) (2024-04-09)


### Features

* set `Cache-Control` and `Pragma` headers ([0971868](https://github.com/matrix-org/node-http-rendezvous-server/commit/0971868f5be341998f77805a671ccfee1a8affa7))

## [3.0.1](https://github.com/matrix-org/node-http-rendezvous-server/compare/v3.0.0...v3.0.1) (2024-04-05)


### Bug Fixes

* return CORS headers with non-OPTIONS responses ([6adf872](https://github.com/matrix-org/node-http-rendezvous-server/commit/6adf872035f73b705be85a9b38af140dcfef2021))

# [3.0.0](https://github.com/matrix-org/node-http-rendezvous-server/compare/v2.2.2...v3.0.0) (2024-04-05)


### Features

* support for MSC4108 rendezvous protocol ([#9](https://github.com/matrix-org/node-http-rendezvous-server/issues/9)) ([5ac3f34](https://github.com/matrix-org/node-http-rendezvous-server/commit/5ac3f3488af6f5c48b00c37704774efd390c7fe0))


### BREAKING CHANGES

* support for MSC3886 has been dropped

Bumped all dependencies

## [2.2.2](https://github.com/matrix-org/node-http-rendezvous-server/compare/v2.2.1...v2.2.2) (2024-04-05)


### Bug Fixes

* **deps:** bump express from 4.18.1 to 4.19.2 ([#8](https://github.com/matrix-org/node-http-rendezvous-server/issues/8)) ([35a1112](https://github.com/matrix-org/node-http-rendezvous-server/commit/35a1112d3390ad449f7917b737dbe9b7a4d8cb43))
* **deps:** bump ip from 2.0.0 to 2.0.1 ([#7](https://github.com/matrix-org/node-http-rendezvous-server/issues/7)) ([380a62e](https://github.com/matrix-org/node-http-rendezvous-server/commit/380a62e5594ea34464fe25490df5ed72075c15df))

## [2.2.1](https://github.com/matrix-org/node-http-rendezvous-server/compare/v2.2.0...v2.2.1) (2024-01-09)


### Bug Fixes

* **deps:** bump semver from 5.7.1 to 5.7.2 ([#6](https://github.com/matrix-org/node-http-rendezvous-server/issues/6)) ([12a3457](https://github.com/matrix-org/node-http-rendezvous-server/commit/12a3457e301e6fb334a812bb3bb764a75823bb8b))
* **deps:** upgrade nodemon to 3.0.2 ([fe52f28](https://github.com/matrix-org/node-http-rendezvous-server/commit/fe52f28722126a6f1c5c3c44d5e55459329165bd))

# [2.2.0](https://github.com/matrix-org/node-http-rendezvous-server/compare/v2.1.1...v2.2.0) (2024-01-09)


### Bug Fixes

* **deps:** bump http-cache-semantics from 4.1.0 to 4.1.1 ([#2](https://github.com/matrix-org/node-http-rendezvous-server/issues/2)) ([84fb13e](https://github.com/matrix-org/node-http-rendezvous-server/commit/84fb13e462af34949af92b9d769995c3a9e432f6))


### Features

* upgrade to Node.js 20 ([#4](https://github.com/matrix-org/node-http-rendezvous-server/issues/4)) ([5adc2e3](https://github.com/matrix-org/node-http-rendezvous-server/commit/5adc2e33dd1f0ad401ddffd7ffa97e2d9f3e458f)), closes [#5](https://github.com/matrix-org/node-http-rendezvous-server/issues/5)

## [2.1.1](https://github.com/matrix-org/node-http-rendezvous-server/compare/v2.1.0...v2.1.1) (2023-01-09)


### Bug Fixes

* **deps:** bump json5 from 1.0.1 to 1.0.2 ([#1](https://github.com/matrix-org/node-http-rendezvous-server/issues/1)) ([f3d9f74](https://github.com/matrix-org/node-http-rendezvous-server/commit/f3d9f74336679dc3dd2476e50fb7c21d51c95110))

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
