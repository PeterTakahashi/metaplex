import { AuctionView } from '../../../hooks';
import { useInstantSaleState } from './useInstantSaleState';
import { i18n } from "@lingui/core"

export const useActionButtonContent = (auctionView: AuctionView): string => {
  const {
    isInstantSale,
    canClaimItem,
    canClaimPurchasedItem,
    canEndInstantSale,
  } = useInstantSaleState(auctionView);

  if (!isInstantSale) {
    return i18n._('Place Bid');
  }

  if (canClaimPurchasedItem) {
    return i18n._('Claim Purchase');
  }

  if (canClaimItem) {
    return i18n._('Claim item');
  }

  if (canEndInstantSale) {
    return i18n._('End sale & claim item');
  }

  return i18n._('Buy now');
};
