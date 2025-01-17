# CHANGELOG

## Release Candidate

## v23.16-beta

### Compatibility

Tested with Seacat Auth service [v23.16-beta](https://github.com/TeskaLabs/seacat-auth/releases/tag/v23.16-beta)

### Features

- ASAB WebUI submodule version bump [[c7d682a](https://github.com/TeskaLabs/asab-webui/commit/c7d682ad8f08e432ddbed2c0d21f16a73b23bd58)] commit (INDIGO Sprint 230414, [!29](https://github.com/TeskaLabs/seacat-admin-webui/pull/29))

- Update access and edit resources in SeaCat Admin application (INDIGO Sprint 230414, [!28](https://github.com/TeskaLabs/seacat-admin-webui/pull/28))

- Remove Homepage (INDIGO Sprint 230414, [!28](https://github.com/TeskaLabs/seacat-admin-webui/pull/28))

### Bugfix

- Version bump of ASAB WebUI with fix on userinfo loop when session expiration time is set to small values (INDIGO Sprint 230414, [!29](https://github.com/TeskaLabs/seacat-admin-webui/pull/29))

## v23.13-beta

### Compatibility

Tested with Seacat Auth service [v23.13-beta](https://github.com/TeskaLabs/seacat-auth/releases/tag/v23.13-beta)

### Features

- ASAB WebUI submodule version bump [[1960466](https://github.com/TeskaLabs/asab-webui/commit/1960466a45d0c48ec279e703317ebf0a59fdcbda)] commit (INDIGO Sprint 230317, [!22](https://github.com/TeskaLabs/seacat-admin-webui/pull/22))

### Refactoring

- Dropdown menu used to assign `tenants` nad `roles` to specific `Credentials` has been refactored to offer more data than the initial limit, upon clicking the 'More ...' button. (INDIGO Sprint 230203, [!14](https://github.com/TeskaLabs/seacat-admin-webui/pull/14))

- Refactor ClientDetail and ClientCreate components, refactor URI inputs to new format, refactor client editing (INDIGO Sprint 230203, [!18](https://github.com/TeskaLabs/seacat-admin-webui/pull/18))

- Remove react-helmet from the package.json (INDIGO Sprint 230216, [!20](https://github.com/TeskaLabs/seacat-admin-webui/pull/20))

- Webpack V4 to V5 migration. (INDIGO Sprint 230303, [!16](https://github.com/TeskaLabs/seacat-admin-webui/pull/16))

- Refactor Clients. Add new inputs `authorize_uri` and `redirect_uri_validation_method`. Refactor ClientDetail and ClientCreate to new format (divide to the cards). Update locales (INDIGO Sprint 230317, [!22](https://github.com/TeskaLabs/seacat-admin-webui/pull/22))

- Update locales. Add missing and remove unused locales (INDIGO Sprint 230317, [!27](https://github.com/TeskaLabs/seacat-admin-webui/pull/27))

### Bugfix

- Fix responses in Clients and Tenant containers causing errors on undefined value. Closing issue [!24](https://github.com/TeskaLabs/seacat-admin-webui/issues/24). (INDIGO Sprint 230317, [!25](https://github.com/TeskaLabs/seacat-admin-webui/pull/25))

## v23.5

### Features

- ASAB WebUI submodule version bump [[186b907](https://github.com/TeskaLabs/asab-webui/commit/186b907f3b1adef77d8664dbc5d68e3ee9d84ac2)] commit (INDIGO Sprint 230120, [!17](https://github.com/TeskaLabs/seacat-admin-webui/pull/17))

### Refactoring

- Add new input `cookie_domain` to Clients. Fix min-max height styles for CustomComponent (INDIGO Sprint 230120, [!15](https://github.com/TeskaLabs/seacat-admin-webui/pull/15))

## v23.4

### Compatibility

- [x] **SeaCat Auth UI `v23.4` or newer**
- [x] **SeaCat Auth `v23.3` or newer**

⚠️ Due to implementation of new features, invitation will not work with SeaCat Auth service versions older than `v23.3`

### Features

- ASAB WebUI submodule version bump [[25d5a5c](https://github.com/TeskaLabs/asab-webui/commit/25d5a5ce97c6f2286525127cc3a31531b03312f3)] commit (INDIGO Sprint 230106, [!8](https://github.com/TeskaLabs/seacat-admin-webui/pull/8))

- Create invitation components (INDIGO Sprint 230106, [!8](https://github.com/TeskaLabs/seacat-admin-webui/pull/8))

### Refactoring

- Add new input `preferred_client_id` to ClientCreateContainer (INDIGO Sprint 221209, [!7](https://github.com/TeskaLabs/seacat-admin-webui/pull/7))

- Replace `phone_number` with `phone` and `preferred_username` with `username` (INDIGO Sprint 221209, [!10](https://github.com/TeskaLabs/seacat-admin-webui/pull/10))

- Update alert responses with full message from the service and prolong the time of the error message to 30s (INDIGO Sprint 230106, [!8](https://github.com/TeskaLabs/seacat-admin-webui/pull/8))

- Refactorization of CustomDataContainer to prevent passing invalid format of `uri` prop. Added documentation. (INDIGO Sprint 221209, [!11](https://github.com/TeskaLabs/seacat-admin-webui/pull/11))

## v22.48

### Compatibility

- [x] **ASAB UI `v22.48` or newer**
- [x] **SeaCat Auth `v22.48` or newer**

⚠️ Due to breaking changes in the OpenID Connect module, tenant authorization will not work with older versions of SeaCat Auth service and ASAB UI based apps.

### Features

- ASAB WebUI submodule version bump [[e7c9b7eb](https://github.com/TeskaLabs/asab-webui/commit/e7c9b7eb60eaba9cae39ea18d569301dcc7500c4)] commit (INDIGO Sprint 221125, [!6](https://github.com/TeskaLabs/seacat-admin-webui/pull/6))

### Refactoring

- Fix the height of the ClientDetailContainer card in edit mode (INDIGO Sprint 221125, [!5](https://github.com/TeskaLabs/seacat-admin-webui/pull/5))

## v22.46

### Features

- ASAB WebUI submodule version bump [[bd1bb40](https://github.com/TeskaLabs/asab-webui/commit/bd1bb40c82badf4c8363bbc077d7b67320ad59e6)] commit (INDIGO Sprint 221111, [!3](https://github.com/TeskaLabs/seacat-admin-webui/pull/3))

### Refactoring

- Refactor put and post requests in Credentials. When creating credentials, phone and email will be send in a body of a request only when filled in. When updating the credentials, phone or email will be defined in a request body as `null` if value not specified. (INDIGO Sprint 221111, [!3](https://github.com/TeskaLabs/seacat-admin-webui/pull/3))


### Bugfix

## v22.45

- Initialize SeaCat Admin repo with content (INDIGO Sprint 221031, [!2](https://github.com/TeskaLabs/seacat-admin-webui/pull/2))
