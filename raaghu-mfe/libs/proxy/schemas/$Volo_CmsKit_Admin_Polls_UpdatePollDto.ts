/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Polls_UpdatePollDto = {
    properties: {
        extraProperties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isReadOnly: true,
            isNullable: true,
        },
        question: {
            type: 'string',
            isRequired: true,
            maxLength: 1024,
            minLength: 1,
        },
        code: {
            type: 'string',
            isRequired: true,
            maxLength: 8,
            minLength: 1,
        },
        widget: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        name: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        showVoteCount: {
            type: 'boolean',
        },
        showResultWithoutGivingVote: {
            type: 'boolean',
        },
        showHoursLeft: {
            type: 'boolean',
        },
        startDate: {
            type: 'string',
            format: 'date-time',
        },
        endDate: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        resultShowingEndDate: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        pollOptions: {
            type: 'array',
            contains: {
                type: 'Volo_CmsKit_Admin_Polls_PollOptionDto',
            },
            isNullable: true,
        },
    },
} as const;
