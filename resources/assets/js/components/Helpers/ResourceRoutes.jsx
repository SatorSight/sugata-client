
//some description
// static - just /bundles etc
// with_from - /bundles/15 - from 15 to n item
// with_self_id - /bundle/1 - send self page id with it
// with_other_data - with some other data

export const MAIN_RESOURCES = Object.freeze({
    page_prefix: 'index',
    static: [
        'bundles',
        'new_issues',
        'main_topics',
        'new_articles',
        'popular_articles',
        'popular_editions',
    ],
    with_from: [
        'more_new_articles',
        'more_popular_articles',
    ]
});

export const BUNDLE_RESOURCES = Object.freeze({
    page_prefix: 'bundle',
    static: ['bundles'],
    with_self_id: [
        'bundle',
        'last_issues',
        'new_articles',
        'popular_articles',
        'popular_editions',
        'last_cover_articles'
    ],
    with_from: [
        'more_new_articles',
        'more_popular_articles'
    ],
});

export const JOURNAL_RESOURCES = Object.freeze({
    page_prefix: 'journal',
    static: ['bundles'],
    with_self_id: [
        'bundle',
        'journal',
        'last_issues',
        'new_articles', // basic_articles_for_last_issue
        'popular_articles', // random_articles_from_non_last_issue
        'same_bundle_journals',
        'issues_cover_articles',
        'rest_issues',
    ],
    with_from: [
        'more_new_articles',
        'more_popular_articles'
    ],
});

export const ISSUE_RESOURCES = Object.freeze({
    page_prefix: 'issue',
    static: ['bundles'],
    with_self_id: [
        'bundle',
        'issue',
        'all_issues',
        'main_topics',
        'new_articles',
        'other_issues',
    ],
    with_from: [
        'more_new_articles',
        // 'more_popular_articles'
    ],
});

export const ALL_ISSUES_JOURNAL_RESOURCES = Object.freeze({
    page_prefix: 'all_issues_journal',
    static: ['bundles'],
    with_self_id: [
        'issues',
    ],
});

export const ALL_ISSUES_BUNDLE_RESOURCES = Object.freeze({
    page_prefix: 'all_issues_bundle',
    static: ['bundles'],
    with_self_id: [
        'issues',
    ],
});

export const ARTICLE_RESOURCES = Object.freeze({
    page_prefix: 'article',
    static: ['bundles'],
    with_self_id: [
        'bundle',
        'journal',
        'issue',
        'article',
        'next_article',
    ],
});
