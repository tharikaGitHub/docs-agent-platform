import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import gtmNoscriptPlugin from './plugins/gtm-noscript';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// This branch holds the Agent Manager Cloud docs only. Cloud is always the
// latest, so the docs are not versioned. The self-hosted docs are on main, and
// AI Gateway and AI Workspace (agent-control-plane) are on their own branches.

const config: Config = {
  title: 'Choreo Agent Management',
  tagline: 'Run, govern, observe, evaluate, and secure AI agents at scale',
  favicon: 'img/WSO2-Logo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    // Disabled: on Docusaurus 3.10.2, v4:true pulls in the Rust-based Faster
    // bundler, which has a build-breaking MDX compilation bug when several
    // near-identical versioned docs are processed together (confirmed via
    // bisection against getting-started/on-a-vm.mdx's 5 version copies,
    // reproducible only with v4 enabled). Revisit once that's fixed upstream.
    v4: false,
  },

  // Set the production url of your site here
  url: 'https://wso2.com',
  // Set the /<baseUrl>/ pathname under which the site is served.
  // through to this GitHub Pages site.
  baseUrl: '/agent-platform/docs/cloud/',

  // Set true for GitHub pages deployment.
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wso2', // Usually your GitHub org/user name.
  projectName: 'docs-agent-platform', // Usually your repo name.

  onBrokenLinks: 'throw',

  customFields: {
    searchProvider: 'auto',
  },

  // CookiePro must load before GTM so it can categorize/block tracking
  // scripts pending consent;
  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://wso2.com/#organization',
            name: 'Choreo Labs LLC',
            url: 'https://wso2.com',
            logo: 'https://wso2.com/agent-platform/docs/img/WSO2-Logo.png',
          },
          {
            '@type': 'WebSite',
            '@id': 'https://wso2.com/agent-platform/docs/cloud/#website',
            name: 'Choreo Agent Management Documentation',
            url: 'https://wso2.com/agent-platform/docs/cloud/',
            inLanguage: 'en',
            publisher: {'@id': 'https://wso2.com/#organization'},
          },
        ],
      }),
    },
    {
      tagName: 'script',
      attributes: {
        src: 'https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js',
        type: 'text/javascript',
        charset: 'UTF-8',
        'data-domain-script': '486163bc-a8c5-40d8-b185-c707cc718a23',
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'text/javascript',
      },
      innerHTML: 'function OptanonWrapper() { }',
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        (function(w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
          });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
          j.setAttributeNode(d.createAttribute('data-ot-ignore'));
          j.async = true;
          j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-PSTXMT');
      `,
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Enable mermaid for markdown files
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Enable mermaid theme
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      '@signalwire/docusaurus-plugin-llms-txt',
      {
        content: {
          // Redirect-only pages (src/pages) have no content to convert.
          excludeRoutes: ['/agent-platform/docs/cloud/'],
        },
      },
    ],
    require.resolve('docusaurus-lunr-search'),
    gtmNoscriptPlugin,
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          // baseUrl already ends in /docs/ (see above), so mount the docs
          // plugin at that root instead of nesting another docs/ segment.
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/wso2/docs-agent-platform/edit/agent-management-cloud/',
        },
        blog: false, // Disable blog until we have content
        sitemap: {
          changefreq: null,
          priority: null,
          ignorePatterns: ['/agent-platform/docs/cloud/search/**'],
        },
        theme: {
          // Order matters: amp-theme.css layers the site theme over
          // custom.css and relies on loading second to win on equal
          // specificity. Do not reorder.
          customCss: [
            './src/css/custom.css',
            './src/css/amp-theme.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {

    // Replace with your project's social card
    // image: 'img/amp-social-card.png',
    metadata: [
      {property: 'og:site_name', content: 'Choreo Agent Management'},
      {property: 'og:type', content: 'website'},
    ],
    algolia: {
      appId: 'HGUIB02S86',
      apiKey: '08ce042847a47babb4833e131c226e33',
      indexName: 'Docs-agent-platform Crawler',
      contextualSearch: false,
      searchParameters: {},
      askAi: {
        assistantId: 'X4ZuiOLg5WnL',
      }
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        href: '/get-started/what-is-amp',
        alt: 'Choreo Agent Management Logo',
        src: 'img/WSO2 Agent Manager Logo_Black.svg',
        srcDark: 'img/WSO2 Agent Manager Logo_white.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/wso2/agent-manager',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Overview',
              to: '/get-started/what-is-amp',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/wso2/agent-manager/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/wso2/agent-manager/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/wso2/agent-manager',
            },
            {
              label: 'WSO2',
              href: 'https://wso2.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Choreo Labs LLC. Licensed under Apache License 2.0.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
