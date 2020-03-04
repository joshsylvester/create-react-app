# @svmx/react-scripts
Up to date with [![Generic badge](https://img.shields.io/badge/CRA-v1.1.4-green.svg)](https://github.com/facebook/create-react-app)

## SerivceMax Usage

Install via `create-react-app` using the following command:

```
create-react-app --scripts-version=@svmx/react-scripts
```

## Configurations to run and deploy
Here are few configurations necessary to run and deploy a react project on to salesforce.
- Enter consumer key and consumer secret from your connected app under `.env.development`.
- Make an entry under `.env.development` with `IS_TARGETPAGE_LIGHTNING: true` to be deploy on lightning app page.
- Update your orgnamespace under `.env.development`. Configured default to be `SVMXDEV` and the fallback as `SVMXC` sandbox environment.
- Enter your RestResource service interface name under `ServiceRequest.js`. Targetted to deploy on visualforce page.
- Update the controller name prefixed with orgnamespace in `service.js` and `manifest.json`. Targetted to deploy on lightning app page.
- Refer confluence: [step-by-step guide](https://servicemax.atlassian.net/wiki/spaces/CL/pages/811468685/Step-By-Step+Guide+To+Deploying+ReactJS+Applications+On+Salesforce+Lightning+Container+Page) to deploy on lightning app page.

More details can be found within the documentation: [Create a React Project](https://servicemax.atlassian.net/wiki/spaces/REACT/pages/121773550/Create+a+React+project)


# react-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/facebookincubator/create-react-app).<br>
Please refer to its documentation:

* [Getting Started](https://github.com/facebookincubator/create-react-app/blob/master/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.
