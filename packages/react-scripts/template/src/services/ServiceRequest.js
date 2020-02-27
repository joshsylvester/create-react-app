import { isEmpty } from 'lodash';

/*
  ServiceRequest will give salesforce specific request parameters with appended url.
  to use ServiceRequest use it like ServiceRequest({url:'', params:{data:'test'}}).
*/

// eslint-disable-next-line prefer-destructuring
const env = process.env;
const proxyServerUrl = env.REACT_APP_SFDC_PROXY_SERVER_URL || '';
const SFDC_ORG_NAMESAPCE = env.REACT_APP_SFDC_ORG_NAMESPACE || 'SVMXC';
const enableHttpHeaders = env.REACT_APP_ENABLE_HTTP_REQUEST_HEADERS === 'true' || false;

const apiStartPointConfig = {
  apiVersion: '',
  getRequestProxyPrefix: proxyServerUrl + (env.REACT_APP_SFDC_GET_REQUEST_PROXY_PREFIX || ''),
  orgNamespace: SFDC_ORG_NAMESAPCE,
  postRequestProxyPrefix: proxyServerUrl + (env.REACT_APP_SFDC_POST_REQUEST_PROXY_PREFIX || ''),
  urlPrefix: '/services/apexrest/',
  urlSuffix: '/svmx/rest/SFAServiceIntf',
};

function buildQueryString(params) {
  if (params && !isEmpty(params)) {
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => {
        if (!params[k]) {
          return '';
        }
        return `${esc(k)}=${esc(params[k])}`;
      })
      .join('&');
  }
  return '';
}

function buildGetApiUrl(url, params) {
  let query = buildQueryString(params);
  query = query && `?${query}`;
  return `url=${url}${query}`;
}

export function buildApiUrl(url, config) {
  if (url) {
    const httpMethod = config && config.method;
    // This is used only in local development environment.
    // eslint-disable-next-line max-len
    const apiStartUrl = `${apiStartPointConfig.urlPrefix}${apiStartPointConfig.orgNamespace}${apiStartPointConfig.urlSuffix}`;
    if (httpMethod === 'GET') {
      // eslint-disable-next-line max-len
      return `${apiStartPointConfig.getRequestProxyPrefix}?${buildGetApiUrl(
        `${apiStartUrl}${url}`,
        config.params,
      )}`;
    }
    if (httpMethod === 'POST') {
      return `${apiStartPointConfig.postRequestProxyPrefix}?url=${apiStartUrl}${url}`;
    }
    return '';
  }
  return url;
}

function ServiceRequest(config) {
  const url = (config && config.url) || '';
  let headers = {};

  if (enableHttpHeaders) {
    headers =
      (config && config.headers) ||
      new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      });
  }
  /* eslint-disable sort-keys */
  const requestConfig = {
    ...config,
    headers,
    method: (config && config.method) || 'GET',
  };
  /* eslint-disable sort-keys */

  if (config && config.method !== 'GET' && config.method !== 'HEAD' && config.requestParams) {
    requestConfig.body = JSON.stringify(config.requestParams);
  }

  const apiUrl = buildApiUrl(url, requestConfig);
  return new Request(apiUrl, requestConfig);
}

ServiceRequest.apiStartPointConfig = apiStartPointConfig;
export { ServiceRequest as default };
