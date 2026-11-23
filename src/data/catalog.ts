export type ProductCategory = 'dairy' | 'water';

export interface ProductItem {
  id: string;
  nameEn: string;
  nameUr: string;
  unitHint: string;
  descriptionEn: string;
  descriptionUr: string;
  category: ProductCategory;
  image: string;
  defaultQuickAdd: string;
}

export const SHOP_DETAILS = {
  nameEn: 'Mushtaq Meo Milk Shop',
  nameUr: 'مشتاق میو ملک شاپ',
  taglineEn: '100% Pure & Fresh Dairy & Clean Filtered Water Supply',
  taglineUr: '100% خالص اور تازہ دودھ، دیسی مصنوعات اور صاف فلٹر پانی کی سپلائی',
  address: 'Street 25, Ghori Town Main Road, Islamabad',
  addressUr: 'گلی نمبر 25، غوری ٹاؤن مین روڈ، اسلام آباد',
  callOnly: {
    display: '0309-4700485',
    tel: 'tel:+923094700485',
    label: 'Call Only: 0309-4700485',
  },
  whatsappPrimary: {
    display: '+92 341 2881746',
    shortDisplay: '0341-2881746',
    waDigits: '923412881746',
    tel: 'tel:+923412881746',
  },
  whatsappSecondary: {
    display: '0327-5377380',
    shortDisplay: '0327-5377380',
    waDigits: '923275377380',
    tel: 'tel:+923275377380',
  },
  waterSupply: {
    display: '0328-9795134',
    shortDisplay: '0328-9795134',
    waDigits: '923289795134',
    tel: 'tel:+923289795134',
    hoursEn: '10:30 AM – 10:00 PM (Order Anytime)',
    hoursUr: 'صبح 10:30 سے رات 10:00 بجے تک کسی بھی وقت آرڈر کر سکتے ہیں',
  },
} as const;

export function buildWhatsAppItemUrl(waDigits: string, item: ProductItem): string {
  const message = `Assalam-o-Alaikum *Mushtaq Meo Milk Shop*,\nI would like to order: *${item.nameEn} (${item.nameUr})*.\nPlease share today's availability & delivery timing.`;
  return `https://wa.me/${waDigits}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppGeneralUrl(waDigits: string, topic = 'dairy & water order'): string {
  const message = `Assalam-o-Alaikum *Mushtaq Meo Milk Shop*,\nI would like to place a ${topic}.`;
  return `https://wa.me/${waDigits}?text=${encodeURIComponent(message)}`;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'fresh-milk',
    nameEn: 'Fresh Milk',
    nameUr: 'تازہ دودھ',
    unitHint: 'Morning & Evening Supply · Pure Whole',
    descriptionEn:
      'Farm-fresh, unadulterated whole milk delivered chilled and pure every morning and evening without preservatives.',
    descriptionUr: 'بغیر ملاوٹ خالص اور تازہ دودھ، روزانہ صبح و شام دستیاب۔',
    category: 'dairy',
    image: '/src/assets/images/product_fresh_milk_1795448310019.jpg',
    defaultQuickAdd: '2 Litre Fresh Milk',
  },
  {
    id: 'desi-yogurt',
    nameEn: 'Desi Yogurt',
    nameUr: 'دیسی دہی',
    unitHint: 'Set in Clay Pots · Thick & Creamy',
    descriptionEn:
      'Naturally cultured thick desi dahi with rich cream on top, prepared fresh daily in hygienic traditional style.',
    descriptionUr: 'گاڑھا اور میٹھا دیسی دہی، قدرتی طریقے سے روزانہ تازہ جمایا ہوا۔',
    category: 'dairy',
    image: '/src/assets/images/product_desi_yogurt_1795448309924.jpg',
    defaultQuickAdd: '1 Kg Desi Yogurt',
  },
  {
    id: 'fresh-malai',
    nameEn: 'Fresh Malai',
    nameUr: 'تازہ ملائی',
    unitHint: 'Pure Dairy Cream · Daily Skimmed',
    descriptionEn:
      'Velvety, naturally thick malai skimmed from pure boiled milk—ideal for breakfast parathas, tea, and desserts.',
    descriptionUr: 'خالص دودھ سے اتاری گئی گاڑھی اور لذیذ تازہ ملائی۔',
    category: 'dairy',
    image: '/src/assets/images/product_fresh_malai_1795448310182.jpg',
    defaultQuickAdd: '1/2 Kg Fresh Malai',
  },
  {
    id: 'pure-butter',
    nameEn: 'Pure Butter',
    nameUr: 'خالص مکھن',
    unitHint: 'Hand-Churned · Unsalted White Makhan',
    descriptionEn:
      'Freshly churned white makhan made solely from pure cream—soft, aromatic, and free from artificial oils or salt.',
    descriptionUr: 'خالص ملائی سے تیار کردہ نرم اور خوشبودار دیسی سفید مکھن۔',
    category: 'dairy',
    image: '/src/assets/images/product_pure_butter_1795448310573.jpg',
    defaultQuickAdd: '1/2 Kg Pure Butter',
  },
  {
    id: 'desi-ghee',
    nameEn: 'Desi Ghee',
    nameUr: 'خالص دیسی گھی',
    unitHint: 'Slow-Simmered · Golden Granular',
    descriptionEn:
      'Authentic danedar golden desi ghee slow-simmered from pure homemade butter for unmistakable aroma and nutrition.',
    descriptionUr: 'خالص مکھن سے ہلکی آنچ پر تیار کردہ دانے دار خوشبودار دیسی گھی۔',
    category: 'dairy',
    image: '/src/assets/images/product_desi_ghee_1795448309511.jpg',
    defaultQuickAdd: '1 Kg Desi Ghee',
  },
  {
    id: 'filtered-water',
    nameEn: 'Clean Filtered Water Supply',
    nameUr: 'صاف فلٹر پانی کی سپلائی',
    unitHint: '10:30 AM – 10:00 PM · Homes & Shops',
    descriptionEn:
      'Multi-stage RO & UV purified drinking water supplied in sealed bottles for homes and shops. Order anytime from 10:30 AM to 10:00 PM.',
    descriptionUr:
      'گھروں اور دکانوں کے لیے صاف فلٹر پانی — صبح 10:30 سے رات 10:00 بجے تک کسی بھی وقت آرڈر کریں۔',
    category: 'water',
    image: '/src/assets/images/product_filtered_water_1795448310065.jpg',
    defaultQuickAdd: '2 Bottles Clean Filtered Water (19L)',
  },
];
