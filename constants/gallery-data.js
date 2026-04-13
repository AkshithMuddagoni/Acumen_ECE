// Gallery data organized by year
// ✅ Supports Acumen 2025 and previous years (2024, 2023)
// ✅ 90 total items (75 images + 15 videos)

// WebP images
const imageFiles = [
  'Copy of DSC01256.webp',
  'Copy of DSC01269.webp',
  'Copy of DSC01277.webp',
  'Copy of DSC01362.webp',
  'Copy of IMG_1638.webp',
  'Copy of IMG_3292.webp',
  'Copy of IMG_3307-1.webp',
  'Copy of IMG_3307.webp',
  'Copy of IMG_4883.webp',
  'Copy of IMG_5231.webp',
  'DSC01272.webp',
  'DSC01279.webp',
  'DSC01327.webp',
  'DSC01329.webp',
  'DSC01331.webp',
  'DSC01335.webp',
  'DSC01351.webp',
  'DSC01404.webp',
  'DSC01406.webp',
  'IMG_1639.webp',
  'IMG_3315.webp',
  'IMG_3318.webp',
  'IMG_3338.webp',
  'IMG_3352.webp',
  'IMG_3359.webp',
  'IMG_3362 (1).webp',
  'IMG_3362.webp',
  'IMG_4688.webp',
  'IMG_4885.webp',
  'IMG_4903.webp',
  'IMG_4908.webp',
  'IMG_4911.webp',
  'IMG_4954.webp',
  'IMG_4955 (1).webp',
  'IMG_4955.webp',
  'IMG_4962 (1).webp',
  'IMG_4962.webp',
  'IMG_4988.webp',
  'IMG_4990.webp',
  'IMG_5079 (1).webp',
  'IMG_5079.webp',
  'IMG_5229.webp',
  'IMG_5231.webp',
  'IMG_5266.webp',
  'IMG_5402.webp',
  'IMG_5403.webp',
  'IMG_5404.webp',
  'IMG_5405.webp',
  'IMG_5406.webp',
  'IMG_5407.webp',
  'IMG_5408.webp',
  'IMG_5409.webp',
  'IMG_5410.webp',
  'IMG_5411.webp',
  'IMG_5412.webp',
  'IMG_5413.webp',
  'IMG_5414.webp',
  'IMG_5415.webp',
  'IMG_5416.webp',
  'IMG_5417.webp',
  'IMG_5418.webp',
  'IMG_5419.webp',
  'IMG_5420.webp',
  'IMG_5421.webp',
  'PXL_20250410_050319221.MP.webp',
  'PXL_20250410_050403510.webp',
  'PXL_20250410_060005794.MP.webp',
  'PXL_20250410_062120601.MP.webp',
  'PXL_20250410_062134901.MP.webp',
  'PXL_20250410_062712967.MP.webp',
  'PXL_20250410_062724251.webp',
  'PXL_20250410_062755877.webp',
  'PXL_20250410_064731213.MP.webp',
  'PXL_20250410_064826341.MP.webp',
  'PXL_20250410_092545703.MP.webp',
];

// MP4 videos
const videoFiles = [
  'IMG_4702.mp4',
  'IMG_4864.mp4',
  'IMG_4867 (1).mp4',
  'IMG_4867.mp4',
  'IMG_4876.mp4',
  'IMG_4890.mp4',
  'IMG_4899.mp4',
  'IMG_4906.mp4',
  'IMG_4952.mp4',
  'IMG_5006.mp4',
  'IMG_5010.mp4',
  'IMG_5194.mp4',
  'IMG_5258.mp4',
  'IMG_5267.mp4',
  'VID20250407130148.mp4',
];

// Bento span patterns for visual hierarchy
const getSpan = (index) => {
  const patterns = ['md:col-span-1 md:row-span-1', 'md:col-span-2 md:row-span-2', 'md:col-span-1 md:row-span-3', 'md:col-span-2 md:row-span-1'];
  return patterns[index % patterns.length];
};

// Generate gallery for 2025
const GALLERY_2025 = [
  ...imageFiles.map((name, i) => ({
    id: `2025-img-${i}`,
    type: 'image',
    year: '2025',
    title: name.replace('.webp', '').replace(/^Copy of /, ''),
    desc: 'Event photo',
    url: `/gallery/${name}`,
    span: getSpan(i),
  })),
  ...videoFiles.map((name, i) => ({
    id: `2025-vid-${i}`,
    type: 'video',
    year: '2025',
    title: name.replace('.mp4', ''),
    desc: 'Event video',
    url: `/gallery/${name}`,
    span: getSpan(imageFiles.length + i),
  })),
];

// Previous years galleries (can be populated with archival data)
const GALLERY_2024 = [];
const GALLERY_2023 = [];

export const AVAILABLE_YEARS = ['2025', '2024', '2023'];

export const galleryMediaItems = GALLERY_2025;

export const getGalleryByYear = (year) => {
  switch (year) {
    case '2025':
      return GALLERY_2025;
    case '2024':
      return GALLERY_2024;
    case '2023':
      return GALLERY_2023;
    default:
      return GALLERY_2025;
  }
};
