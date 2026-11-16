import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

/** Frontmatter chuẩn bài giảng (docs/LESSON_GUIDE.md §2). Trang hệ thống (trang chủ, tiến độ…) để trống các trường bài. */
const lesson = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/).optional(),
  nhanh: z.enum(['A', 'B', 'C', 'D', 'lib', 'he-thong']).default('he-thong'),
  phan: z.union([z.number().int().min(0).max(4), z.literal('b'), z.enum(['c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'cA', 'cB', 'cC', 'cD', 'cE', 'd0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'])]).optional(),
  bai: z.string().optional(),
  nhan: z.string().optional(),
  loai: z.enum(['tong-quan', 'ky-thuat', 'phan-hanh', 'kiem-tra', 'thu-vien', 'excel', 'acca', 'checkpoint', 'khung', 'thue', 'he-thong']).default('he-thong'),
  thoi_luong: z.number().positive().optional(),
  nguon: z.array(z.string()).default([]),
  assertion: z.array(z.enum(['Occurrence', 'Existence', 'Completeness', 'Accuracy', 'Cut-off', 'Valuation', 'Classification', 'Presentation', 'Rights', 'Management override', 'Rights & obligations', 'Valuation & allocation'])).default([]),
  chuan_muc: z.array(z.string()).default([]),
  ngay_cap_nhat: z.coerce.date().optional(),
  trang_thai: z.enum(['goc', 'mo-rong', 'gop', 'khung']).optional(),
  style_version: z.string().optional(),
  lien_ket: z.array(z.string()).default([]),
}).superRefine((d, ctx) => {
  // Bài giảng thật phải đủ trường bắt buộc
  if (['ky-thuat', 'phan-hanh', 'kiem-tra', 'excel', 'tong-quan', 'acca', 'checkpoint'].includes(d.loai)) {
    for (const k of ['id', 'phan', 'thoi_luong', 'ngay_cap_nhat', 'trang_thai', 'style_version'] as const) {
      if (d[k] === undefined) ctx.addIssue({ code: 'custom', message: `Thiếu trường bắt buộc "${k}" (LESSON_GUIDE §2)`, path: [k] });
    }
    if (d.nguon.length === 0) ctx.addIssue({ code: 'custom', message: 'Thiếu "nguon": bài phải trỏ về /source', path: ['nguon'] });
  }
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema({ extend: lesson }) }),
};
