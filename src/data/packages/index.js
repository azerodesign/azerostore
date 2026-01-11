
import { appPackages } from './assetapp';
import { editingPackages } from './assetediting';
import { topupPackages } from './topup-game';

export const getPackagesByCategory = (category) => {
    switch (category) {
        case 'Topup':
            return topupPackages;
        case 'Editing':
            return editingPackages;
        case 'Apk Premium':
        default:
            return appPackages;
    }
};
