const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

const mod = { exports: {} };
const source = fs.readFileSync('src/pages/ProductsListPage.tsx', 'utf8');
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.React
  }
}).outputText;

const elementFactory = (type, props, ...children) => ({ type, props, children });
const reactMock = {
  default: { createElement: elementFactory, Fragment: Symbol.for('react.fragment') },
  createElement: elementFactory,
  Fragment: Symbol.for('react.fragment'),
  useState: () => [null, () => {}],
  useMemo: (fn) => fn(),
  useEffect: () => {}
};

new Function('exports', 'require', transpiled)(
  mod.exports,
  (name) => {
    if (name === 'react') return reactMock;
    if (name === 'react-router-dom') return { useParams: () => ({}), Link: () => null };
    if (name === 'lucide-react') return { Search: () => null, LayoutGrid: () => null, List: () => null, ShieldCheck: () => null };
    if (name === '../components/common/DynamicTopBanner') return { DynamicTopBanner: () => null };
    if (name === '../components/domain/ProductCard') return { ProductCard: () => null };
    if (name === '../components/ui/button') return { Button: () => null };
    if (name === '../services/api') return { api: { getProducts: async () => [] } };
    if (name === '../data/products') return { PRODUCTS: [] };
    return {};
  }
);

const { PRODUCT_CATEGORY_SLIDES } = mod.exports;

test('product category slides exist for all primary product catalog categories', () => {
  const requiredCategories = ['all', 'maritime', 'defence', 'tactical', 'medical', 'agriculture', 'industry', 'ict'];

  assert.ok(PRODUCT_CATEGORY_SLIDES, 'PRODUCT_CATEGORY_SLIDES should be defined');
  for (const cat of requiredCategories) {
    const slides = PRODUCT_CATEGORY_SLIDES[cat];
    assert.ok(slides, `Slides should exist for category ${cat}`);
    assert.ok(slides.length > 0, `Category ${cat} should have at least one slide`);

    for (const slide of slides) {
      assert.ok(slide.imageUrl, `Slide in ${cat} must have an imageUrl`);
      assert.ok(slide.badgeText, `Slide in ${cat} must have badgeText`);
      assert.ok(slide.title, `Slide in ${cat} must have a title`);
    }
  }
});

test('maritime category has dynamic slides tailored to maritime systems', () => {
  const maritimeSlides = PRODUCT_CATEGORY_SLIDES.maritime;
  assert.ok(maritimeSlides.length >= 2, 'Maritime category should have multiple slides for rotation');
  assert.ok(maritimeSlides.some(s => s.badgeText.includes('MARITIME')), 'Maritime slide badge should indicate maritime category');
  assert.ok(maritimeSlides.some(s => s.imageUrl.includes('maritime')), 'Maritime slide should use maritime imagery');
});
