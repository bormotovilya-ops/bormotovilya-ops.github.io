import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Aperture,
  ArrowDown,
  AtSign,
  ChevronDown,
  Clapperboard,
  Code2,
  Dices,
  ExternalLink,
  Mail,
  Medal,
  MessageCircle,
  Mic,
  Music2,
  Phone,
  Radio,
  Send,
  Sparkles,
} from "lucide-react";
import { useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Брендовая палитра: глубокий изумруд + золото + мятный акцент. Без бежевого.
// ---------------------------------------------------------------------------
const C = {
  bg: "#04251B", // основной фон (изумруд-почти-чёрный)
  bg2: "#063A2B", // фон-альтернатива для чередования секций
  ink: "#F1ECDD", // основной текст (тёплый кремовый)
  inkSoft: "rgba(241,236,221,0.72)",
  gold: "#C9A84C",
  goldSoft: "#E8D89A",
  mint: "#37C99A", // яркий акцент-лейбл
  line: "rgba(201,168,76,0.22)", // золотые хайрлайны
  card: "rgba(255,255,255,0.045)",
  cardHi: "rgba(255,255,255,0.07)",
} as const;

const PROJECTS = [
  {
    title: "Тренинг-новелла",
    desc: "Обучение через интерактивную историю — сюжет с вшитым тренингом",
    href: "https://spacegrowth.vercel.app/people-games-module",
  },
  {
    title: "Пространство развития",
    desc: "Мой проект про рост, технологии и смысл",
    href: "https://spacegrowth.vercel.app/",
  },
  {
    title: "Process Mining",
    desc: "Восстанавливаю и анализирую бизнес-процессы по цифровым следам",
    href: "https://bormotovilya-ops.github.io/beeff/process-mining/",
  },
];

// Авторы на тему самопознания и развития (то, что вспомнилось; список неполный).
const AUTHORS = [
  "Вадим Зеланд",
  "Джон Кехо",
  "Хосе Сильва",
  "Карлос Кастанеда",
  "Пауло Коэльо",
  "Конкордия Антарова",
  "Валерий Синельников",
  "Дмитрий Верищагин",
  "Экхарт Толле",
  "Дэн Миллмэн",
  "Лоран Гунель",
  "Робин Шарма",
  "Вишен Лакьяни",
  "Энтони Роббинс",
  "Ричард Бах",
  "Ошо",
  "Бодо Шефер",
  "Наполеон Хилл",
];

const FACETS = [
  { icon: Code2, label: "программист-математик", href: "#engineer" },
  { icon: Sparkles, label: "творческая личность", href: "#music" },
  { icon: Dices, label: "ведущий игр", href: "#community" },
  { icon: Medal, label: "спортсмен", href: "#sport" },
  { icon: Aperture, label: "проводник", href: "#meaning" },
];

const TRACKS_LIVE = [
  { title: "Спираль судьбы", src: "/audio/track-1.mp3" },
  { title: "Мирный воин", src: "/audio/track-2.mp3" },
  { title: "Инкогнито Бог", src: "/audio/track-3.mp3" },
];

const LYRICS: Record<string, string> = {
  "Спираль судьбы": `Куплет 1
И в новом витке, на спирали судьбы,
Начнём всё сначала — я и ты!
На шахматном поле мы пешки с тобой,
Но пешка ферзём станет и — снова в бой!

Припев
Мы рвём тишину, и не будет конца,
Огонь в наших венах, стучат сердца!
И даже когда рухнет мир предо мной —
Мы станем стеной, мы пойдём за мечтой!

Куплет 2
Сквозь бури и гром, сквозь холод и тьму,
Я знаю — с тобой всё смогу!
И пусть нас ломают, но мы не падём,
Ведь в наших руках мир, в котором живём!

Финал
Пусть пешка ферзём станет вновь,
Пусть мир оживит наша кровь…
На спирали судьбы — новый бой,
И в нём навсегда ты со мной!`,

  "Мирный воин": `Куплет 1
Повернувшись лицом к себе,
Слышу голос души в тишине.
Жизнь идёт здесь и сейчас,
А не где-то вдали от нас.

Куплет 2
Оковы разума разрываю —
Страхи, сомнения убираю.
Счастье — путь, а не наша цель,
Душа ведёт сквозь тьму и метель.

Припев
Главные победы — над самим собой!
Так я управляю собственной судьбой!
За рамки возможного смело я иду,
И силу бесконечную в сердце найду!

Бридж
Сила в гармонии, мудрость в душе,
Счастье в моменте — запомни уже!
Мирному воину всё по плечу,
Не прибегая в споре к мечу.`,

  "Инкогнито Бог": `Куплет 1
Я стоял на краю, где кончается свет,
На вопросы свои не нашёл я ответ,
Незнакомец меня здесь остановил,
Странную сделку он мне предложил!

Бридж
Ты получишь свой шанс в этой жизни сиять.
Но заданья мои должен ты выполнять!

Припев
Я принял свой вызов и нет пути назад,
Грядут перемены, быть частью их рад!
Страх — мой учитель, урок пройти смог,
Откроет мне двери инкогнито Бог!

Куплет 2
Заданья меня из седла выбивают!
Я больше не зритель, я выступаю:
Играю, флиртую, себя выбираю,
Всё новые роли к себе примеряю.

Бридж 2
Я понял себя и призвание обрёл,
Любовь в своём сердце, сняв маски, нашёл.
Меняю я мир посредством любви,
Бог направляет свершенья мои!`,

  Трансерфинг: `Куплет 1
Серые улицы города,
Блёклый свет фонарей,
Ветер душевного холода,
Отблеск потухших огней.
Смыслы метаться потеряны,
Как в паутине застрял,
Силы, что были отмерены,
На призрачный блеск променял.

Куплет 2
В лужах тают отраженья —
Смутный свет чужих миров,
И всё вокруг — моё виденье,
Тонкий след забытых снов.

Припев
Свою узнаю я цель,
Пойду к ней в открытую дверь,
Но где же мой проводник?
Тайных знаний родник.

Куплет 3
Плетут нити кукловоды,
Тёмный ток по ним течёт,
За чужой мечтой в походы
Меня больше не влечёт!

Финал
Свою обретаешь ты цель,
Идя к ней в открытую дверь,
Трансерфинг — наш проводник,
Тайных знаний родник.`,

  "Гений продаж": `Куплет 1
Я работал простым продавцом,
Не сказать что я был молодцом,
Ведь порой просыпал я заказ,
И клиентов лишался не раз!

Куплет 2
Мой директор узнал обо всём,
Наказание было потом:
Разморозкой холодных лидов
Заниматься теперь будь готов!

Припев
Сотни раз получал я отказ;
И скрипты переделал не раз.
Понимать не умею людей,
Даже нет никаких тут идей.

Поворот
Я ищу днём и даже в ночи
От сердец всех клиентов ключи,
И чем больше я их узнаю,
Тем сильнее я их полюблю.

Финал
Я работал простым продавцом,
Оказалось, чтоб быть молодцом,
Мне не нужно здесь гением быть —
Нужно дело своё полюбить!`,
};

// Каверы (пою чужое). Видео-кавер слева, аудио-каверы — списком справа.
const COVER_VIDEO = { title: "Серебро", artist: "Би-2", src: "/covers/serebro.mp4" };

const COVER_AUDIO = [
  { title: "Имя твоё", artist: "Колизей", src: "/covers/imya-tvoe.mp3" },
  { title: "Искушение", artist: "Ария", src: "/covers/iskushenie.mp3" },
  { title: "Звезда", artist: "", src: "/covers/zvezda.mp3" },
  { title: "Вдох-выдох", artist: "", src: "/covers/vdoh-vydoh.mp3" },
  { title: "When You Know", artist: "", src: "/covers/when-you-know.mp3" },
  { title: "Тайна хозяйки старинных часов", artist: "", src: "/covers/tayna.mp3" },
];

const STARMAKER_URL =
  "https://m.starmakerstudios.com/d/profileinfo?from_sid=13368297548&type=sing&color=FE3A6A&shareTime=1782472027&app_name=sm&userId=10133099161903711&cardKey=Profile&pid=Profire_share_B";

const TRACKS_AI = [
  { title: "Трансерфинг", src: "/audio/ai-1.mp3" },
  { title: "Гений продаж", src: "/audio/ai-3.mp3" },
  { title: "Окружение", src: "/audio/ai-4.mp3" },
  { title: "Kidcodes", src: "/audio/ai-5.mp3" },
];

const CONTACTS = [
  { icon: Send, label: "Telegram", href: "https://t.me/IlyaBorm" },
  { icon: Radio, label: "Telegram-канал", href: "https://t.me/SoulGuideIT" },
  { icon: MessageCircle, label: "ВКонтакте", href: "https://vk.com/ilyaborm" },
  {
    icon: AtSign,
    label: "MAX",
    href: "https://max.ru/u/f9LHodD0cOKxnQ9eQn42RBtlUVC3VZO3M1qetbYuy00-JhG0WDLUD6ukk8U",
  },
  { icon: Phone, label: "Телефон", href: "tel:+79991237788" },
  { icon: Mail, label: "E-mail", href: "mailto:bormotovilya@gmail.com" },
];

const RIDDLE = {
  question:
    "Пара нашла на пляже труп под зонтом — с ножом на спине. Ни следов борьбы, ни крови. Вскрытие показало: смерть естественная. Как так?",
  answer:
    "У мужчины была татуировка ножа на спине. Он умер от сердечного приступа.",
};

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

// ---------------------------------------------------------------------------

export default function App() {
  return (
    <main
      style={{ fontFamily: "var(--font-body)", backgroundColor: C.bg, color: C.ink }}
      className="relative w-full overflow-x-hidden"
    >
      <ScrollProgress />
      <Hero />
      <TwoWords />
      <Engineer />
      <Sport />
      <Music />
      <Community />
      <Meaning />
      <Travel />
      <Family />
      <Contacts />
    </main>
  );
}

// ---------------------------------------------------------------------------
// Прогресс-бар скролла (золотой) + помощники
// ---------------------------------------------------------------------------

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "0%", background: `linear-gradient(90deg, ${C.mint}, ${C.gold})` }}
      className="fixed left-0 top-0 z-50 h-[3px] w-full"
    />
  );
}

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

function Glow({ className = "" }: { className?: string }) {
  // Мягкое брендовое свечение (золото→изумруд), декоративное
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-0 rounded-full blur-[120px] ${className}`}
      style={{
        background: `radial-gradient(circle, rgba(201,168,76,0.22), rgba(55,201,154,0.05) 60%, transparent 70%)`,
      }}
    />
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: C.mint }}>
      <span className="h-[2px] w-6" style={{ backgroundColor: C.gold }} />
      {children}
    </p>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h2
      className="mt-4 text-3xl leading-[1.08] tracking-tight sm:text-4xl lg:text-[44px]"
      style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: C.ink }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[16px] leading-[1.78] sm:text-[17px]" style={{ color: C.inkSoft }}>
      {children}
    </p>
  );
}

function MiniLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: C.gold }}>
      {children}
    </p>
  );
}

function Foldable({
  icon: Icon,
  label,
  sub,
  defaultOpen = false,
  children,
}: {
  icon?: ComponentType<{ className?: string; style?: CSSProperties }>;
  label: string;
  sub?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-3 text-left">
        <span className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" style={{ color: C.gold }} />}
          <SectionLabel>{label}</SectionLabel>
        </span>
        <ChevronDown className="h-5 w-5 shrink-0 transition-transform" style={{ color: C.gold, transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      {sub && (
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed" style={{ color: C.inkSoft }}>
          {sub}
        </p>
      )}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Фото с параллаксом и мягким падением (graceful, если файла нет)
function PhotoFrame({
  src,
  alt,
  aspect = "aspect-[4/5]",
  rotate = 0,
  parallax = 0,
}: {
  src: string;
  alt: string;
  aspect?: string;
  rotate?: number;
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -6, rotate: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative ${aspect} w-full overflow-hidden rounded-[28px] border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]`}
      style={{ backgroundColor: C.bg2, borderColor: C.line, transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center text-center text-xs"
        style={{ color: "rgba(241,236,221,0.4)" }}
        aria-hidden
      >
        <span className="px-4">{alt}</span>
      </div>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className="absolute inset-0 h-[112%] w-full object-cover"
        onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
      />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------

function Hero() {
  const { scrollY } = useScroll();
  const yName = useTransform(scrollY, [0, 400], [0, -40]);

  return (
    <section style={{ backgroundColor: C.bg }} className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <Glow className="left-[-10%] top-[-10%] h-[520px] w-[520px]" />
      <Glow className="right-[-12%] bottom-[-15%] h-[460px] w-[460px]" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div style={{ y: yName }}>
            <motion.div {...fadeUp}>
              <SectionLabel>Личная страница</SectionLabel>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-5 text-[46px] leading-[0.96] tracking-tight sm:text-6xl lg:text-[80px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: C.ink }}
            >
              Илья
              <br />
              <span
                style={{
                  background: `linear-gradient(100deg, ${C.goldSoft}, ${C.gold} 55%, ${C.mint})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Бормотов
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mt-7 max-w-xl text-xl leading-snug sm:text-2xl"
              style={{ color: C.ink, fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              Сочетаю технический подход к творчеству и&nbsp;творческий — к&nbsp;технике.
            </motion.p>

            {/* Грани — новые карточки-плитки с иконками */}
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {FACETS.map((f, i) => (
                <motion.a
                  key={f.label}
                  href={f.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -5, backgroundColor: C.cardHi, borderColor: C.gold }}
                  className="flex cursor-pointer flex-col items-center gap-2.5 rounded-2xl border px-3 py-4 text-center"
                  style={{ borderColor: C.line, backgroundColor: C.card }}
                >
                  <f.icon className="h-6 w-6" style={{ color: C.gold }} />
                  <span className="hyphens-auto break-words text-[10px] font-semibold uppercase leading-tight tracking-[0.04em]" style={{ color: C.ink }}>
                    {f.label}
                  </span>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 6, 0] }}
              transition={{ delay: 1, duration: 2.2, repeat: Infinity }}
              className="mt-12 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em]"
              style={{ color: C.inkSoft }}
            >
              <ArrowDown className="h-4 w-4" /> листайте дальше
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            <PhotoFrame src="/photo.jpg" alt="Илья Бормотов" aspect="aspect-[4/5]" rotate={1.5} parallax={22} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------

function TwoWords() {
  return (
    <section style={{ backgroundColor: C.bg2 }} className="relative overflow-hidden py-24 sm:py-32">
      <Glow className="left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2" />
      <Container>
        <motion.div {...fadeUp} className="relative mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionLabel>В двух словах</SectionLabel>
          </div>
          <p
            className="mt-6 text-2xl leading-[1.4] sm:text-3xl lg:text-[36px]"
            style={{ color: C.ink, fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Сколько себя помню, я живу на стыке техники и творчества.
          </p>
          <p className="mt-7 text-[17px] leading-[1.8]" style={{ color: C.inkSoft }}>
            Днём я автоматизирую бизнес и пишу код, вечером могу сочинять песню, придумать викторину для друзей или сыграть с ними в интеллектуальные и спортивные игры. Мне правда интересно почти всё — как устроены машины и ещё интереснее, как устроены люди. Снаружи я довольно рациональный технарь, но внутри — про чувства, заботу и смысл. Эта страница — не резюме. Это про то, из чего я сделан.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------

function TwoCol({
  bg,
  reverse = false,
  children,
  media,
}: {
  bg: string;
  reverse?: boolean;
  children: ReactNode;
  media: ReactNode;
}) {
  return (
    <section style={{ backgroundColor: bg }} className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <motion.div {...fadeUp} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={reverse ? "lg:order-2" : ""}>{children}</div>
          <div className={reverse ? "lg:order-1" : ""}>{media}</div>
        </motion.div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------

function Engineer() {
  return (
    <section id="engineer" style={{ backgroundColor: C.bg }} className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        {/* Ряд 1: текст + фото */}
        <motion.div {...fadeUp} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:order-1">
            <SectionLabel>Инженер · мехмат · 20 лет в IT</SectionLabel>
            <H2>Укрощаю сложность</H2>
            <div className="mt-7 space-y-7">
              <div>
                <MiniLabel>С чего всё началось</MiniLabel>
                <div className="mt-2">
                  <P>
                    Всё началось с математики. В школе я был олимпиадником и через олимпиаду по математике попал на мехмат — выучился на математика-системного программиста. В IT пришёл в двадцать, ещё в начале двухтысячных, и прошёл весь путь — от разработчика до руководителя группы и архитектора систем.
                  </P>
                </div>
              </div>
              <div>
                <MiniLabel>Чем занимаюсь сегодня</MiniLabel>
                <div className="mt-2">
                  <P>
                    Автоматизирую бизнес на 1С и собираю обучающие продукты — курсы, интерактивные тренажёры, ботов. Но мой главный принцип — простота: чем сложнее система, тем чаще она ломается. Поэтому я убираю лишнее и оставляю только то, что работает стабильно и качественно. Сделать сложное простым и объяснить по-человечески мне в радость не меньше, чем писать код.
                  </P>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:order-2">
            <PhotoFrame src="/me.jpg" alt="За работой" aspect="aspect-[4/5]" rotate={-1.5} parallax={18} />
          </div>
        </motion.div>

        {/* Ряд 2: без фото, во всю ширину */}
        <motion.div
          {...fadeUp}
          className="mt-14 rounded-[28px] border p-7 sm:p-10"
          style={{ borderColor: C.line, backgroundColor: C.card }}
        >
          <MiniLabel>Инженерия и ИИ</MiniLabel>
          <div className="mt-2 max-w-3xl">
            <P>
              Последние пару лет я живу на стыке инженерии и искусственного интеллекта — и это как снова стать студентом, только круче: то, на что раньше уходили недели, теперь складывается за вечер. И можно наконец браться за то, о чём раньше только мечтал.
            </P>
          </div>

          <div className="mt-8">
            <SectionLabel>Можно посмотреть</SectionLabel>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col justify-between gap-3 rounded-2xl border p-5 transition-colors"
                  style={{ borderColor: C.line, backgroundColor: C.cardHi }}
                >
                  <span className="text-[15px]" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: C.ink }}>
                    {p.title}
                  </span>
                  <span className="text-[13px] leading-snug" style={{ color: C.inkSoft }}>
                    {p.desc}
                  </span>
                  <ExternalLink className="h-5 w-5" style={{ color: C.gold }} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------

function Sport() {
  return (
    <section id="sport" style={{ backgroundColor: C.bg2 }} className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <motion.div {...fadeUp} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[28px] border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]" style={{ borderColor: C.line }}>
              <video controls preload="none" poster="/team.jpg" className="block aspect-video w-full bg-black object-cover">
                <source src="/video/volley.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <PhotoFrame src="/volley-team.jpg" alt="Команда" aspect="aspect-[4/3]" rotate={-1} parallax={10} />
              <PhotoFrame src="/volley-prikamye.jpg" alt="Прикамье" aspect="aspect-[4/3]" rotate={1.5} parallax={10} />
            </div>
          </div>

          <div>
            <SectionLabel>Спорт</SectionLabel>
            <H2>От «звезды» двора — до мирного воина</H2>
            <div className="mt-6 space-y-5">
              <P>
                До тринадцати лет спорт был всем. Я сел на велосипед раньше, чем научился ходить. Три года спортивной акробатики — сальто, фляги, ходьба на руках. Потом пять лет карате с поясами и местами на соревнованиях, шашки с победами на чемпионатах лагеря и фирмы, где работал, дворовый футбол, где я брал чистой скоростью, лёгкая атлетика, сорок подтягиваний на спор. Я всерьёз видел в спорте своё будущее.
              </P>
              <P>
                В тринадцать всё перевернулось: травма закрыла дорогу в большой спорт. Это был тяжёлый разворот — но он научил меня главному: важны не рекорды, а то, что даёт радость и держит тебя живым. А сегодня спорт для меня — про здоровье и хорошее самочувствие, а не про рекорды. Регулярно играю в волейбол, периодически занимаюсь йогой и хожу в зал, плаваю. Такой активности мне вполне хватает, чтобы быть в форме, чувствовать себя бодро и держать здоровье в порядке.
              </P>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Акробатика", "Карате · 5 лет", "Шашки", "Футбол", "Лёгкая атлетика", "40 подтягиваний", "Волейбол · 13 лет"].map((s) => (
                <span
                  key={s}
                  className="rounded-full border px-3.5 py-1.5 text-[12px] font-semibold"
                  style={{ borderColor: C.line, color: C.ink, backgroundColor: C.card }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------

function TrackWithLyrics({ title, src, lyrics }: { title: string; src: string; lyrics?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: C.line, backgroundColor: C.card }}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <p className="min-w-[150px] text-[15px] font-semibold" style={{ fontFamily: "var(--font-display)", color: C.ink }}>
          {title}
        </p>
        <audio controls preload="none" className="w-full sm:max-w-[340px]" style={{ colorScheme: "dark" }}>
          <source src={src} type="audio/mpeg" />
        </audio>
        {lyrics && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="shrink-0 rounded-lg border px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors"
            style={{ borderColor: C.line, color: open ? C.bg : C.gold, backgroundColor: open ? C.gold : "transparent" }}
          >
            Текст
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {open && lyrics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p
              className="mt-4 whitespace-pre-line border-t pt-4 text-[14px] leading-[1.7]"
              style={{ color: C.inkSoft, borderColor: C.line }}
            >
              {lyrics}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Music() {
  return (
    <section id="music" style={{ backgroundColor: C.bg }} className="relative overflow-hidden py-24 sm:py-32">
      <Glow className="right-[-10%] top-[5%] h-[420px] w-[420px]" />
      <Container>
        <motion.div {...fadeUp} className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:order-2">
            <PhotoFrame src="/vokal.jpg" alt="За микрофоном" aspect="aspect-[4/5]" rotate={1.5} parallax={20} />
          </div>
          <div className="lg:order-1">
            <SectionLabel>Музыка</SectionLabel>
            <H2>Стихи, которые зазвучали</H2>
            <div className="mt-6">
              <P>
                С детства мне нравилось писать стихи — переделывал слова в любимых песнях, придумывал свои. Сочинить целую песню всегда мечтал, но музыкального образования у меня нет, и придумать мелодию казалось чем-то нереальным. А теперь с этим прекрасно справляются нейросети: из стиха получается не просто текст, а настоящая песня — с музыкой и голосом. Слова по-прежнему мои, а в нескольких треках и голос мой, записанный поверх минуса.
              </P>
            </div>
            <blockquote
              className="mt-8 border-l-4 pl-5 text-2xl italic leading-snug sm:text-3xl"
              style={{ borderColor: C.gold, color: C.goldSoft, fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              «Главные победы — над самим собой»
            </blockquote>
          </div>
        </motion.div>

        {/* Спел сам */}
        <motion.div {...fadeUp} className="mt-16">
          <div className="rounded-[28px] border p-6 sm:p-9" style={{ borderColor: C.line, backgroundColor: C.card }}>
            <div className="flex items-center gap-2">
              <Mic className="h-5 w-5" style={{ color: C.mint }} />
              <SectionLabel>Спел сам</SectionLabel>
            </div>
            <p className="mt-3 max-w-2xl text-[16px] leading-relaxed" style={{ color: C.inkSoft }}>
              Тексты мои, и голос в этих треках — мой: записал свой вокал поверх минуса. Музыку помогла родить нейросеть.
            </p>
            <div className="mt-7 space-y-3">
              {TRACKS_LIVE.map((t) => (
                <TrackWithLyrics key={t.title} title={t.title} src={t.src} lyrics={LYRICS[t.title]} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Каверы — сворачиваемый блок: видео Би-2 слева, аудио-каверы списком справа */}
        <motion.div {...fadeUp} className="mt-12 rounded-[28px] border p-6 sm:p-8" style={{ borderColor: C.line, backgroundColor: C.card }}>
          <Foldable icon={Clapperboard} label="Каверы">
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: C.inkSoft }}>
              Пою и чужое — для удовольствия. Записываю каверы в приложении StarMaker.{" "}
              <a
                href={STARMAKER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline decoration-dotted underline-offset-4"
                style={{ color: C.gold }}
              >
                Мой профиль →
              </a>
            </p>

            <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start">
            {/* Видео-кавер (вертикальный, без обрезки; первый кадр — как обложка) */}
            <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl border shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]" style={{ borderColor: C.line }}>
              <video controls preload="metadata" className="block h-auto w-full bg-black">
                <source src={`${COVER_VIDEO.src}#t=0.1`} type="video/mp4" />
              </video>
              <p className="px-4 py-3 text-[13px]" style={{ color: C.ink, backgroundColor: C.cardHi }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{COVER_VIDEO.title}</span>
                <span style={{ color: C.inkSoft }}> — {COVER_VIDEO.artist}</span>
              </p>
            </div>

            {/* Аудио-каверы списком */}
            <ul className="overflow-hidden rounded-2xl border" style={{ borderColor: C.line, backgroundColor: C.card }}>
              {COVER_AUDIO.map((t, i) => (
                <li
                  key={t.title}
                  className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
                  style={{ borderTop: i === 0 ? "none" : `1px solid ${C.line}` }}
                >
                  <span className="min-w-[150px] text-[14px]" style={{ fontFamily: "var(--font-display)", color: C.ink }}>
                    <span style={{ fontWeight: 600 }}>{t.title}</span>
                    {t.artist && <span style={{ color: C.inkSoft }}> — {t.artist}</span>}
                  </span>
                  <audio controls preload="none" className="w-full sm:max-w-[340px]" style={{ colorScheme: "dark" }}>
                    <source src={t.src} type="audio/mpeg" />
                  </audio>
                </li>
              ))}
            </ul>
            </div>
          </Foldable>
        </motion.div>

        {/* Слова мои — голос ИИ — сворачиваемый */}
        <motion.div {...fadeUp} className="mt-8 rounded-[28px] border p-6 sm:p-8" style={{ borderColor: C.line, backgroundColor: C.card }}>
          <Foldable icon={Sparkles} label="Слова мои — голос ИИ">
            <p className="mt-4 max-w-2xl text-[14px] leading-relaxed" style={{ color: C.inkSoft }}>
              Тексты я писал сам, а спел их ИИ. Получилась странная и честная штука.
            </p>
            <div className="mt-5 space-y-3">
              {TRACKS_AI.map((t) => (
                <TrackWithLyrics key={t.title} title={t.title} src={t.src} lyrics={LYRICS[t.title]} />
              ))}
            </div>
          </Foldable>
        </motion.div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------

function Community() {
  const [open, setOpen] = useState(false);
  return (
    <section id="community" style={{ backgroundColor: C.bg2 }} className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <motion.div {...fadeUp} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-4">
            <PhotoFrame src="/mzgb1.jpg" alt="Мозгобойня" aspect="aspect-[4/3]" rotate={-1.5} parallax={14} />
            <PhotoFrame src="/mzgb2.jpg" alt="Мозгобойня" aspect="aspect-[16/10]" rotate={1} parallax={10} />
          </div>
          <div>
            <SectionLabel>Игра / сообщество</SectionLabel>
            <H2>Не умею скучать</H2>
            <div className="mt-6">
              <P>
                Я не умею скучать — люблю проводить время весело и с интересом, особенно за интеллектуальными играми: Мозгобойня, ЧГК, настолки. Состою в тематических сообществах по интересам, а одно даже собрал и вёл сам — чат на семьдесят с лишним человек, где мы каждый день общались и играли: викторины, мафия, «Оборотень», данетки до ночи. Придумать формат и увлечь людей вокруг игры — отдельное удовольствие.
              </P>
            </div>

            <div className="mt-8 rounded-[24px] border p-6" style={{ borderColor: C.line, backgroundColor: C.card }}>
              <SectionLabel>ДаНет-ка</SectionLabel>
              <p className="mt-2 text-[13px]" style={{ color: C.inkSoft }}>
                попробуй разгадай
              </p>
              <p className="mt-3 text-lg italic leading-relaxed sm:text-xl" style={{ color: C.ink, fontFamily: "var(--font-display)" }}>
                {RIDDLE.question}
              </p>
              <button
                onClick={() => setOpen((v) => !v)}
                className="mt-5 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-transform active:scale-[0.98]"
                style={{ backgroundColor: C.gold, color: C.bg }}
              >
                {open ? "Спрятать разгадку" : "Показать разгадку"}
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-5 text-[15px] leading-relaxed" style={{ color: C.inkSoft }}>
                      {RIDDLE.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="mt-5 text-[13px] italic" style={{ color: C.inkSoft }}>
                Любишь думать? У меня таких — целая коллекция.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------

function Meaning() {
  return (
    <section id="meaning" style={{ backgroundColor: C.bg }} className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        {/* текст слева, фото справа */}
        <motion.div {...fadeUp} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:order-1">
            <SectionLabel>Смысл</SectionLabel>
            <H2>Главный вопрос</H2>
            <div className="mt-6 space-y-5">
              <P>
                Лет пятнадцать я копаю вглубь себя. Вёл блог{" "}
                <a
                  href="https://poznaysebya.wordpress.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline decoration-dotted underline-offset-4"
                  style={{ color: C.gold }}
                >
                  «Познай себя»
                </a>
                , перепробовал самые разные системы понимания человека — не ради ярлыков, а ради честного вопроса: кто я и куда иду.
              </P>
              <P>
                Окончательного ответа у меня нет — зато есть кое-что живее: я постоянно нахожу новые, всё более глубокие ответы, и каждый из них переворачивает то, что я знал раньше. В этом и есть смысл — не застывать, а идти дальше. Этот поиск до сих пор со мной: в текстах песен, в разговорах за полночь, в том, как я выбираю, чем заниматься и с кем быть рядом.
              </P>
            </div>
          </div>
          <div className="lg:order-2">
            <div className="overflow-hidden rounded-[28px] border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]" style={{ borderColor: C.line }}>
              <img
                src="/bw.jpg"
                alt="Один из тихих кадров"
                loading="lazy"
                className="block h-auto w-full"
                style={{ filter: "grayscale(1) contrast(1.02)" }}
              />
            </div>
          </div>
        </motion.div>

        {/* книги — во всю ширину */}
        <motion.div
          {...fadeUp}
          className="mt-14 rounded-[28px] border p-7 sm:p-10"
          style={{ borderColor: C.line, backgroundColor: C.card }}
        >
          <MiniLabel>Авторы, которые меня сформировали</MiniLabel>
          <p className="mt-2 max-w-3xl text-[15px] leading-relaxed" style={{ color: C.inkSoft }}>
            То, что успел вспомнить из прочитанного на тему самопознания и развития — список наверняка неполный. Некоторые из этих книг стали моими песнями: «Мирный воин», «Инкогнито Бог», «Трансерфинг».
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {AUTHORS.map((a) => (
              <span
                key={a}
                className="rounded-full border px-4 py-2 text-[14px]"
                style={{ borderColor: C.line, backgroundColor: C.cardHi, color: C.ink, fontFamily: "var(--font-display)" }}
              >
                {a}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------

function Travel() {
  return (
    <section style={{ backgroundColor: C.bg2 }} className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        {/* Ряд 1: текст слева, видео справа — ровные колонки */}
        <motion.div {...fadeUp} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionLabel>Путешествия</SectionLabel>
            <H2>Дорога как практика</H2>
            <div className="mt-6 space-y-5">
              <P>
                Для меня дорога — это про практику, а не про галочки на карте. Самые важные поездки — йога-туры с моим{" "}
                <a
                  href="https://vk.com/v.yoga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline decoration-dotted underline-offset-4"
                  style={{ color: C.gold }}
                >
                  инструктором по йоге
                </a>
                : рассветы на Алтае, медитации на острове Ольхон посреди Байкала. Там, вдали от городов и экранов, проще всего услышать тишину внутри — то самое, что я ищу всю жизнь.
              </P>
              <P>
                А меньше года назад дорога привела меня к большой перемене: я перебрался из Перми к морю, в Сочи. Он оказался и курортом, и живым контрастным городом — где море, горы и потрясающей красоты природа соседствуют с обычной рабочей жизнью. Не побег от прошлого, а шаг к следующему этапу.
              </P>
              <P>
                В пути я возвращаюсь к себе: меньше суеты, больше тишины — а из неё потом рождаются и песни, и идеи, и просто силы идти дальше.
              </P>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]" style={{ borderColor: C.line }}>
            <video controls preload="metadata" className="block aspect-video w-full bg-black object-cover">
              <source src="/travel/video.mp4#t=0.1" type="video/mp4" />
            </video>
            <p className="px-4 py-3 text-[13px]" style={{ color: C.ink, backgroundColor: C.cardHi }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>Горный Алтай</span>
              <span style={{ color: C.inkSoft }}> — йога-тур на остров</span>
            </p>
          </div>
        </motion.div>

        {/* Ряд 2: фото-полоса во всю ширину */}
        <motion.div {...fadeUp} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { src: "/travel/sunrise.jpg", cap: "Алтай" },
            { src: "/travel/baikal.jpg", cap: "Байкал · Ольхон" },
            { src: "/travel/sochi.jpg", cap: "Сочи" },
            { src: "/travel/thailand.jpg", cap: "Таиланд" },
          ].map((p) => (
            <div key={p.src}>
              <PhotoFrame src={p.src} alt={p.cap} aspect="aspect-[4/3]" parallax={8} />
              <p className="mt-2 text-center text-[11px] uppercase tracking-[0.14em]" style={{ color: C.inkSoft }}>
                {p.cap}
              </p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function Family() {
  return (
    <TwoCol
      bg={C.bg}
      media={
        <div
          className="overflow-hidden rounded-[28px] border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
          style={{ borderColor: C.line }}
        >
          <img
            src="/family.jpg"
            alt="С женой"
            loading="lazy"
            className="block aspect-[5/4] w-full object-cover"
            style={{ objectPosition: "center 58%" }}
          />
        </div>
      }
    >
      <SectionLabel>Семья</SectionLabel>
      <H2>Мои самые близкие</H2>
      <div className="mt-6 space-y-5">
        <P>
          С женой мы вместе уже двадцать лет. Тема самопознания всплыла ещё при первом знакомстве и сильно помогла нам сблизиться: нас многое объединяет, и во многом мы дополняем друг друга. Она удивительно творческий человек и поёт просто шикарно — по сути, именно она привела меня в музыку.
        </P>
        <P>
          Вместе ходили на йогу и ездили в йога-туры, а сейчас путешествуем. И в Сочи мы переехали тоже благодаря ей. А ещё мы растим сына — прекрасного, талантливого человека, в котором сочетаются все наши лучшие качества!
        </P>
      </div>
    </TwoCol>
  );
}

function Contacts() {
  return (
    <section style={{ backgroundColor: C.bg2 }} className="relative overflow-hidden py-24 sm:py-32">
      <Glow className="left-1/2 bottom-[-10%] h-[420px] w-[640px] -translate-x-1/2" />
      <Container>
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionLabel>Найти меня</SectionLabel>
          </div>
          <H2>Если захочется написать — пишите</H2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: C.inkSoft }}>
            Не обещаю отвечать в ту же секунду — но прочитаю обязательно. И по делу, и просто так — отвечу с радостью.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
          {CONTACTS.map((c) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              whileHover={{ y: -3, borderColor: C.gold, backgroundColor: C.cardHi }}
              className="flex items-center gap-3 rounded-2xl border px-5 py-4"
              style={{ borderColor: C.line, backgroundColor: C.card, color: C.ink }}
            >
              <c.icon className="h-5 w-5" style={{ color: C.gold }} />
              <span className="text-[15px] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                {c.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        <p className="mt-16 text-center text-[12px] uppercase tracking-[0.25em]" style={{ color: C.inkSoft }}>
          © {new Date().getFullYear()} Илья Бормотов
        </p>
      </Container>
    </section>
  );
}
