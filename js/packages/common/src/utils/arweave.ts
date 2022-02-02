const ARWEAVE_DOMAIN = 'https://arweave.net/';

export const getArweaveData = async (transactionKey: string) => {
  try {
    const getData = fetch(`${ARWEAVE_DOMAIN}${transactionKey}`)
      .then(response => response.json())
      .then(data => data);
    return getData;
  } catch {
    return undefined;
  }
};
