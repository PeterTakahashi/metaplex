import Arweave from 'arweave';

/**
 * Create an Arweave instance with sane defaults.
 */
function getArweave(): Arweave {
  return new Arweave({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
    logger: console.log,
  });
}

export const getTransaction = async (transactionKey: string) => {
  try {
    const arweave = getArweave();
    const transaction = await arweave.transactions
      .getData(transactionKey, { decode: true, string: true })
      .then((transaction: any) => {
        return transaction;
      });
    return transaction;
  } catch {
    return undefined;
  }
};
