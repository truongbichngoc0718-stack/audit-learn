// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://audit-learning-hub.vercel.app',
  integrations: [
    starlight({
      title: 'Audit Learning Hub',
      description: 'BISC Training Center · Audit Simulation 2026: học kiểm toán theo phần hành, thực hành trên case Biscore.',
      defaultLocale: 'root',
      locales: { root: { label: 'Tiếng Việt', lang: 'vi' } },
      customCss: ['./src/styles/bisc.css'],
      lastUpdated: false,
      head: [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } }],
      pagination: true,
      components: {
        PageTitle: './src/components/overrides/PageTitle.astro',
      },
      sidebar: [
        { label: 'Bắt đầu', items: [
          { label: 'Trang chủ', link: '/' },
          { label: 'Tiến độ & ghi chú của tôi', link: '/tien-do/' },
          { label: 'Mới cập nhật', link: '/moi-cap-nhat/' },
        ] },
        { label: 'A0 · Lộ trình', items: [{ autogenerate: { directory: 'a/0' } }] },
        { label: 'A1 · Nền tảng', items: [{ autogenerate: { directory: 'a/1' } }] },
        { label: 'A2 · Materiality', items: [{ autogenerate: { directory: 'a/2' } }] },
        { label: 'A3 · Phần hành', items: [{ autogenerate: { directory: 'a/3' } }] },
        { label: 'A4 · Ghi finding', items: [{ autogenerate: { directory: 'a/4' } }] },
        { label: 'Thư viện', collapsed: true, items: [{ autogenerate: { directory: 'thu-vien' } }] },
        { label: 'B · Excel & Power BI', collapsed: true, items: [{ autogenerate: { directory: 'b' } }] },
        { label: 'C · ACCA Audit & Assurance', collapsed: true, items: [
          { label: 'Start here · the elite method', link: '/c/' },
          { label: 'C1 · Audit Master Map', link: '/c/1/c1-master-map/' },
          { label: 'C2 · Audit operating system', link: '/c/2/c2-operating-system/' },
          { label: 'C3 · Cycle playbooks', collapsed: true, items: [{ autogenerate: { directory: 'c/3' } }] },
          { label: 'C4 · Engagement frame', collapsed: true, items: [{ autogenerate: { directory: 'c/4' } }] },
          { label: 'C5 · Skills Checkpoints', collapsed: true, items: [{ autogenerate: { directory: 'c/5' } }] },
        ] },
      ],
    }),
    react(),
  ],
});
