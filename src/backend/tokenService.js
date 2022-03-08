const SERVICE_TOKEN_NAME = "serviceToken";

export const setServiceToken = (serviceToken) => sessionStorage.setItem(SERVICE_TOKEN_NAME, serviceToken);

export const getServiceToken = () => sessionStorage.getItem(SERVICE_TOKEN_NAME);

export const removeServiceToken = () => sessionStorage.removeItem(SERVICE_TOKEN_NAME);
