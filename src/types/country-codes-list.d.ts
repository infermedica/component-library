import { CustomArraySettings } from 'country-codes-list';

declare module 'country-codes-list' {
    // eslint-disable-next-line import/prefer-default-export
    export function customArray<Keys extends string>(
        fields?: { [Keys]: `{${string}}` },
        settings?: CustomArraySettings
    ): Record<Keys, string>[];
}
