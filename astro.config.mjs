// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://audit-learning-hub.vercel.app',
  integrations: [
    starlight({
      disable404Route: true,
      title: 'Audit Learning Hub',
      description: 'BISC Training Center · Audit Simulation 2026: học kiểm toán theo phần hành, thực hành trên case Biscore.',
      defaultLocale: 'root',
      locales: { root: { label: 'Tiếng Việt', lang: 'vi' } },
      customCss: ['./src/styles/bisc.css', './src/styles/tax.css'],
      lastUpdated: false,
      head: [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } }],
      pagination: true,
      components: {
        PageTitle: './src/components/overrides/PageTitle.astro',
        Pagination: './src/components/overrides/Pagination.astro',
      },
      sidebar: [
        { label: 'Bắt đầu', items: [
          { label: 'Trang chủ', link: '/' },
          { label: 'Tiến độ & ghi chú của tôi', link: '/tien-do/' },
          { label: 'Mới cập nhật', link: '/moi-cap-nhat/' },
        ] },
        { label: 'A0 · Lộ trình', collapsed: true, items: [{ autogenerate: { directory: 'a/0' } }] },
        { label: 'A1 · Nền tảng', collapsed: true, items: [{ autogenerate: { directory: 'a/1' } }] },
        { label: 'A2 · Materiality', collapsed: true, items: [{ autogenerate: { directory: 'a/2' } }] },
        { label: 'A3 · Phần hành', collapsed: true, items: [{ autogenerate: { directory: 'a/3' } }] },
        { label: 'A4 · Ghi finding', collapsed: true, items: [{ autogenerate: { directory: 'a/4' } }] },
        { label: 'Bản đồ giấy làm việc VACPA', link: '/glv/' },
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
        { label: 'D · Thuế Việt Nam (ACCA TX-VNM)', collapsed: true, items: [
          { label: 'D0 · Start here', link: '/d/' },
          { label: '🔎 Tra cứu nhanh', link: '/d/lookup/' },
          { label: 'D1 · Tax Atlas', link: '/d/atlas/' },
          { label: 'D2 · Cây quyết định', link: '/d/decide/' },
          { label: 'D3 · Bẫy đề', link: '/d/traps/' },
          { label: 'D4 · Kho đề', link: '/d/exam-bank/' },
          { label: 'D5 · Flashcard', link: '/d/drill/' },
          { label: 'D6 · Máy tính', link: '/d/calc/' },
          { label: 'D7 · Bảng thuế', link: '/d/tables/' },
        ] },
        { label: 'E · Ôn test MT (Aptitude)', collapsed: true, items: [
          { label: 'E0 · Start here', link: '/e/' },
          { label: 'E1 · Luyện tập', link: '/e/luyen-tap/' },
          { label: 'E2 · Thi thử', link: '/e/thi-thu/' },
        ] },
      ],
    }),
    react(),
  ],
});
