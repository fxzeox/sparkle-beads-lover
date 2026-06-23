const stripEmojiAndExtraSpaces = (value: string) =>
  value
    .replace(
      /[\u{1f000}-\u{1ffff}\u{2600}-\u{27bf}\u{fe0f}\u{200d}]/gu,
      ''
    )
    .replace(/\s+/g, ' ')
    .trim();

const titleCase = (value: string) =>
  value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export function buildDefaultProductDescription(name: string, price?: number) {
  const cleanName = stripEmojiAndExtraSpaces(name);
  const normalized = cleanName.toLowerCase();
  const priceLine = typeof price === 'number' && Number.isFinite(price)
    ? ` Available for Rs ${price.toLocaleString()}.`
    : '';

  if (normalized.includes('crystal beaded bracelet')) {
    const tone = normalized.includes('blue')
      ? 'soft blue crystal tones'
      : normalized.includes('white')
        ? 'elegant white crystal tones'
        : 'polished crystal bead details';
    return `A graceful ${titleCase(cleanName)} designed with ${tone}, perfect for adding a delicate sparkle to everyday and occasion wear.${priceLine}`;
  }

  if (normalized.includes('name bracelet')) {
    return `A stylish personalized bracelet set with elegant dangling charms, made to add a special and meaningful touch to your look.${priceLine}`;
  }

  if (normalized.includes('elastic bracelet')) {
    return `A comfortable elastic bracelet set with playful color combinations, easy to wear and perfect for daily styling or gifting.${priceLine}`;
  }

  if (normalized.includes('gajra') && normalized.includes('set')) {
    return `A beautifully crafted gajra bracelet set with festive beadwork, ideal for mehndi events, celebrations, and traditional styling.${priceLine}`;
  }

  if (normalized.includes('gajra')) {
    return `A charming gajra-style bracelet with detailed beadwork and a festive finish, made to stand out beautifully at special occasions.${priceLine}`;
  }

  if (normalized.includes('bangles')) {
    return `A bold and elegant bangles set designed to complete your festive look with a rich, polished finish.${priceLine}`;
  }

  if (normalized.includes('pendent') || normalized.includes('pendant') || normalized.includes('neck')) {
    return `A sleek pendant design with a graceful finish, perfect for adding a simple statement to your everyday jewelry collection.${priceLine}`;
  }

  if (normalized.includes('flower')) {
    return `A pretty floral beaded bracelet with a soft handcrafted feel, created to bring a fresh and feminine touch to your outfit.${priceLine}`;
  }

  if (normalized.includes('charm')) {
    return `A lovely charm bracelet with eye-catching detail and an elegant finish, perfect for gifting or everyday wear.${priceLine}`;
  }

  if (normalized.includes('magnetic')) {
    return `A neat magnetic bracelet with a modern handcrafted style, designed for easy wear and a polished everyday look.${priceLine}`;
  }

  if (normalized.includes('simple')) {
    return `A clean and minimal bracelet design that pairs easily with any outfit, offering a lightweight and elegant everyday style.${priceLine}`;
  }

  if (normalized.includes('black')) {
    return `A timeless black beaded design with a sleek handcrafted finish, made for elegant styling across casual and festive looks.${priceLine}`;
  }

  if (normalized.includes('pink')) {
    return `A soft pink handcrafted design with a sweet and graceful feel, perfect for adding a delicate pop of color.${priceLine}`;
  }

  if (normalized.includes('purple')) {
    return `A rich purple beaded design with a charming handcrafted finish, ideal for festive wear and standout styling.${priceLine}`;
  }

  return `A handcrafted ${cleanName || 'bracelet'} made with care and styled for a graceful, elegant look that works beautifully for gifting and everyday wear.${priceLine}`;
}

export function normalizeProductDescription(
  description: string | undefined,
  name: string,
  price?: number
) {
  const trimmedDescription = description?.trim();

  if (trimmedDescription) {
    return trimmedDescription;
  }

  return buildDefaultProductDescription(name, price);
}
