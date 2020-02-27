import LCC from 'lightning-container';
import ServiceRequest from './ServiceRequest';

function processResult(result, event, callback, context) {
  let ret = { success: false };
  if (event.status === true) {
    // typically replace is not required
    // in this case controller is returning the JSON.serialize(objSFA_RestResponse) hence replace
    ret = JSON.parse(result.replace(/&quot;/g, '"'));
  }
  callback.call(context, ret, event);
}

function makeJsrRequest(
  jsrActionMappingKey,
  requestParams, // Actual Request Params will go here..
  callback,
  context,
) {
  const requestParamsStr = JSON.stringify(requestParams);
  LCC.callApex(
    `SVMXDEV.SFA_Configuration.${jsrActionMappingKey}`,
    requestParamsStr,
    (result, event) => {
      processResult(result, event, callback, context);
    },
    { escape: true },
  );
}

/**
 *
 * @param {request configuration} config
 * @RemoteAction Apex Controller method calls from LCC.callApex
 */
export function handleRemoteCallApex(config) {
  const { jsrActionMappingKey, requestParams = {} } = config;
  const jsrResponseAsPromise = new Promise((resolve, reject) => {
    const jsrResponseCallback = (jsrResult, jsrEvent) => {
      if (jsrEvent.status) {
        resolve(jsrResult);
      } else if (jsrEvent.type === 'exception') {
        // eslint-disable-next-line no-console
        console.error('JSR Exception Event Type :', jsrEvent);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          message: jsrEvent.message,
          success: false,
        });
      } else {
        // eslint-disable-next-line no-console
        console.error('JSR Unknown Response Event Type::', jsrEvent);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          message: jsrEvent.message,
          success: false,
        });
      }
    };

    if (jsrActionMappingKey) {
      makeJsrRequest(
        jsrActionMappingKey,
        requestParams, // Actual Request Params will go here..
        jsrResponseCallback,
        this,
      );
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        error: 'jsrActionMappingKey not defined in the request.',
        success: false,
      });
    }
  });
  return jsrResponseAsPromise;
}

/**
 * The following is accepted structure of Config
 * config = {
 *    jsrActionMappingKey:'',
 *    requestParams:{}
 *    jsrActionParams:{
 *      escape: false,
 *      buffer: false,
 *       timeout: 120000, // Maximum Limit as per SFDC is : 120 Seconds
 *     },
 *   }
 * @param config
 * @returns {Promise<any>}
 */
export function handleRemoteInvokeAction(config) {
  const isJsrDefined = (window
    && window.SVMX_SFA_JSR);
  const defaultActionParams = {
    buffer: false,
    escape: false,
    timeout: 120000, // Maximum Limit as per SFDC is : 120 Seconds
  };
  const methodSpecificJsrActionParams = config.jsrActionParams || {};
  const jsrActionParams = { ...defaultActionParams, ...methodSpecificJsrActionParams };

  const { jsrActionMappingKey, requestParams = {} } = config;
  const jsrResponseAsPromise = new Promise((resolve, reject) => {
    const jsrResponseCallback = (jsrResult, jsrEvent) => {
      if (jsrEvent.status) {
        resolve(jsrResult);
      } else if (jsrEvent.type === 'exception') {
        // eslint-disable-next-line no-console
        console.error('JSR Exception Event Type :', jsrEvent);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          message: jsrEvent.message,
          success: false,
        });
      } else {
        // eslint-disable-next-line no-console
        console.error('JSR Unknown Response Event Type::', jsrEvent);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          message: jsrEvent.message,
          success: false,
        });
      }
    };

    if (isJsrDefined && jsrActionMappingKey) {
      window.SVMX_SFA_JSR.makeJsrRequest(
        jsrActionMappingKey,
        requestParams, // Actual Request Params will go here..
        jsrResponseCallback,
        this,
        jsrActionParams,
      );
    } else {
    // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        error: 'SVMX_SFA_JSR is not defined in  window ' +
        'scope or jsrActionMappingKey Defined in the request.',
        success: false,
      });
    }
  });
  return jsrResponseAsPromise;
}

export async function handleLocal(config) {
  const serviceRequest = ServiceRequest(config);
  const result = await fetch(serviceRequest);
  return result.json();
}

export function fetchData(config) {
  if (window && window.isRemote) {
    const isTargetLightningPage = window && window.isTargetLightningPage;
    if (typeof isTargetLightningPage !== 'undefined' && isTargetLightningPage) {
      return handleRemoteCallApex(config);
    }

    return handleRemoteInvokeAction(config);
  }
  return handleLocal(config);
}
