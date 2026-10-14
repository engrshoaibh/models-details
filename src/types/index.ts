export type ProviderName =
  | "Anthropic"
  | "OpenAI"
  | "Google"
  | "DeepSeek"
  | "Mistral"
  | "Meta";

export interface Model {
  id: string;
  short: string;
  glyph: string;
  sqColor: string;
  iconBadge: string;
  brandIcon: string;
  name: string;
  provider: ProviderName;
  input: number;
  cached: number;
  output: number;
  blended: number;
  batchDiscount: number;
  context: number;
  contextLabel: string;
  maxOut: number;
  maxOutLabel: string;
  thinking: boolean;
  vision: boolean;
  openWeight: boolean;
  cutoff: string;
  caps: string[];
  note: string;
  url: string;
  inHeroRight: boolean;
}

export interface MetricItem {
  label: string;
  val: string;
  pct: number;
  color: string;
}

export interface RateItem {
  k: string;
  v: string;
}

export interface ShowcaseCard {
  num: string;
  category: string;
  windowTitle: string;
  prefix: string;
  suffix: string;
  accent: string;
  iconBadge: string;
  desc: string;
  metrics: MetricItem[];
  rates: RateItem[];
  statusBadge: string;
  tags: string[];
  url: string;
  modelId: string;
}

export interface BenchmarkItem {
  name: string;
  prov: string;
  val: number;
  blended: number;
  url: string;
}

export interface BenchmarkSuite {
  title: string;
  unit: string;
  max: number;
  items: BenchmarkItem[];
}

export interface Dispatch {
  num: string;
  title: string;
  body: string;
  tags: string[];
  url: string;
}
