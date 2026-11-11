// ==UserScript==
// @name         小黑盒网页社区优化 - 高信息密度版
// @namespace    http://tampermonkey.net/
// @version      2.4.1
// @homepageURL  https://github.com/admin05/xiaoheihe
// @updateURL    https://raw.githubusercontent.com/admin05/xiaoheihe/main/xiaoheihe.user.js
// @downloadURL  https://raw.githubusercontent.com/admin05/xiaoheihe/main/xiaoheihe.user.js
// @description  高信息密度布局：中等图片、紧凑排版、一屏更多帖子
// @author       You
// @match        https://xiaoheihe.cn/*
// @match        https://www.xiaoheihe.cn/*
// @match        https://api.xiaoheihe.cn/*
// @grant        GM_addStyle
// @run-at       document-start
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    const styles = `
        .hb-layout-main__container--left,
        .hb-websit__left-section,
        .hb-view-catalog,
        .hb-website__catalog,
        .hb-website__post-btn,
        .hb-layout__content--right,
        .hb-view-aside,
        .hb-vire-aside__inner,
        .hb-cpt__recent-hot-topic,
        .hb-view-download,
        .hb-view__platforms,
        .hb-view__site-info,
        #page-bbs-community .content > .right {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            min-width: 0 !important;
            max-width: 0 !important;
            flex: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
        }

        .hb-layout__main,
        .hb-website__container,
        .hb-page__app {
            padding: 0 8px !important;
            max-width: 100% !important;
            width: 100% !important;
        }

        /* 将搜索栏、社区图标和帖子列表作为同一列居中。 */
        #page-bbs-community {
            box-sizing: border-box !important;
            width: 100% !important;
            max-width: 1280px !important;
            min-width: 0 !important;
            margin-right: auto !important;
            margin-left: auto !important;
            padding: 0 8px !important;
        }

        #page-bbs-community .content {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
        }

        #page-bbs-community .list,
        #page-bbs-community .bbs-home__content-list {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            margin: 0 !important;
        }

        .hb-layout-main__container--main,
        .hb-layout__content--left {
            max-width: 100% !important;
            width: 100% !important;
            flex: 1 !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        .hb-bbs-home,
        .hb-cpt__scroll-list,
        .bbs-home__content-list,
        #page-bbs-community .hb-bbs-home {
            width: 100% !important;
            max-width: 100% !important;
        }

        .hb-cpt__bbs-content,
        .hb-cpt__bbs-list-content,
        .bbs-home__content-item,
        #page-bbs-community .bbs-home__content-item,
        #page-bbs-community .hb-cpt__bbs-list-content {
            padding: 10px 0 !important;
            margin-bottom: 0 !important;
            border-bottom: 1px solid #f0f0f0 !important;
            width: 100% !important;
            max-width: 100% !important;
        }

        .hb-bbs-home__splitline::after {
            display: none !important;
        }

        .hb-cpt__bbs-content:last-child {
            border-bottom: none !important;
        }

        .hb-cpt-avatar.list-content__avatar {
            --hb-avatar-size: 16px !important;
            --hb-avatar-deraction-size: 24px !important;
        }

        .list-content__avatar img {
            width: 16px !important;
            height: 16px !important;
        }

        .bbs-list-content__header {
            margin-bottom: 4px !important;
            height: 20px !important;
            line-height: 20px !important;
        }

        .header__user {
            gap: 4px !important;
        }

        .list-content__username {
            font-size: 13px !important;
            color: #666 !important;
            font-weight: normal !important;
        }

        .hb-cpt__level-tag.list-content__level {
            transform: scale(0.8) !important;
            transform-origin: left center !important;
        }

        .list-content__medal {
            height: 14px !important;
            width: auto !important;
        }

        .list-cotent__operation-btn {
            padding: 2px !important;
        }

        .list-cotent__operation-btn .hb-icon {
            font-size: 16px !important;
        }

        /* 标题改用稳定的一行省略方式 */
        .bbs-content__title {
            display: block !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            font-size: 15px !important;
            font-weight: 600 !important;
            line-height: 1.4 !important;
            margin-bottom: 4px !important;
            color: #14191e !important;
            max-height: none !important;
        }

        .bbs-content__content {
            font-size: 13px !important;
            line-height: 1.5 !important;
            color: #666 !important;
            margin-bottom: 6px !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            max-height: 39px !important;
        }

        .bbs-content__content .hb-emoji {
            width: 16px !important;
            height: 16px !important;
            vertical-align: middle !important;
        }

        .bbs-content__imgs-wrapper {
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            margin: 6px 0 !important;
            display: flex !important;
            flex-wrap: nowrap !important;
            gap: 6px !important;
            overflow: hidden !important;
        }

        .bbs-content__image {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100px !important;
            height: 100px !important;
            flex: 0 0 100px !important;
            border-radius: 6px !important;
            overflow: hidden !important;
        }

        .bbs-content__image:only-child {
            width: 120px !important;
            height: 120px !important;
            flex: 0 0 120px !important;
        }

        .bbs-content__image img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            border-radius: 6px !important;
        }

        .bbs-content__image .hb-cpt__image--default {
            width: 100% !important;
            height: 100% !important;
        }

        .bbs-content__image .hb-cpt__image--default svg {
            width: 24px !important;
            height: 24px !important;
        }

        .bbs-content__image-cnt {
            display: none !important;
        }

        .bbs-content__bottom-line {
            margin-top: 4px !important;
            height: 22px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
        }

        .content-list__tag-item {
            height: 20px !important;
            padding: 0 6px !important;
            font-size: 11px !important;
            border-radius: 3px !important;
        }

        .content-list__tag-item.small,
        .content-list__tag-item.big {
            background: #f5f5f5 !important;
        }

        .content-tag-icon {
            width: 12px !important;
            height: 12px !important;
            margin-right: 3px !important;
        }

        .content-tag-text {
            font-size: 11px !important;
            color: #666 !important;
        }

        .static-color-suffix-tag {
            display: none !important;
        }

        .content-list__bottom--right {
            display: flex !important;
            gap: 12px !important;
            color: #999 !important;
            font-size: 12px !important;
        }

        .content-list__comment,
        .content-list__like {
            display: flex !important;
            align-items: center !important;
            gap: 3px !important;
        }

        .content-list__comment .hb-icon,
        .content-list__like .hb-icon {
            font-size: 14px !important;
            color: #ccc !important;
        }

        .content-list__comment-cnt,
        .content-list__like-cnt {
            font-size: 12px !important;
            color: #999 !important;
        }

        .bbs-home__topic-list-wrapper {
            padding: 8px 0 !important;
            margin-bottom: 0 !important;
            width: 100% !important;
        }

        #page-bbs-community .bbs-home__topic-list {
            height: 70px !important;
            padding: 0 !important;
        }

        #page-bbs-community .bbs-home__topic-item {
            width: 56px !important;
            min-width: 56px !important;
            margin-right: 12px !important;
        }

        #page-bbs-community .bbs-home__topic-item-icon {
            width: 40px !important;
            height: 40px !important;
        }

        #app:has(#page-bbs-community) main {
            max-width: none !important;
            padding-right: 8px !important;
            padding-left: 8px !important;
        }

        #page-bbs-community .bbs-content__title {
            font-size: 21.25px !important;
        }

        #page-bbs-community .bbs-content__content {
            font-size: 18.75px !important;
            max-height: 56.25px !important;
        }

        #page-bbs-community .list-content__username {
            font-size: 18.75px !important;
        }

        #page-bbs-community .bbs-home__topic-name {
            font-size: 15px !important;
        }

        #page-bbs-community .content-tag-text,
        #page-bbs-community .content-list__tag-item {
            font-size: 16.25px !important;
        }

        #page-bbs-community .content-list__bottom--right,
        #page-bbs-community .content-list__comment-cnt,
        #page-bbs-community .content-list__like-cnt {
            font-size: 17.5px !important;
        }

        #page-bbs-link {
            width: 100% !important;
            max-width: none !important;
        }

        #page-bbs-link .content {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
        }

        #page-bbs-link .content > .right {
            display: none !important;
            visibility: hidden !important;
            width: 0 !important;
            max-width: 0 !important;
            flex: 0 !important;
        }

        #page-bbs-link .list,
        #page-bbs-link .hb-bbs-link__container,
        #page-bbs-link .hb-bbs-link__content {
            width: 100% !important;
            min-width: 0 !important;
        }

        #page-bbs-link .list {
            max-width: 1280px !important;
            margin-right: auto !important;
            margin-left: auto !important;
        }

        #page-bbs-link .hb-bbs-link__container,
        #page-bbs-link .hb-bbs-link__content {
            max-width: 100% !important;
        }

        #page-bbs-link .post__container {
            width: 100% !important;
            max-width: 1200px !important;
            margin-right: auto !important;
            margin-left: auto !important;
            font-size: 22.5px !important;
        }

        #page-bbs-link .post__container .link-section-title {
            font-size: 40px !important;
            line-height: 1.45 !important;
        }

        #page-bbs-link .post__container .link-section-user,
        #page-bbs-link .post__container .link-section-tags,
        #page-bbs-link .post__container .link-section-link-data,
        #page-bbs-link .post__container .info-box__username,
        #page-bbs-link .post__container .link-user__username,
        #page-bbs-link .post__container .link-tags__tag-item,
        #page-bbs-link .post__container .link-data__time,
        #page-bbs-link .post__container .link-data__ip {
            font-size: 20px !important;
        }

        #page-bbs-link .post__container .post__content .hb-editor p,
        #page-bbs-link .post__container .post__content .hb-editor li {
            font-size: 23.75px !important;
            line-height: 1.7 !important;
        }

        #app:has(#page-bbs-link) main {
            max-width: none !important;
            padding-right: 8px !important;
            padding-left: 8px !important;
        }

        .bbs-home__topic-list {
            height: 70px !important;
            padding: 0 !important;
            width: 100% !important;
        }

        .bbs-home__topic-item {
            width: 56px !important;
            margin-right: 12px !important;
        }

        .bbs-home__topic-item-icon {
            width: 40px !important;
            height: 40px !important;
            border-radius: 8px !important;
        }

        .bbs-home__topic-name {
            font-size: 10px !important;
            margin-top: 4px !important;
            color: #666 !important;
        }

        .hb-bbs-home__splitline {
            position: relative !important;
        }

        .hb-view-header {
            height: 50px !important;
            padding: 0 10px !important;
        }

        .view-header__right {
            height: 50px !important;
            width: 100% !important;
        }

        .hb-view-search {
            height: 34px !important;
            flex: 1 !important;
            max-width: 600px !important;
        }

        .search__input-item {
            height: 34px !important;
            font-size: 13px !important;
            padding: 0 12px !important;
        }

        .view-header__user-box {
            height: 50px !important;
        }

        .user-box__avatar {
            --hb-avatar-size: 28px !important;
        }

        .user-box__username {
            font-size: 12px !important;
            margin-left: 6px !important;
        }

        .message-center__btn {
            width: 20px !important;
            height: 20px !important;
            margin-left: 12px !important;
        }

        .message-center__btn .hb-icon {
            font-size: 20px !important;
        }

        ::-webkit-scrollbar {
            width: 6px !important;
            height: 6px !important;
        }

        ::-webkit-scrollbar-thumb {
            background: #ccc !important;
            border-radius: 3px !important;
        }

        .scroll-list__button-group {
            right: 10px !important;
            bottom: 10px !important;
        }

        .scroll-list__top-btn {
            width: 40px !important;
            height: 40px !important;
        }

        .hb-cpt__loading.point {
            height: 40px !important;
            padding: 10px 0 !important;
        }

        .hb-cpt__loading-point {
            width: 6px !important;
            height: 6px !important;
        }

        .pagetual_pageBar {
            height: 40px !important;
            margin: 5px 0 !important;
            font-size: 14px !important;
            width: 100% !important;
            max-width: 100% !important;
        }

        .pagetual_pageBar svg {
            width: 24px !important;
            height: 24px !important;
        }

        .scroll-list__no-more-desc {
            height: 50px !important;
            padding-bottom: 10px !important;
            font-size: 12px !important;
        }

        .scroll-list__to-login {
            height: 80px !important;
        }

        .hb-cpt__pagination--left,
        .hb-cpt__pagination--right {
            display: none !important;
        }

        .hb-header-logo,
        .hb-header-logo__image,
        .hb-header-logo__desc {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
        }
    `;

    /*
     * 重新注入样式。
     * 小黑盒的页面 CSS 会在 document-start 之后加载，
     * 因此页面完全加载后再次注入，避免同样的 !important 规则覆盖本脚本。
     */
    function installStyles() {
        const oldStyle = document.querySelector('#xhh-density-style');
        if (oldStyle) {
            oldStyle.remove();
        }

        const style = document.createElement('style');
        style.id = 'xhh-density-style';
        style.textContent = styles;

        (document.head || document.documentElement).appendChild(style);
    }

    installStyles();

    document.addEventListener('DOMContentLoaded', () => {
        installStyles();
        optimizePosts();
    }, { once: true });

    window.addEventListener('load', () => {
        setTimeout(() => {
            installStyles();
            optimizePosts();
        }, 500);
    }, { once: true });

    function optimizePosts() {
        const posts = document.querySelectorAll(
            '.hb-cpt__bbs-content, .hb-cpt__bbs-list-content, #page-bbs-community .bbs-home__content-item'
        );

        posts.forEach(post => {
            const imgWrapper = post.querySelector('.bbs-content__imgs-wrapper');

            if (imgWrapper) {
                imgWrapper.style.display = 'flex';
                imgWrapper.style.flexWrap = 'nowrap';
                imgWrapper.style.gap = '6px';

                const images = imgWrapper.querySelectorAll('.bbs-content__image');

                images.forEach((img, index) => {
                    if (index >= 3) {
                        img.style.display = 'none';
                        return;
                    }

                    img.style.display = 'block';
                    img.style.position = 'relative';
                    img.style.top = 'auto';
                    img.style.left = 'auto';

                    if (images.length === 1) {
                        img.style.width = '120px';
                        img.style.height = '120px';
                        img.style.flex = '0 0 120px';
                    } else {
                        img.style.width = '100px';
                        img.style.height = '100px';
                        img.style.flex = '0 0 100px';
                    }
                });
            }

            const title = post.querySelector('.bbs-content__title');

            if (title) {
                title.style.display = 'block';
                title.style.whiteSpace = 'nowrap';
                title.style.overflow = 'hidden';
                title.style.textOverflow = 'ellipsis';
                title.style.maxHeight = 'none';
            }

            const content = post.querySelector('.bbs-content__content');

            if (content) {
                content.style.maxHeight = '39px';
                content.style.overflow = 'hidden';
                content.style.textOverflow = 'ellipsis';
                content.style.display = '-webkit-box';
                content.style.webkitLineClamp = '2';
                content.style.webkitBoxOrient = 'vertical';
            }
        });

        const leftSidebar = document.querySelector(
            '.hb-layout-main__container--left'
        );

        const rightSidebar = document.querySelector(
            '.hb-layout__content--right, #page-bbs-community .content > .right'
        );

        if (leftSidebar) {
            leftSidebar.style.display = 'none';
            leftSidebar.style.width = '0';
        }

        if (rightSidebar) {
            rightSidebar.style.display = 'none';
            rightSidebar.style.width = '0';
        }
    }

    const observer = new MutationObserver(mutations => {
        let hasNewContent = false;

        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (
                    node.nodeType === 1 &&
                    (
                        node.classList?.contains('hb-cpt__bbs-content') ||
                        node.classList?.contains('hb-cpt__bbs-list-content') ||
                        node.querySelector?.('.hb-cpt__bbs-content') ||
                        node.querySelector?.('.hb-cpt__bbs-list-content') ||
                        node.classList?.contains('hb-layout-main__container--left') ||
                        node.classList?.contains('hb-layout__content--right') ||
                        node.classList?.contains('right') ||
                        node.classList?.contains('bbs-home__content-item')
                    )
                ) {
                    hasNewContent = true;
                }
            });
        });

        if (hasNewContent) {
            setTimeout(optimizePosts, 100);
        }
    });

    setTimeout(() => {
        const container =
            document.querySelector('.hb-cpt__scroll-list') ||
            document.querySelector('.bbs-home__content-list') ||
            document.body;

        observer.observe(container, {
            childList: true,
            subtree: true
        });
    }, 500);

    setInterval(optimizePosts, 2000);

    console.log(
        '[小黑盒优化] 高信息密度模式已启用：已删除两侧边栏 | 中等图片 | 一屏更多内容'
    );
    document.documentElement.dataset.xhhDensityScript = '2.4.1';
        // 当前版本话题页布局优化
    const topicStyles = `
        #page-topic-link {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
        }

        #page-topic-link .topic-link__content {
            width: 100% !important;
            max-width: none !important;
            padding: 0 8px !important;
            margin: 0 !important;
        }

        #page-topic-link .topic-link__main {
            width: 100% !important;
            max-width: none !important;
            min-width: 0 !important;
            flex: 1 1 auto !important;
            margin: 0 !important;
        }

        #page-topic-link .topic-link__panel {
            width: 100% !important;
            max-width: none !important;
        }

        #page-topic-link .topic-link__list {
            width: 100% !important;
            max-width: none !important;
        }

        #page-topic-link .topic-link__right {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            min-width: 0 !important;
            max-width: 0 !important;
            flex: 0 0 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
        }

        #page-topic-link .topic-link__item {
            width: 100% !important;
            max-width: none !important;
            padding: 10px 0 !important;
            margin: 0 !important;
            border-bottom: 1px solid #f0f0f0 !important;
        }

        #page-topic-link .topic-link__splitline::after {
            display: none !important;
        }
    `;

    function installTopicStyles() {
        let style = document.querySelector('#xhh-topic-style');

        if (!style) {
            style = document.createElement('style');
            style.id = 'xhh-topic-style';
            document.head.appendChild(style);
        }

        style.textContent = topicStyles;
    }

    installTopicStyles();

    const topicObserver = new MutationObserver(() => {
        if (document.querySelector('#page-topic-link')) {
            installTopicStyles();
        }
    });

    topicObserver.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
