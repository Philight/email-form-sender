export const sleep = (ms): Promise<unknown> => new Promise(resolve => setTimeout(resolve, ms));
