import React, {useState} from 'react';
import {
  Award,
  Building2,
  CheckCircle2,
  Clock,
  Droplets,
  Flame,
  Home,
  Layers,
  MapPin,
  Menu,
  MessageCircle,
  Milk,
  Phone,
  PhoneCall,
  Plus,
  ShieldCheck,
  Soup,
  Truck,
  X,
} from 'lucide-react';
import {
  PRODUCTS,
  ProductCategory,
  ProductItem,
  SHOP_DETAILS,
  buildWhatsAppGeneralUrl,
  buildWhatsAppItemUrl,
} from './data/catalog';

function ProductIcon({id, className}: {id: string; className?: string}) {
  switch (id) {
    case 'fresh-milk':
      return <Milk className={className} aria-hidden="true" />;
    case 'desi-yogurt':
      return <Soup className={className} aria-hidden="true" />;
    case 'fresh-malai':
      return <Layers className={className} aria-hidden="true" />;
    case 'pure-butter':
      return <Award className={className} aria-hidden="true" />;
    case 'desi-ghee':
      return <Flame className={className} aria-hidden="true" />;
    case 'filtered-water':
      return <Droplets className={className} aria-hidden="true" />;
    default:
      return <Milk className={className} aria-hidden="true" />;
  }
}

function ProductImage({
  src,
  alt,
  category,
  title,
  id,
}: {
  src: string;
  alt: string;
  category: ProductCategory;
  title: string;
  id: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center ${
          category === 'water'
            ? 'bg-gradient-to-br from-[#e0f2fe] via-[#bae6fd] to-[#e0f7fa] text-[#0369a1]'
            : 'bg-gradient-to-br from-[#f2f6f0] via-[#e8efe6] to-[#f8f5e9] text-[#064e1b]'
        }`}
      >
        <ProductIcon id={id} className="h-12 w-12 opacity-80" />
        <span className="text-sm font-medium">{title}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
    />
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | ProductCategory>('all');
  const [heroImgError, setHeroImgError] = useState(false);

  // Quick WhatsApp Order Form State
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [itemsText, setItemsText] = useState('');
  const [selectedWaNumber, setSelectedWaNumber] = useState<'primary' | 'secondary' | 'water'>('primary');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<{
    message: string;
    waUrl: string;
    recipientDisplay: string;
  } | null>(null);

  const filteredProducts =
    activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter((item) => item.category === activeFilter);

  const handleQuickAppendItem = (snippet: string) => {
    setItemsText((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return snippet;
      if (trimmed.toLowerCase().includes(snippet.toLowerCase())) return prev;
      return `${trimmed}, ${snippet}`;
    });
    setFormError(null);
  };

  const handleAddFromProductCard = (item: ProductItem) => {
    handleQuickAppendItem(item.defaultQuickAdd);
    const formEl = document.getElementById('order-form');
    if (formEl) {
      formEl.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  const handleOrderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanName = customerName.trim();
    const cleanAddress = address.trim();
    const cleanItems = itemsText.trim();

    if (!cleanName || !cleanAddress || !cleanItems) {
      setFormError('Please enter your name, complete address/area, and the items you want to order.');
      return;
    }

    setFormError(null);

    const target =
      selectedWaNumber === 'primary'
        ? SHOP_DETAILS.whatsappPrimary
        : selectedWaNumber === 'secondary'
          ? SHOP_DETAILS.whatsappSecondary
          : SHOP_DETAILS.waterSupply;

    const formattedMessage = [
      '*New Order - Mushtaq Meo Milk Shop*',
      '',
      `*Customer Name:* ${cleanName}`,
      `*Address / Area:* ${cleanAddress}`,
      `*Items & Quantity:* ${cleanItems}`,
      '',
      `Branch: ${SHOP_DETAILS.address}`,
    ].join('\n');

    const waUrl = `https://wa.me/${target.waDigits}?text=${encodeURIComponent(formattedMessage)}`;

    setSubmittedOrder({
      message: formattedMessage,
      waUrl,
      recipientDisplay: target.display,
    });

    // Launch external WhatsApp link cleanly without using window.open
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="top" className="min-h-screen bg-[#fafaf7] text-[#0b2512]">
      {/* Sticky Top Navigation Bar (Strict 3-Zone Contract) */}
      <header className="sticky top-0 z-40 h-16 border-b border-[#064e1b]/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Single-line Brand Title */}
          <a
            href="#top"
            className="shrink-0 whitespace-nowrap text-base font-bold tracking-tight text-[#064e1b] sm:text-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#064e1b]"
          >
            {SHOP_DETAILS.nameEn}
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-7 text-sm font-medium text-[#2c4433] md:flex"
          >
            <a
              href="#top"
              className="shrink-0 whitespace-nowrap py-1 transition-colors duration-150 hover:text-[#064e1b] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#064e1b]"
            >
              Home
            </a>
            <a
              href="#products"
              className="shrink-0 whitespace-nowrap py-1 transition-colors duration-150 hover:text-[#064e1b] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#064e1b]"
            >
              Products
            </a>
            <a
              href="#water-supply"
              className="shrink-0 whitespace-nowrap py-1 transition-colors duration-150 hover:text-[#0284c7] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0284c7]"
            >
              Water Supply
            </a>
            <a
              href="#order-form"
              className="shrink-0 whitespace-nowrap py-1 transition-colors duration-150 hover:text-[#064e1b] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#064e1b]"
            >
              Quick Order
            </a>
            <a
              href="#contact"
              className="shrink-0 whitespace-nowrap py-1 transition-colors duration-150 hover:text-[#064e1b] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#064e1b]"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex shrink-0 items-center gap-3">
            <a
              href="#order-form"
              className="hidden shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[#064e1b] px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#096424] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#064e1b] sm:inline-flex min-h-[40px]"
            >
              Order Now
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#064e1b]/15 text-[#064e1b] transition-colors hover:bg-[#064e1b]/5 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-[#064e1b]/10 bg-white px-4 pb-4 pt-2 shadow-lg md:hidden">
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
              {[
                {href: '#top', label: 'Home'},
                {href: '#products', label: 'Products'},
                {href: '#water-supply', label: 'Water Supply'},
                {href: '#order-form', label: 'Quick Order'},
                {href: '#contact', label: 'Contact & Location'},
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-[#1b3a24] transition-colors hover:bg-[#064e1b]/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#order-form"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-[#064e1b] px-4 text-sm font-semibold text-white"
              >
                Order on WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden bg-[#064e1b] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,172,13,0.16),transparent_48%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_45%)]"
          />

          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Hero Copy Column */}
              <div className="flex flex-col justify-center lg:col-span-7">
                {/* Address Plate */}
                <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#e9f5ec]">
                  <span className="inline-flex items-center gap-2 font-medium text-[#f4d455]">
                    <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{SHOP_DETAILS.address}</span>
                  </span>
                </div>

                {/* Bilingual Shop Name */}
                <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
                  {SHOP_DETAILS.nameEn}
                </h1>
                <p
                  dir="rtl"
                  lang="ur"
                  className="font-urdu mt-3 text-2xl font-bold text-[#f4d455] sm:text-4xl"
                >
                  {SHOP_DETAILS.nameUr}
                </p>

                {/* Tagline */}
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#e8f3eb] sm:text-lg">
                  {SHOP_DETAILS.taglineEn}
                </p>
                <p
                  dir="rtl"
                  lang="ur"
                  className="font-urdu mt-2 text-right text-base text-white/90 sm:text-left sm:text-lg"
                >
                  {SHOP_DETAILS.taglineUr}
                </p>

                {/* Direct Call & WhatsApp Action Buttons (Strict Number Rules Applied) */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {/* WhatsApp & Call #1 */}
                  <a
                    href={buildWhatsAppGeneralUrl(SHOP_DETAILS.whatsappPrimary.waDigits)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#d4ac0d] px-5 py-3 text-sm font-semibold text-[#052e10] shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#e1ba1f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4d455]"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>WhatsApp: {SHOP_DETAILS.whatsappPrimary.display}</span>
                  </a>

                  {/* WhatsApp & Call #2 */}
                  <a
                    href={buildWhatsAppGeneralUrl(SHOP_DETAILS.whatsappSecondary.waDigits)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-150 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>WhatsApp: {SHOP_DETAILS.whatsappSecondary.display}</span>
                  </a>

                  {/* Voice Call ONLY Number (NO WhatsApp button) */}
                  <a
                    href={SHOP_DETAILS.callOnly.tel}
                    className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#f4d455]/45 bg-[#043913] px-5 py-3 text-sm font-medium text-[#f9e79f] transition-colors duration-150 hover:bg-[#054517] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4d455]"
                  >
                    <PhoneCall className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{SHOP_DETAILS.callOnly.label}</span>
                  </a>
                </div>

                {/* Unboxed Trust Metadata */}
                <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/15 pt-5 text-xs text-white/80 sm:text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#f4d455]" aria-hidden="true" />
                    100% Pure &amp; Hygienic
                  </span>
                  <span aria-hidden="true" className="text-white/35">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="h-4 w-4 text-[#f4d455]" aria-hidden="true" />
                    Home &amp; Shop Delivery in Ghori Town
                  </span>
                  <span aria-hidden="true" className="text-white/35">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Droplets className="h-4 w-4 text-[#7dd3fc]" aria-hidden="true" />
                    RO &amp; UV Filtered Water
                  </span>
                </div>
              </div>

              {/* Hero Visual Column */}
              <div className="lg:col-span-5">
                <div className="relative h-72 overflow-hidden rounded-2xl border border-white/15 shadow-2xl sm:h-96 lg:h-full lg:min-h-[420px]">
                  {heroImgError ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#0a6324] via-[#064e1b] to-[#032c0f] p-8 text-center">
                      <Milk className="h-14 w-14 text-[#f4d455]" aria-hidden="true" />
                      <p className="text-lg font-semibold text-white">
                        {SHOP_DETAILS.nameEn}
                      </p>
                      <p dir="rtl" lang="ur" className="font-urdu text-xl text-[#f4d455]">
                        {SHOP_DETAILS.nameUr}
                      </p>
                    </div>
                  ) : (
                    <img
                      src="/src/assets/images/hero_dairy_water_clean_1795448328514.jpg"
                      alt="Fresh whole milk pitcher, clay pot desi yogurt, golden desi ghee jar, and crystal-clear filtered water carafe at Mushtaq Meo Milk Shop"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#042f10]/85 via-transparent to-transparent"
                  />
                  <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/20 bg-[#053b14]/80 p-4 backdrop-blur-md">
                    <p className="text-xs font-medium text-[#f4d455]">
                      Ghori Town Main Road · Islamabad
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-white">
                      Daily Fresh Farm Dairy &amp; Clean Filtered Water
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Products Grid (6 Cards with Icons & Dual WhatsApp Buttons) */}
        <section id="products" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-6 border-b border-[#064e1b]/10 pb-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider text-[#9a7b06]">
                PURE DAIRY &amp; HYDRATION CATALOG
              </p>
              <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-[#064e1b] sm:text-4xl">
                Our Fresh Daily Offerings
              </h2>
              <p dir="rtl" lang="ur" className="font-urdu mt-1 text-right text-xl text-[#1e4d2b] sm:text-left">
                ہماری خالص اور تازہ روزانہ کی مصنوعات
              </p>
            </div>

            {/* Interactive Category Filter Control */}
            <div
              role="group"
              aria-label="Filter products by category"
              className="inline-flex w-fit items-center gap-1 rounded-xl border border-[#064e1b]/12 bg-white p-1 shadow-xs"
            >
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-[#064e1b] text-white'
                    : 'text-[#2c4433] hover:bg-[#064e1b]/5'
                }`}
              >
                All Items (6)
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('dairy')}
                className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                  activeFilter === 'dairy'
                    ? 'bg-[#064e1b] text-white'
                    : 'text-[#2c4433] hover:bg-[#064e1b]/5'
                }`}
              >
                Pure Dairy (5)
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('water')}
                className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                  activeFilter === 'water'
                    ? 'bg-[#0284c7] text-white'
                    : 'text-[#0369a1] hover:bg-[#0284c7]/10'
                }`}
              >
                Filtered Water (1)
              </button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((item) => {
              const isWater = item.category === 'water';
              return (
                <article
                  key={item.id}
                  className={`group glass-card flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                    isWater
                      ? 'border-[#0284c7]/25 bg-gradient-to-b from-[#f2fafe]/95 to-white/95'
                      : 'border-[#064e1b]/12'
                  }`}
                >
                  {/* 4:3 Studio Product Photography */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f2f4f0]">
                    <ProductImage
                      id={item.id}
                      src={item.image}
                      alt={`${item.nameEn} (${item.nameUr}) from Mushtaq Meo Milk Shop`}
                      category={item.category}
                      title={item.nameEn}
                    />
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Quiet Unboxed Category Metadata + Icon */}
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className={`inline-flex items-center gap-2 text-xs font-medium ${
                          isWater ? 'text-[#0369a1]' : 'text-[#5b6f60]'
                        }`}
                      >
                        <ProductIcon
                          id={item.id}
                          className={`h-4 w-4 shrink-0 ${
                            isWater ? 'text-[#0284c7]' : 'text-[#064e1b]'
                          }`}
                        />
                        <span>{item.unitHint}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddFromProductCard(item)}
                        title="Add to multi-item order form"
                        className={`inline-flex min-h-[32px] shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                          isWater
                            ? 'text-[#0369a1] hover:bg-[#0284c7]/10'
                            : 'text-[#064e1b] hover:bg-[#064e1b]/8'
                        }`}
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Add to Form</span>
                      </button>
                    </div>

                    {/* Bilingual Product Title */}
                    <div className="mt-3">
                      <h3
                        className={`text-xl font-bold tracking-tight ${
                          isWater ? 'text-[#0c4a6e]' : 'text-[#064e1b]'
                        }`}
                      >
                        {item.nameEn}
                      </h3>
                      <p
                        dir="rtl"
                        lang="ur"
                        className={`font-urdu mt-0.5 text-right text-xl font-semibold ${
                          isWater ? 'text-[#0284c7]' : 'text-[#8c6d07]'
                        }`}
                      >
                        {item.nameUr}
                      </p>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-[#38503f]">
                      {item.descriptionEn}
                    </p>
                    <p
                      dir="rtl"
                      lang="ur"
                      className="font-urdu mt-2 text-right text-sm text-[#4a6251]"
                    >
                      {item.descriptionUr}
                    </p>

                    {/* TWO Complete Working WhatsApp Buttons Pre-filled with Specific Item */}
                    <div className="mt-auto pt-6">
                      <p className="mb-2 text-[11px] font-semibold tracking-wide text-[#5b6f60]">
                        Order {item.nameEn} directly on WhatsApp:
                      </p>
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        <a
                          href={buildWhatsAppItemUrl(SHOP_DETAILS.whatsappPrimary.waDigits, item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-xs font-semibold text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                            isWater
                              ? 'bg-[#0284c7] hover:bg-[#0369a1] focus-visible:outline-[#0284c7]'
                              : 'bg-[#064e1b] hover:bg-[#096424] focus-visible:outline-[#064e1b]'
                          }`}
                        >
                          <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>WA: {SHOP_DETAILS.whatsappPrimary.shortDisplay}</span>
                        </a>

                        <a
                          href={buildWhatsAppItemUrl(SHOP_DETAILS.whatsappSecondary.waDigits, item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                            isWater
                              ? 'border-[#0284c7]/35 bg-[#e0f2fe] text-[#0c4a6e] hover:bg-[#bae6fd] focus-visible:outline-[#0284c7]'
                              : 'border-[#d4ac0d]/60 bg-[#fdf8e6] text-[#064e1b] hover:bg-[#f8ecc0] focus-visible:outline-[#d4ac0d]'
                          }`}
                        >
                          <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>WA: {SHOP_DETAILS.whatsappSecondary.shortDisplay}</span>
                        </a>
                      </div>

                      {isWater && (
                        <div className="mt-3 rounded-xl border border-[#0284c7]/25 bg-[#eef9fd] p-3">
                          <p className="text-[11px] font-semibold text-[#0c4a6e]">
                            Dedicated Water Supply Line · {SHOP_DETAILS.waterSupply.display}
                          </p>
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            <a
                              href={SHOP_DETAILS.waterSupply.tel}
                              className="inline-flex min-h-[38px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#0284c7]/30 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#0c4a6e] transition-colors hover:bg-[#e0f2fe]"
                            >
                              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                              <span>Call Water</span>
                            </a>
                            <a
                              href={buildWhatsAppItemUrl(SHOP_DETAILS.waterSupply.waDigits, item)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-[38px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-[#0369a1] px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#075985]"
                            >
                              <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                              <span>WA Water</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Clean Filtered Water Supply Section (Aqua Blue Theme) */}
        <section
          id="water-supply"
          className="border-y border-[#0284c7]/15 bg-gradient-to-br from-[#eef9fd] via-[#f4fbfe] to-[#e0f2fe]"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0369a1]">
                  <Droplets className="h-4 w-4" aria-hidden="true" />
                  <span>CLEAN FILTERED WATER SUPPLY · SAF WATER SERVICE</span>
                </div>
                <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-[#0c4a6e] sm:text-3xl">
                  Clean Filtered Water for Homes &amp; Shops
                </h2>
                <p dir="rtl" lang="ur" className="font-urdu mt-2 text-right text-2xl font-semibold text-[#0284c7] sm:text-left">
                  گھروں اور دکانوں کے لیے صاف فلٹر پانی کی سپلائی
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#1e4b66] sm:text-base">
                  Safe, crisp, balanced-mineral filtered water tested for purity and delivered to
                  households, shops, and offices across Ghori Town, Islamabad.
                </p>

                {/* Water Supply Timing Highlight (Bilingual) */}
                <div className="mt-5 rounded-xl border border-[#0284c7]/25 bg-white/90 p-4 shadow-xs">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0c4a6e]">
                    <Clock className="h-4 w-4 shrink-0 text-[#0284c7]" aria-hidden="true" />
                    <span>Water Supply Time: {SHOP_DETAILS.waterSupply.hoursEn}</span>
                  </div>
                  <p dir="rtl" lang="ur" className="font-urdu mt-1 text-right text-base font-medium text-[#0369a1] sm:text-left">
                    پانی کی سپلائی کا وقت: {SHOP_DETAILS.waterSupply.hoursUr}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#0284c7]/20 bg-white/85 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0c4a6e]">
                      <Home className="h-4 w-4 text-[#0284c7]" aria-hidden="true" />
                      <span>Home Dispenser Bottles</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#366078]">
                      Regular doorstep bottle refilling and clean sanitized 19L cans for families.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#0284c7]/20 bg-white/85 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0c4a6e]">
                      <Building2 className="h-4 w-4 text-[#0284c7]" aria-hidden="true" />
                      <span>Shops &amp; Commercial Supply</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#366078]">
                      Reliable scheduled water supply for restaurants, bakeries, clinics, and shops.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-[#0284c7]/25 bg-white/95 p-6 shadow-sm backdrop-blur-md sm:p-8">
                  <h3 className="text-lg font-bold text-[#0c4a6e]">
                    Book Water Delivery Anytime
                  </h3>
                  <p dir="rtl" lang="ur" className="font-urdu mt-1 text-right text-base text-[#0369a1]">
                    پانی کی سپلائی کے لیے رابطہ کریں ({SHOP_DETAILS.waterSupply.display})
                  </p>

                  {/* Primary Water Supply Number: 0328-9795134 (Call & WhatsApp) */}
                  <div className="mt-4 rounded-xl border border-[#0284c7]/25 bg-[#eef9fd] p-4">
                    <p className="text-xs font-semibold text-[#0369a1]">
                      Water Supply Call &amp; WhatsApp · 10:30 AM – 10:00 PM
                    </p>
                    <p className="mt-1 text-lg font-bold tabular-nums text-[#0c4a6e]">
                      {SHOP_DETAILS.waterSupply.display}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2.5">
                      <a
                        href={SHOP_DETAILS.waterSupply.tel}
                        className="inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-[#0284c7]/35 bg-white px-3 py-2.5 text-xs font-semibold text-[#0c4a6e] transition-colors hover:bg-[#e0f2fe]"
                      >
                        <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Call Now</span>
                      </a>
                      <a
                        href={buildWhatsAppItemUrl(
                          SHOP_DETAILS.waterSupply.waDigits,
                          PRODUCTS[5]
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#0284c7] px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0369a1]"
                      >
                        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2.5">
                    <a
                      href={buildWhatsAppItemUrl(
                        SHOP_DETAILS.whatsappPrimary.waDigits,
                        PRODUCTS[5]
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#0284c7]/30 bg-[#e0f2fe] px-4 py-2.5 text-xs font-semibold text-[#0c4a6e] transition-colors hover:bg-[#bae6fd]"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>WhatsApp: {SHOP_DETAILS.whatsappPrimary.display}</span>
                    </a>
                    <a
                      href={buildWhatsAppItemUrl(
                        SHOP_DETAILS.whatsappSecondary.waDigits,
                        PRODUCTS[5]
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#0284c7]/30 bg-[#e0f2fe] px-4 py-2.5 text-xs font-semibold text-[#0c4a6e] transition-colors hover:bg-[#bae6fd]"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>WhatsApp: {SHOP_DETAILS.whatsappSecondary.display}</span>
                    </a>
                    <a
                      href={SHOP_DETAILS.callOnly.tel}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#0c4a6e]/15 bg-white px-4 py-2.5 text-xs font-semibold text-[#0c4a6e] transition-colors hover:bg-[#f0f9ff]"
                    >
                      <PhoneCall className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{SHOP_DETAILS.callOnly.label}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Quick WhatsApp Order Form */}
        <section id="order-form" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            {/* Form Explanation / Guidance Column */}
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wider text-[#9a7b06]">
                FAST DOORSTEP DELIVERY
              </p>
              <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-[#064e1b] sm:text-4xl">
                Quick WhatsApp Order Form
              </h2>
              <p dir="rtl" lang="ur" className="font-urdu mt-2 text-right text-xl text-[#1e4d2b] sm:text-left">
                واٹس ایپ پر فوری آرڈر بھیجیں
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#38503f] sm:text-base">
                Fill in your delivery details below, pick your preferred WhatsApp line, and submit
                to launch a pre-formatted order message directly to our counter.
              </p>

              {/* Quick-Add Tap Helpers */}
              <div className="mt-6">
                <p className="text-xs font-semibold text-[#064e1b]">
                  Tap items to add quickly to your order:
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {PRODUCTS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleQuickAppendItem(item.defaultQuickAdd)}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-[#064e1b]/20 bg-white px-3 py-1.5 text-xs font-medium text-[#064e1b] transition-colors hover:border-[#064e1b] hover:bg-[#064e1b]/5"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{item.nameEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Call-Only Reminder */}
              <div className="mt-7 rounded-xl border border-[#d4ac0d]/40 bg-[#fdf8e6] p-4">
                <p className="text-xs font-semibold text-[#064e1b]">Prefer a quick phone call?</p>
                <p className="mt-1 text-xs leading-relaxed text-[#38503f]">
                  For voice inquiries only (no WhatsApp on this line), dial our dedicated call line:
                </p>
                <a
                  href={SHOP_DETAILS.callOnly.tel}
                  className="mt-2 inline-flex min-h-[40px] items-center gap-2 text-sm font-bold text-[#064e1b] underline underline-offset-4 hover:text-[#096424]"
                >
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  <span>{SHOP_DETAILS.callOnly.label}</span>
                </a>
              </div>
            </div>

            {/* Interactive Order Form Card */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-2xl border border-[#064e1b]/15 p-6 shadow-md sm:p-8">
                <form onSubmit={handleOrderSubmit} noValidate className="space-y-5">
                  <div>
                    <label
                      htmlFor="customerName"
                      className="block text-sm font-semibold text-[#064e1b]"
                    >
                      Customer Name <span className="font-urdu text-xs text-[#6f5705]">(آپ کا نام)</span>
                    </label>
                    <input
                      id="customerName"
                      name="customerName"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        setFormError(null);
                      }}
                      placeholder="e.g., Muhammad Usman"
                      className="mt-1.5 w-full rounded-xl border border-[#064e1b]/20 bg-white px-4 py-3 text-sm text-[#0b2512] placeholder:text-[#7c8f81] focus:border-[#064e1b] focus:outline-none focus:ring-2 focus:ring-[#064e1b]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-semibold text-[#064e1b]"
                    >
                      Complete Address / Area{' '}
                      <span className="font-urdu text-xs text-[#6f5705]">(مکمل پتہ)</span>
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setFormError(null);
                      }}
                      placeholder="e.g., House 14, Street 18, Ghori Town Phase 4, Islamabad"
                      className="mt-1.5 w-full rounded-xl border border-[#064e1b]/20 bg-white px-4 py-3 text-sm text-[#0b2512] placeholder:text-[#7c8f81] focus:border-[#064e1b] focus:outline-none focus:ring-2 focus:ring-[#064e1b]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="itemsText"
                      className="block text-sm font-semibold text-[#064e1b]"
                    >
                      Items &amp; Quantity{' '}
                      <span className="font-urdu text-xs text-[#6f5705]">(اشیاء اور مقدار)</span>
                    </label>
                    <textarea
                      id="itemsText"
                      name="itemsText"
                      rows={3}
                      required
                      value={itemsText}
                      onChange={(e) => {
                        setItemsText(e.target.value);
                        setFormError(null);
                      }}
                      placeholder="e.g., 3 Litre Fresh Milk, 1 Kg Desi Yogurt, 1 Bottle Filtered Water (19L)"
                      className="mt-1.5 w-full rounded-xl border border-[#064e1b]/20 bg-white px-4 py-3 text-sm text-[#0b2512] placeholder:text-[#7c8f81] focus:border-[#064e1b] focus:outline-none focus:ring-2 focus:ring-[#064e1b]/20"
                    />
                  </div>

                  {/* Radio Buttons to Select WhatsApp Number */}
                  <fieldset>
                    <legend className="block text-sm font-semibold text-[#064e1b]">
                      Send Order to WhatsApp Number
                    </legend>
                    <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <label
                        className={`flex min-h-[54px] cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-colors ${
                          selectedWaNumber === 'primary'
                            ? 'border-[#064e1b] bg-[#064e1b]/6'
                            : 'border-[#064e1b]/18 bg-white hover:bg-[#fafaf7]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="whatsappRecipient"
                          value="primary"
                          checked={selectedWaNumber === 'primary'}
                          onChange={() => setSelectedWaNumber('primary')}
                          className="h-4 w-4 accent-[#064e1b]"
                        />
                        <div className="text-sm">
                          <span className="block font-semibold tabular-nums text-[#064e1b]">
                            {SHOP_DETAILS.whatsappPrimary.display}
                          </span>
                          <span className="text-xs text-[#4a6251]">Dairy &amp; Water</span>
                        </div>
                      </label>

                      <label
                        className={`flex min-h-[54px] cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-colors ${
                          selectedWaNumber === 'secondary'
                            ? 'border-[#064e1b] bg-[#064e1b]/6'
                            : 'border-[#064e1b]/18 bg-white hover:bg-[#fafaf7]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="whatsappRecipient"
                          value="secondary"
                          checked={selectedWaNumber === 'secondary'}
                          onChange={() => setSelectedWaNumber('secondary')}
                          className="h-4 w-4 accent-[#064e1b]"
                        />
                        <div className="text-sm">
                          <span className="block font-semibold tabular-nums text-[#064e1b]">
                            {SHOP_DETAILS.whatsappSecondary.display}
                          </span>
                          <span className="text-xs text-[#4a6251]">Dairy &amp; Water</span>
                        </div>
                      </label>

                      <label
                        className={`flex min-h-[54px] cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-colors ${
                          selectedWaNumber === 'water'
                            ? 'border-[#0284c7] bg-[#0284c7]/8'
                            : 'border-[#0284c7]/25 bg-white hover:bg-[#f0f9ff]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="whatsappRecipient"
                          value="water"
                          checked={selectedWaNumber === 'water'}
                          onChange={() => setSelectedWaNumber('water')}
                          className="h-4 w-4 accent-[#0284c7]"
                        />
                        <div className="text-sm">
                          <span className="block font-semibold tabular-nums text-[#0c4a6e]">
                            {SHOP_DETAILS.waterSupply.display}
                          </span>
                          <span className="text-xs text-[#0369a1]">Water Supply Line</span>
                        </div>
                      </label>
                    </div>
                  </fieldset>

                  {formError && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
                    >
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#064e1b] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#096424] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#064e1b]"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Send Order via WhatsApp</span>
                  </button>
                </form>

                {/* Direct Confirmation & Safe Anchor Fallback */}
                {submittedOrder && (
                  <div className="mt-6 rounded-xl border border-[#064e1b]/25 bg-[#f2f8f3] p-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#064e1b]">
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Order Prepared for WhatsApp ({submittedOrder.recipientDisplay})</span>
                    </div>
                    <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-[#064e1b]/10 bg-white p-3 font-sans text-xs leading-relaxed text-[#253d2b]">
                      {submittedOrder.message}
                    </pre>
                    <a
                      href={submittedOrder.waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#d4ac0d] px-4 py-2 text-xs font-bold text-[#052e10] transition-colors hover:bg-[#e1ba1f]"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Open WhatsApp Chat Now</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Contact & Location Footer */}
      <footer id="contact" className="border-t border-[#d4ac0d]/30 bg-[#043613] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          {/* Header & Full Address */}
          <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-10 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {SHOP_DETAILS.nameEn}
              </h2>
              <p dir="rtl" lang="ur" className="font-urdu mt-1 text-2xl font-semibold text-[#f4d455]">
                {SHOP_DETAILS.nameUr}
              </p>
              <p className="mt-3 flex items-start gap-2 text-sm text-[#e1efe5]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#f4d455]" aria-hidden="true" />
                <span>{SHOP_DETAILS.address}</span>
              </p>
              <p dir="rtl" lang="ur" className="font-urdu mt-1 text-right text-sm text-white/80 sm:text-left">
                {SHOP_DETAILS.addressUr}
              </p>
            </div>
          </div>

          {/* Separate Number Cards (Strictly Respecting Call-Only vs. WhatsApp+Call Rules) */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: 0309-4700485 — VOICE CALLS ONLY (NO WHATSAPP BUTTON) */}
            <div className="glass-card-dark flex flex-col justify-between rounded-2xl border border-[#f4d455]/35 p-6">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#f4d455]">
                  VOICE CALLS ONLY · NO WHATSAPP
                </p>
                <h3 className="mt-2 text-xl font-bold tabular-nums text-white">
                  {SHOP_DETAILS.callOnly.label}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/80">
                  Dedicated direct voice line for quick inquiries and shop directions. WhatsApp is
                  not active on this number.
                </p>
              </div>
              <div className="mt-6">
                <a
                  href={SHOP_DETAILS.callOnly.tel}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#d4ac0d] px-4 py-2.5 text-sm font-semibold text-[#042f10] transition-colors hover:bg-[#e1ba1f]"
                >
                  <PhoneCall className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{SHOP_DETAILS.callOnly.label}</span>
                </a>
              </div>
            </div>

            {/* Card 2: +92 341 2881746 — BOTH WHATSAPP & CALLS */}
            <div className="glass-card-dark flex flex-col justify-between rounded-2xl border border-white/15 p-6">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#a7f3d0]">
                  WHATSAPP &amp; VOICE CALLS
                </p>
                <h3 className="mt-2 text-xl font-bold tabular-nums text-white">
                  {SHOP_DETAILS.whatsappPrimary.display}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/80">
                  Available for dairy &amp; filtered water orders via WhatsApp messages or direct
                  phone calls.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2.5">
                <a
                  href={SHOP_DETAILS.whatsappPrimary.tel}
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-white/25 bg-white/10 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Call Now</span>
                </a>
                <a
                  href={buildWhatsAppGeneralUrl(SHOP_DETAILS.whatsappPrimary.waDigits)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-[#064e1b] transition-colors hover:bg-[#eef7f0]"
                >
                  <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Card 3: 0327-5377380 — BOTH WHATSAPP & CALLS */}
            <div className="glass-card-dark flex flex-col justify-between rounded-2xl border border-white/15 p-6">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#a7f3d0]">
                  WHATSAPP &amp; VOICE CALLS
                </p>
                <h3 className="mt-2 text-xl font-bold tabular-nums text-white">
                  {SHOP_DETAILS.whatsappSecondary.display}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/80">
                  Secondary WhatsApp &amp; voice order line for fast delivery across Ghori Town
                  streets &amp; sectors.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2.5">
                <a
                  href={SHOP_DETAILS.whatsappSecondary.tel}
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-white/25 bg-white/10 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Call Now</span>
                </a>
                <a
                  href={buildWhatsAppGeneralUrl(SHOP_DETAILS.whatsappSecondary.waDigits)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-[#064e1b] transition-colors hover:bg-[#eef7f0]"
                >
                  <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Card 4: 0328-9795134 — WATER SUPPLY (10:30 AM – 10:00 PM) WHATSAPP & CALLS */}
            <div className="glass-card-dark flex flex-col justify-between rounded-2xl border border-[#7dd3fc]/35 p-6">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#7dd3fc]">
                  WATER SUPPLY · WHATSAPP &amp; CALLS
                </p>
                <h3 className="mt-2 text-xl font-bold tabular-nums text-white">
                  {SHOP_DETAILS.waterSupply.display}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/85">
                  Water Supply: {SHOP_DETAILS.waterSupply.hoursEn}
                </p>
                <p dir="rtl" lang="ur" className="font-urdu mt-1 text-right text-xs text-[#bae6fd]">
                  {SHOP_DETAILS.waterSupply.hoursUr}
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2.5">
                <a
                  href={SHOP_DETAILS.waterSupply.tel}
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-[#7dd3fc]/40 bg-[#0284c7]/25 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0284c7]/40"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Call Now</span>
                </a>
                <a
                  href={buildWhatsAppItemUrl(SHOP_DETAILS.waterSupply.waDigits, PRODUCTS[5])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#7dd3fc] px-3 py-2.5 text-xs font-semibold text-[#0c4a6e] transition-colors hover:bg-[#bae6fd]"
                >
                  <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/75 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {SHOP_DETAILS.nameEn} · {SHOP_DETAILS.address}
            </p>
            <div className="flex items-center gap-4">
              <a href="#products" className="hover:text-white">
                Products
              </a>
              <span aria-hidden="true">·</span>
              <a href="#water-supply" className="hover:text-white">
                Water Supply
              </a>
              <span aria-hidden="true">·</span>
              <a href="#order-form" className="hover:text-white">
                Quick Order
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
