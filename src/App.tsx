import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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
  Maximize2,
  Medal,
  MessageCircle,
  Mic,
  Music2,
  Phone,
  Radio,
  Send,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

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
// note — личный комментарий: что именно у автора читал Илья.
const AUTHORS = [
  { name: "Вадим Зеланд", note: "«Трансерфинг реальности» перевернул мой взгляд на то, как намерение лепит события. Настолько лёг на душу, что стал моей песней «Трансерфинг»." },
  { name: "Дэн Миллмэн", note: "«Путь мирного воина» — про победы над самим собой. Из него родилась моя песня «Мирный воин». Прочитал и вторую — «Путешествие Сократа», про юные годы его наставника Сократеса." },
  { name: "Лоран Гунель", note: "«Бог всегда путешествует инкогнито» отозвался так, что превратился в песню «Инкогнито Бог»." },
  { name: "Стивен Кови", note: "«7 навыков высокоэффективных людей» — очень хорошая и системная книга про приоритеты, проактивность и привычки. Одна из самых структурных в этом списке." },
  { name: "Джон Кехо", note: "«Подсознание может всё!» — с него у меня началась практика работы с мыслью и визуализацией." },
  { name: "Хосе Сильва", note: "«Управление разумом по методу Сильва» — первые осознанные опыты с состояниями и самонастройкой." },
  { name: "Карлос Кастанеда", note: "«Учение дона Хуана» и дальше по серии — про точку сборки и охоту за силой. Читал залпом." },
  { name: "Пауло Коэльо", note: "«Алхимик» — про Свою Стезю и язык знаков. Та книга, к которой возвращаешься в разные годы по-разному." },
  { name: "Конкордия Антарова", note: "«Две жизни» — медленное, глубокое чтение про путь ученика. Из тех, что меняют тон внутреннего голоса." },
  { name: "Валерий Синельников", note: "«Возлюби болезнь свою» — про то, как тело говорит с нами симптомами. Многое про себя понял." },
  { name: "Дмитрий Верищагин", note: "Система ДЭИР — «Освобождение» и дальше. Прикладная работа с энергетикой и намерением." },
  { name: "Экхарт Толле", note: "«Сила момента сейчас» и «Новая земля» — про жизнь здесь и сейчас, а не где-то вдали. Классные вещи; этот мотив у меня и в песнях." },
  { name: "Робин Шарма", note: "«Монах, который продал свой Феррари» — простая притча, с которой удобно начинать менять привычки." },
  { name: "Радислав Гандапас", note: "«Камасутра для оратора» — его самая рейтинговая: лёгкий и толковый разбор публичных выступлений." },
  { name: "Вишен Лакьяни", note: "Книги не читал — проходил его бесплатные тренинги (Mindvalley). Про то, как ставить под сомнение «правила» и жить по своим." },
  { name: "Энтони Роббинс", note: "Книги не читал — был на его бесплатных тренингах. Мощный заряд про управление состоянием и решениями." },
  { name: "Павел Кочкин", note: "Книги не читал — проходил его бесплатные тренинги про поиск дела жизни и предназначение." },
  { name: "Ричард Бах", note: "«Чайка по имени Джонатан Ливингстон» и «Иллюзии» — про свободу и то, что границы чаще в голове." },
  { name: "Ошо", note: "«Осознанность» и беседы — про наблюдателя внутри. Читал не подряд, а как собеседника под настроение." },
  { name: "Бодо Шефер", note: "«Путь к финансовой свободе» — здравая база про деньги и дисциплину, без эзотерики." },
  { name: "Наполеон Хилл", note: "«Думай и богатей» — классика про намерение и упорство. Одна из первых книг этого ряда у меня." },
  { name: "Дейл Карнеги", note: "«Как завоёвывать друзей и оказывать влияние на людей» — азбука тёплого общения, к которой возвращаешься годами." },
  { name: "Хэл Элрод", note: "«Магия утра» — про силу утренних ритуалов: как первый час задаёт тон всему дню. Простая практика, которая реально меняет режим." },
  { name: "Колин Типпинг", note: "«Радикальное Прощение» — про то, как по-настоящему отпускать обиды и видеть в каждой ситуации урок, а не вину. Меняет отношение к прошлому и к людям." },
];

const FACETS = [
  { icon: Code2, label: "программист-математик", href: "#engineer" },
  { icon: Sparkles, label: "творческая личность", href: "#music" },
  { icon: Dices, label: "ведущий игр", href: "#community" },
  { icon: Medal, label: "спортсмен", href: "#sport" },
  { icon: Aperture, label: "проводник смыслов", href: "#meaning" },
];

const TRACKS_LIVE = [
  { title: "Мирный воин", src: "/audio/track-2.mp3" },
  { title: "Инкогнито Бог", src: "/audio/track-3.mp3" },
  { title: "Спираль судьбы", src: "/audio/track-1.mp3" },
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
  { title: "Звезда", artist: "Витас", src: "/covers/zvezda.mp3" },
  { title: "Вдох-выдох", artist: "T9", src: "/covers/vdoh-vydoh.mp3" },
  { title: "When You Know", artist: "Scorpions", src: "/covers/when-you-know.mp3" },
  { title: "Тайна хозяйки старинных часов", artist: "КиШ", src: "/covers/tayna.mp3" },
];

const STARMAKER_URL =
  "https://m.starmakerstudios.com/d/profileinfo?from_sid=13368297548&type=sing&color=FE3A6A&shareTime=1782472027&app_name=sm&userId=10133099161903711&cardKey=Profile&pid=Profire_share_B";

const TRACKS_AI = [
  { title: "Спираль судьбы", src: "/audio/ai-spiral.mp3" },
  { title: "Мирный воин", src: "/audio/ai-mirnyi-voin.mp3" },
  { title: "Инкогнито Бог", src: "/audio/ai-incognito.mp3" },
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

// Игра «Телепатия» в формате чата с Ильёй. В каждом раунде 3 факта, один — ложь.
// Игрок выбирает, какой факт считает ложным. lie — индекс ложного утверждения.
// У каждого факта свой comment — личная реакция Ильи при выборе именно его.
type QuizStatement = { text: string; comment: string; video?: string; image?: string };
type QuizRound = {
  intro: string;
  statements: [QuizStatement, QuizStatement, QuizStatement];
  lie: 0 | 1 | 2;
};

const QUIZ: QuizRound[] = [
  {
    intro: "Сыграем? Будет 5 раундов. В каждом — три факта обо мне: два правдивых и один выдуманный. Твоя задача — почувствовать, где я соврал. Поехали, вот первый:",
    statements: [
      {
        text: "Меня зовут Илья Бормотов",
        comment:
          "Не угадал — Бормотов это правда, моя настоящая фамилия. Кстати, наш род в семейном дереве прослеживается аж до 1820-х 🌳",
      },
      {
        text: "Мне 45 лет",
        comment: "Верно! Мне не 45 — я родился в 1986 году. Точный возраст оставлю посчитать тебе 😉",
      },
      {
        text: "Я живу в городе Сочи",
        comment: "Мимо — в Сочи я и правда живу. Переехал сюда из Перми, поближе к морю и горам 🌊",
      },
    ],
    lie: 1,
  },
  {
    intro: "А чем я живу? Тут тоже одна подмена.",
    statements: [
      {
        text: "Я занимаюсь разработкой информационных систем",
        comment: "Не угадал — это чистая правда. В IT я больше 20 лет, занимаюсь автоматизацией и системами.",
      },
      {
        text: "Я увлекаюсь программами саморазвития",
        comment: "Мимо — саморазвитие это прямо моё, я даже вёл блог «Познай себя». Попробуй ещё раз 🙂",
      },
      {
        text: "Я профессиональный спортсмен",
        comment:
          "Верно. Профессионалом я не стал — путь в большой спорт закрыла травма в 13 лет. Но любитель я страстный 😅",
        image: "/telepathy/sport.jpg",
      },
    ],
    lie: 2,
  },
  {
    intro: "Теперь про тело и таланты. Что из этого я выдумал?",
    statements: [
      {
        text: "Мой рекорд в подтягивании — 40 раз",
        comment: "Не-а, это правда — личный рекорд 40 раз 💪",
      },
      {
        text: "Умею делать сальто",
        comment: "Мимо — сальто умею, спасибо трём годам спортивной акробатики в детстве. Вот доказательство:",
        video: "/telepathy/salto.mp4",
      },
      {
        text: "Владею игрой на музыкальном инструменте",
        comment:
          "Правильно! Ни на одном инструменте играть не умею, хоть музыку очень люблю. Надеюсь когда-нибудь это исправить 🎶",
      },
    ],
    lie: 2,
  },
  {
    intro: "Немного историй из жизни. Одна из них — не про меня.",
    statements: [
      {
        text: "В детстве я хотел быть милиционером",
        comment: "Не угадал — в детстве я и правда мечтал быть милиционером 🚓",
      },
      {
        text: "Отслужил 2 года в армии",
        comment:
          "Верно — в армии я не служил, не взяли по здоровью. Зато за «угон» авто меня однажды реально задерживали: я просто перепутал, где оставил машину, объявил её в розыск, а потом нашёл сам в соседнем дворе — радостно сел, и тут меня и поймали 😅",
      },
      {
        text: "Однажды был задержан за угон авто",
        comment:
          "Мимо — а ведь это правда! Только я не угонял: перепутал, где оставил свою машину, заявил в розыск, нашёл её сам в соседнем дворе, радостно сел — тут меня и задержали 😅",
        image: "/telepathy/car.png",
      },
    ],
    lie: 1,
  },
  {
    intro: "И финал — про взгляды и тайны. Последний подвох!",
    statements: [
      {
        text: "Считаю, что любовь живёт 3 года",
        comment:
          "Верно! По-моему, у любви целых 7 стадий:\n1) Влюблённость\n2) Насыщение\n3) Отвращение\n4) Терпение\n5) Служение\n6) Дружба\n7) Настоящая любовь\nЗа 3 года обычно доходят до «Отвращения» — и многие сдаются. Но кто идёт дальше, того ждёт настоящее счастье 🙏",
      },
      {
        text: "У меня есть брат-близнец",
        comment:
          "Мимо, это был вопрос с подвохом!)) У меня есть двоюродный брат, и мы с ним близнецы… по знаку зодиака 😀 Коварно, прости 🙏",
      },
      {
        text: "Помню 80 знаков после запятой в числе Пи",
        comment:
          "Мимо — а это правда! Есть методики запоминания длинных цепочек цифр, я в своё время практиковался ради интереса 👍",
      },
    ],
    lie: 0,
  },
];

// Аватарка Ильи для чата (можно заменить на отдельный файл-портрет).
const ILYA_AVATAR = "/photo.jpg";

// Титул по числу угаданных (индекс = число правильных, 0..5).
const QUIZ_TITLES: { title: string; tagline: string }[] = [
  { title: "Случайный прохожий", tagline: "Мы точно знакомы?" },
  { title: "Случайный прохожий", tagline: "Кажется, нас ещё не представили." },
  { title: "Знакомый", tagline: "Где-то пересекались — это уже что-то." },
  { title: "Приятель", tagline: "А ты неплохо меня считываешь." },
  { title: "Друг", tagline: "Почти в самую точку. Уважаю." },
  { title: "Роднее некуда", tagline: "Ты читаешь меня как открытую книгу. Телепатия!" },
];

// Открывается только при 5/5. Награда — секрет, но за ним нужно написать Илье
// в личные сообщения пароль. Пароль зависит от числа попыток (см. PASSWORD_BASE).
const QUIZ_SECRET = {
  title: "Телепатия: 5 из 5! 🔮",
  intro: "Раз уж ты видишь меня насквозь — у меня есть для тебя секрет. Но просто так не отдам 😉",
  instruction: "Напиши мне в личные сообщения этот пароль — и я поделюсь секретом:",
  cta: { label: "Написать Илье", href: "https://t.me/IlyaBorm" },
};

// Пароль = PASSWORD_BASE + номер попытки: 1-я → 1234, 2-я → 1235, и т.д.
const PASSWORD_BASE = 1233;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

// ============================================================================
// Визуальные эффекты
// ============================================================================

// Мерцающие искры — слой за контентом
function SparkleField({ count = 26 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.4 + 1,
        delay: Math.random() * 4,
        dur: Math.random() * 3 + 2.5,
        mint: Math.random() < 0.34,
      })),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            backgroundColor: d.mint ? C.mint : C.goldSoft,
            boxShadow: `0 0 ${d.size * 3}px ${d.mint ? C.mint : C.gold}`,
            animation: `twinkle ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// Sparkles (по мотивам Aceternity) — плотное поле мерцающих частиц на canvas.
// Без сторонних зависимостей; пауза, когда блок вне экрана.
function SparklesCore({
  className = "",
  color = "#FFFFFF",
  density = 100,
  minSize = 0.6,
  maxSize = 1.6,
}: {
  className?: string;
  color?: string;
  density?: number;
  minSize?: number;
  maxSize?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    const t0 = performance.now();
    let particles: { x: number; y: number; r: number; a: number; sp: number; ph: number }[] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(1600, Math.max(60, Math.round(((w * h) / 170) * (density / 100))));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: minSize + Math.random() * (maxSize - minSize),
        a: 0.25 + Math.random() * 0.75,
        sp: 0.6 + Math.random() * 1.8,
        ph: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (const p of particles) {
        ctx.globalAlpha = p.a * (0.45 + 0.55 * Math.sin(p.ph + t * p.sp));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [color, density, minSize, maxSize]);

  return <canvas ref={ref} aria-hidden className={className} />;
}

// Tracing beam — золотой луч-«позвоночник» слева, заполняется по скроллу (десктоп)
function TracingBeam() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-4 top-0 z-40 hidden h-screen w-[2px] lg:block"
      style={{ backgroundColor: "rgba(201,168,76,0.12)" }}
    >
      <motion.div
        className="absolute inset-0 origin-top"
        style={{ scaleY, background: `linear-gradient(${C.mint}, ${C.gold})`, boxShadow: `0 0 10px ${C.gold}` }}
      />
    </div>
  );
}

// Текст «проявляется» по словам (Text generate)
function WordReveal({
  text,
  className,
  style,
  delay = 0,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: delay + i * 0.07, duration: 0.5, ease: "easeOut" }}
          className="inline-block"
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}

// Хук 3D-наклона по положению курсора
function useTilt(max = 9) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 18 });
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  };
  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };
  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

// Бейдж-грань с 3D-наклоном и якорной ссылкой
function FacetBadge({
  f,
  i,
  wide,
  mouseX,
}: {
  f: (typeof FACETS)[number];
  i: number;
  wide?: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  // Расстояние от курсора до центра карточки (proximity-док)
  const distance = useTransform(mouseX, (val) => {
    const b = ref.current?.getBoundingClientRect();
    if (!b) return 10000;
    return val - (b.left + b.width / 2);
  });
  const scaleSync = useTransform(distance, [-170, 0, 170], [1, 1.26, 1]);
  const scale = useSpring(scaleSync, { stiffness: 260, damping: 20, mass: 0.4 });

  return (
    <motion.a
      ref={ref}
      href={f.href}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
      whileHover={{ backgroundColor: C.cardHi, borderColor: C.gold }}
      style={{ scale, transformOrigin: "center bottom", borderColor: C.line, backgroundColor: C.card }}
      className={`flex cursor-pointer flex-col items-center gap-2.5 rounded-2xl border px-3 py-4 text-center ${
        wide ? "col-span-2 sm:col-span-1" : ""
      }`}
    >
      <f.icon className="h-6 w-6" style={{ color: C.gold }} />
      <span className="hyphens-auto break-words text-[10px] font-semibold uppercase leading-tight tracking-[0.04em]" style={{ color: C.ink }}>
        {f.label}
      </span>
    </motion.a>
  );
}

// Карточка проекта с 3D-наклоном
function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
  const tilt = useTilt(8);
  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      whileHover={{ borderColor: C.gold }}
      style={{ borderColor: C.line, backgroundColor: C.cardHi, rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 600 }}
      className="flex flex-col justify-between gap-3 rounded-2xl border p-5"
    >
      <span className="text-[15px]" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: C.ink }}>
        {p.title}
      </span>
      <span className="text-[13px] leading-snug" style={{ color: C.inkSoft }}>
        {p.desc}
      </span>
      <ExternalLink className="h-5 w-5" style={{ color: C.gold }} />
    </motion.a>
  );
}

// ---------------------------------------------------------------------------

// При старте любого аудио/видео ставим на паузу все остальные — чтобы два
// трека (и аудио, и видео) не звучали одновременно. Событие `play` не всплывает,
// поэтому слушаем его на document в фазе перехвата (capture).
function useExclusiveMediaPlayback() {
  useEffect(() => {
    const onPlay = (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLMediaElement)) return;
      document.querySelectorAll<HTMLMediaElement>("audio, video").forEach((el) => {
        if (el !== target && !el.paused) el.pause();
      });
    };
    document.addEventListener("play", onPlay, true);
    return () => document.removeEventListener("play", onPlay, true);
  }, []);
}

export default function App() {
  useExclusiveMediaPlayback();

  return (
    <main
      style={{ fontFamily: "var(--font-body)", backgroundColor: C.bg, color: C.ink }}
      className="relative w-full overflow-x-hidden"
    >
      <ScrollProgress />
      <TracingBeam />
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
    <div className={`relative z-10 mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

// Огромная полупрозрачная надпись-«водяной знак» на фоне секции (только десктоп).
function GhostTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-0 hidden select-none whitespace-nowrap leading-none md:block ${className}`}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 300,
        letterSpacing: "0.04em",
        color: "rgba(201,168,76,0.07)",
      }}
    >
      {children}
    </span>
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
  const tilt = useTilt(7);

  return (
    <motion.div
      ref={ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative ${aspect} w-full overflow-hidden rounded-[28px] border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]`}
      style={{ backgroundColor: C.bg2, borderColor: C.line, rotate, rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 800 }}
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
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${mx}px ${my}px, rgba(201,168,76,0.16), transparent 62%)`;
  const dockMouseX = useMotionValue(Infinity);

  return (
    <section
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      style={{ backgroundColor: C.bg }}
      className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28"
    >
      <Glow className="left-[-10%] top-[-10%] h-[520px] w-[520px]" />
      <Glow className="right-[-12%] bottom-[-15%] h-[460px] w-[460px]" />
      <SparkleField count={30} />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
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
            <p
              className="mt-7 max-w-xl text-xl leading-snug sm:text-2xl"
              style={{ color: C.ink, fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              <WordReveal text="Сочетаю технический подход к творчеству и творческий — к технике." delay={0.35} />
            </p>

            {/* Грани — новые карточки-плитки с иконками */}
            <div
              onMouseMove={(e) => dockMouseX.set(e.clientX)}
              onMouseLeave={() => dockMouseX.set(Infinity)}
              className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
            >
              {FACETS.map((f, i) => (
                <FacetBadge key={f.label} f={f} i={i} wide={i === FACETS.length - 1} mouseX={dockMouseX} />
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
      <GhostTitle className="-left-4 top-6 text-[10vw]">about</GhostTitle>
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
      <GhostTitle className="-right-6 top-10 text-[11vw]">family</GhostTitle>
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
      <GhostTitle className="-left-6 top-8 text-[11vw]">code</GhostTitle>
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
                <ProjectCard key={p.title} p={p} />
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
      <GhostTitle className="-right-6 top-10 text-[12vw]">sport</GhostTitle>
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
      <GhostTitle className="-right-6 top-8 text-[11vw]">music</GhostTitle>
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

// Пузырь чата. side="left" — реплика Ильи (с аватаркой), "right" — игрок.
function ChatBubble({
  side,
  children,
  accent,
}: {
  side: "left" | "right";
  children: ReactNode;
  accent?: string;
}) {
  const left = side === "left";
  return (
    <div className={`flex items-end gap-2 ${left ? "" : "flex-row-reverse"}`}>
      {left && (
        <img
          src={ILYA_AVATAR}
          alt="Илья"
          className="h-8 w-8 shrink-0 rounded-full object-cover"
          style={{ border: `1px solid ${C.line}` }}
        />
      )}
      <div
        className="max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed"
        style={
          left
            ? { backgroundColor: C.cardHi, color: C.ink, borderTopLeftRadius: 4, border: `1px solid ${accent ?? C.line}` }
            : { backgroundColor: C.gold, color: C.bg, borderTopRightRadius: 4, fontWeight: 600 }
        }
      >
        {children}
      </div>
    </div>
  );
}

// Индикатор «Илья печатает…»
function TypingDots() {
  return (
    <div className="flex items-end gap-2">
      <img
        src={ILYA_AVATAR}
        alt="Илья"
        className="h-8 w-8 shrink-0 rounded-full object-cover"
        style={{ border: `1px solid ${C.line}` }}
      />
      <div
        className="rounded-2xl px-4 py-3"
        style={{ backgroundColor: C.cardHi, border: `1px solid ${C.line}`, borderTopLeftRadius: 4 }}
      >
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-2 w-2 rounded-full"
              style={{ backgroundColor: C.inkSoft }}
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Игра «Телепатия» в формате чата с Ильёй: 5 раундов, в каждом 3 факта и одна ложь.
// Илья «пишет» вопрос, игрок отвечает, Илья комментирует именно его выбор.
function GuessTruthQuiz() {
  const [round, setRound] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);
  const [showComment, setShowComment] = useState(false);
  const [finished, setFinished] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Число пройденных тестов храним между визитами — от него зависит пароль.
  useEffect(() => {
    const saved = Number(localStorage.getItem("telepathy_attempts"));
    if (Number.isFinite(saved) && saved > 0) setAttempts(saved);
  }, []);

  const lieColor = "#E2685E";
  const total = QUIZ.length;
  const current = QUIZ[round];
  const revealed = picks.length > round;
  const score = picks.filter((p, i) => p === QUIZ[i].lie).length;
  const password = PASSWORD_BASE + attempts;

  // После выбора показываем «печатает…», затем комментарий Ильи.
  useEffect(() => {
    if (!revealed) {
      setShowComment(false);
      return;
    }
    setShowComment(false);
    const t = setTimeout(() => setShowComment(true), 750);
    return () => clearTimeout(t);
  }, [revealed, round]);

  const pick = (idx: number) => {
    if (!revealed) setPicks((prev) => [...prev, idx]);
  };
  const finish = () => {
    const n = attempts + 1;
    setAttempts(n);
    try {
      localStorage.setItem("telepathy_attempts", String(n));
    } catch {
      /* localStorage может быть недоступен — не критично */
    }
    setFinished(true);
  };
  const next = () => (round + 1 < total ? setRound(round + 1) : finish());
  const restart = () => {
    setRound(0);
    setPicks([]);
    setFinished(false);
  };

  return (
    <div className="mt-8 rounded-[24px] border p-5 sm:p-6" style={{ borderColor: C.line, backgroundColor: C.card }}>
      <SectionLabel>Телепатия</SectionLabel>
      <p className="mt-2 text-[13px]" style={{ color: C.inkSoft }}>
        давай познакомимся поближе — в игровой форме 🙂
      </p>

      {!finished && (
        <>
          <div className="mt-4 flex items-center justify-between text-[12px] uppercase tracking-[0.18em]" style={{ color: C.gold }}>
            <span>
              Факт {round + 1} из {total}
            </span>
            <span>{score} в точку</span>
          </div>
          <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full" style={{ backgroundColor: C.line }}>
            <motion.div
              className="h-full"
              style={{ background: `linear-gradient(90deg, ${C.mint}, ${C.gold})` }}
              animate={{ width: `${(picks.length / total) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </>
      )}

      <motion.div
        layout
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 overflow-hidden px-1.5 py-1.5"
        style={{ perspective: 1200 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {finished ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, rotateY: -20, scale: 0.94 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="space-y-4"
            >
              <ChatBubble side="left">Готово! Вот что у нас получилось 👇</ChatBubble>

              <div className="rounded-2xl border p-5 text-center" style={{ borderColor: C.line, backgroundColor: C.cardHi }}>
                <img
                  src={score >= 3 ? "/telepathy/correct.png" : "/telepathy/wrong.png"}
                  alt=""
                  className="mx-auto h-24 w-24 rounded-2xl object-cover"
                />
                <p className="mt-4 text-4xl" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: C.ink }}>
                  {score} / {total}
                </p>
                <p className="mt-2 text-2xl" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: C.goldSoft }}>
                  {QUIZ_TITLES[score].title}
                </p>
                <p className="mt-1.5 text-[15px]" style={{ color: C.inkSoft }}>
                  {QUIZ_TITLES[score].tagline}
                </p>

                {score === total && (
                  <div className="mt-6 rounded-2xl border p-5 text-left" style={{ borderColor: C.gold, backgroundColor: C.card }}>
                    <p className="text-[15px] font-semibold" style={{ color: C.gold, fontFamily: "var(--font-display)" }}>
                      {QUIZ_SECRET.title}
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed" style={{ color: C.ink }}>
                      {QUIZ_SECRET.intro}
                    </p>
                    <p className="mt-3 text-[14px] leading-relaxed" style={{ color: C.ink }}>
                      {QUIZ_SECRET.instruction}
                    </p>
                    <p
                      className="mt-3 text-center text-3xl font-bold tracking-[0.3em]"
                      style={{ color: C.goldSoft, fontFamily: "var(--font-display)" }}
                    >
                      {password}
                    </p>
                    <div className="mt-4 text-center">
                      <a
                        href={QUIZ_SECRET.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold"
                        style={{ backgroundColor: C.gold, color: C.bg }}
                      >
                        {QUIZ_SECRET.cta.label}
                      </a>
                    </div>
                  </div>
                )}

                <button
                  onClick={restart}
                  className="mt-6 inline-flex items-center justify-center rounded-xl border px-5 py-2.5 text-sm font-semibold transition-transform active:scale-[0.98]"
                  style={{ borderColor: C.line, color: C.ink, backgroundColor: "transparent" }}
                >
                  Сыграть заново
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={round}
              initial={{ opacity: 0, rotateY: -22, x: 60, scale: 0.94 }}
              animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 22, x: -60, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="space-y-3"
            >
              {/* Вопрос Ильи — единственная реплика с аватаркой над карточками */}
              <ChatBubble side="left">{current.intro}</ChatBubble>

              {/* 3 карточки-варианта с переворотом; оборот — компактный вердикт */}
              <div className="grid gap-3 sm:grid-cols-3">
                {current.statements.map((s, idx) => {
                  const isLie = idx === current.lie;
                  const isPicked = revealed && picks[round] === idx;
                  return (
                    <div key={idx} style={{ perspective: 1000 }} className="min-h-[112px]">
                      <motion.div
                        className="relative h-full min-h-[112px] w-full"
                        style={{ transformStyle: "preserve-3d" }}
                        initial={false}
                        animate={{ rotateY: revealed && isPicked ? 180 : 0 }}
                        transition={{ duration: 0.55, ease: "easeInOut" }}
                      >
                        {/* лицо — текст факта */}
                        <button
                          type="button"
                          onClick={() => pick(idx)}
                          disabled={revealed}
                          className="absolute inset-0 flex items-center justify-center rounded-2xl border p-4 text-center text-[14px] leading-snug transition-all hover:border-[var(--g)]"
                          style={
                            {
                              backfaceVisibility: "hidden",
                              borderColor: C.line,
                              backgroundColor: C.cardHi,
                              color: C.ink,
                              cursor: revealed ? "default" : "pointer",
                              opacity: revealed && !isPicked ? 0.45 : 1,
                              ["--g" as string]: C.gold,
                            } as CSSProperties
                          }
                        >
                          {s.text}
                        </button>
                        {/* оборот — короткий вердикт */}
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl border p-4 text-center"
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                            borderColor: isLie ? C.mint : C.line,
                            backgroundColor: C.cardHi,
                            boxShadow: isPicked ? `0 0 0 2px ${isLie ? C.mint : lieColor}` : "none",
                            opacity: !isLie && !isPicked ? 0.5 : 1,
                          }}
                        >
                          <span className="text-[13px] font-bold uppercase tracking-[0.18em]" style={{ color: isLie ? C.mint : C.inkSoft }}>
                            {isLie ? "Ложь" : "Правда"}
                          </span>
                          {isPicked && (
                            <span className="text-[11px] font-semibold" style={{ color: isLie ? C.mint : lieColor }}>
                              {isLie ? "✓ в точку" : "✗ мимо"}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* Комментарий Ильи к выбранному варианту — в чате */}
              {revealed &&
                (() => {
                  const picked = picks[round];
                  const correct = picked === current.lie;
                  const accent = correct ? C.mint : lieColor;
                  return !showComment ? (
                    <TypingDots />
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                      <ChatBubble side="left" accent={accent}>
                        <span className="text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
                          {correct ? "Телепатия сработала!" : "А вот и мимо"}
                        </span>
                        <span className="mt-1.5 block whitespace-pre-line">{current.statements[picked].comment}</span>
                        {current.statements[picked].video && (
                          <div
                            className="mt-3 overflow-hidden rounded-2xl border"
                            style={{ borderColor: C.line }}
                          >
                            <video
                              controls
                              playsInline
                              preload="metadata"
                              className="block w-full bg-black"
                              style={{ maxHeight: "60vh" }}
                            >
                              <source src={current.statements[picked].video} type="video/mp4" />
                            </video>
                          </div>
                        )}
                        {current.statements[picked].image && (
                          <div
                            className="mt-3 overflow-hidden rounded-2xl border"
                            style={{ borderColor: C.line }}
                          >
                            <img
                              src={current.statements[picked].image}
                              alt=""
                              loading="lazy"
                              className="block w-full"
                              style={{ maxHeight: "60vh", objectFit: "contain", backgroundColor: C.bg }}
                            />
                          </div>
                        )}
                      </ChatBubble>
                      <div className="flex justify-end">
                        <button
                          onClick={next}
                          className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-transform active:scale-[0.98]"
                          style={{ backgroundColor: C.gold, color: C.bg }}
                        >
                          {round + 1 < total ? "Дальше" : "Узнать результат"}
                        </button>
                      </div>
                    </motion.div>
                  );
                })()}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function Community() {
  return (
    <section id="community" style={{ backgroundColor: C.bg2 }} className="relative overflow-hidden py-24 sm:py-32">
      <GhostTitle className="-left-4 top-10 text-[11vw]">play</GhostTitle>
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

            <GuessTruthQuiz />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------

// Одна «летающая» карточка автора. Пока flying — кружит по случайной траектории;
// поймали (клик по любой) — все возвращаются на свои места, выбранная подсвечивается.
function FlyingAuthor({
  name,
  flying,
  chosen,
  cycle,
  onCatch,
}: {
  name: string;
  flying: boolean;
  chosen: boolean;
  cycle: number;
  onCatch: () => void;
}) {
  // Случайная траектория, обновляется на каждый новый цикл полёта.
  const path = useMemo(() => {
    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    const steps = 4;
    const xs = [0];
    const ys = [0];
    const rs = [0];
    for (let s = 0; s < steps; s++) {
      xs.push(rand(-140, 140));
      ys.push(rand(-75, 75));
      rs.push(rand(-16, 16));
    }
    xs.push(0);
    ys.push(0);
    rs.push(0);
    return { xs, ys, rs, duration: rand(6, 10), delay: rand(0, 1.4) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle]);

  return (
    <motion.span
      onClick={onCatch}
      animate={
        flying
          ? { x: path.xs, y: path.ys, rotate: path.rs, scale: 1 }
          : { x: 0, y: 0, rotate: 0, scale: chosen ? 1.06 : 1 }
      }
      transition={
        flying
          ? { duration: path.duration, delay: path.delay, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
          : { type: "spring", stiffness: 240, damping: 20 }
      }
      whileHover={{ scale: 1.08 }}
      className="cursor-pointer select-none rounded-full border px-4 py-2 text-[14px]"
      style={{
        borderColor: chosen ? C.gold : C.line,
        backgroundColor: chosen ? "rgba(201,168,76,0.16)" : C.cardHi,
        color: chosen ? C.goldSoft : C.ink,
        fontFamily: "var(--font-display)",
        willChange: "transform",
        boxShadow: chosen ? "0 0 0 1px rgba(201,168,76,0.5), 0 8px 28px rgba(201,168,76,0.18)" : "none",
      }}
    >
      {name}
    </motion.span>
  );
}

function FlyingAuthors() {
  const [chosen, setChosen] = useState<(typeof AUTHORS)[number] | null>(null);
  const [cycle, setCycle] = useState(0);

  function handleCatch(a: (typeof AUTHORS)[number]) {
    setChosen(a);
  }

  // Поймали — держим 10 секунд на местах, затем снова разлетаются (новые траектории).
  useEffect(() => {
    if (!chosen) return;
    const t = setTimeout(() => {
      setChosen(null);
      setCycle((c) => c + 1);
    }, 10000);
    return () => clearTimeout(t);
  }, [chosen]);

  return (
    <div className="mt-6">
      <AnimatePresence mode="wait">
        {chosen ? (
          <motion.div
            key={chosen.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mb-4 max-w-2xl text-[14px] leading-relaxed"
            style={{ color: C.inkSoft }}
          >
            <span style={{ color: C.goldSoft, fontFamily: "var(--font-display)" }}>{chosen.name}</span>{" "}
            — {chosen.note}
          </motion.div>
        ) : (
          <motion.div
            key="invite"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mb-4 max-w-2xl text-[13px] leading-relaxed"
            style={{ color: C.gold }}
          >
            Мудрость не сидит на полке и в руки просто так не даётся — она ускользает, как мысль на грани сна. Среди этих
            авторов наверняка есть кто-то близкий и тебе. Поймай на лету того, кто откликается больше всего, — расскажу,
            что я у него читал или чему у него учился. (Кликни по летящей карточке.)
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative flex flex-wrap gap-2.5">
        {AUTHORS.map((a) => (
          <FlyingAuthor
            key={a.name}
            name={a.name}
            flying={!chosen}
            chosen={chosen?.name === a.name}
            cycle={cycle}
            onCatch={() => handleCatch(a)}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

function Meaning() {
  return (
    <section id="meaning" style={{ backgroundColor: C.bg }} className="relative overflow-hidden py-24 sm:py-32">
      <GhostTitle className="-right-6 bottom-8 text-[10vw]">meaning</GhostTitle>
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
          <FlyingAuthors />
        </motion.div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------

const TRAVEL_PHOTOS = [
  { src: "/travel/sunrise.jpg", cap: "Алтай", desc: "Рассветы в горах и тишина на йога-туре — то, ради чего и едешь." },
  { src: "/travel/baikal.jpg", cap: "Байкал · Ольхон", desc: "Остров Ольхон посреди священного озера — медитации у самой воды." },
  { src: "/travel/thailand.jpg", cap: "Таиланд · о. Джеймса Бонда", desc: "Скала Ко Тапу в заливе Пханг-Нга — та самая из фильма «Человек с золотым пистолетом»." },
  { src: "/travel/sochi.jpg", cap: "Сочи", desc: "Мой новый дом у моря: горы, набережная и обычная рабочая жизнь в одном городе." },
  { src: "/travel/crimea.jpg", cap: "Крым · Новый Свет", desc: "Можжевеловые тропы и бирюзовые бухты на берегу Чёрного моря." },
  { src: "/travel/turkey.jpg", cap: "Турция · Фаселис", desc: "Античные руины прямо у воды, среди трёх живописных бухт." },
  { src: "/travel/paris.jpg", cap: "Париж", desc: "Прогулки по городу, который раньше видел только в кино." },
  { src: "/travel/india.jpg", cap: "Индия", desc: "Страна контрастов и духовных практик — там по-особому слышишь себя.", pos: "top" },
];

// Полоса путешествий: аккуратные миниатюры (cover, без полос),
// по клику — лайтбокс на весь экран, фото целиком в своём формате, без обрезки.
function TravelGallery() {
  // Лайтбокс на Fancybox 5: зум колесом/щипком, лента миниатюр, свайпы, клавиатура.
  // Подпись формируем из cap + desc (HTML разрешён в data-caption).
  useEffect(() => {
    Fancybox.bind('[data-fancybox="travel"]', {
      Carousel: { transition: "slide" },
      Thumbs: { type: "classic" },
      Images: { zoom: true, Panzoom: { maxScale: 3 } },
      Toolbar: {
        display: {
          left: ["infobar"],
          middle: ["zoomIn", "zoomOut"],
          right: ["slideshow", "thumbs", "close"],
        },
      },
    });
    return () => Fancybox.unbind('[data-fancybox="travel"]');
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {TRAVEL_PHOTOS.map((p) => (
        <motion.a
          key={p.src}
          href={p.src}
          data-fancybox="travel"
          data-caption={`<span style="font-family:var(--font-display);text-transform:uppercase;letter-spacing:0.18em;color:${C.goldSoft}">${p.cap}</span><br><span style="color:${C.inkSoft}">${p.desc}</span>`}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-[22px] border shadow-[0_20px_50px_-25px_rgba(0,0,0,0.7)] hover:shadow-[0_45px_80px_-30px_rgba(0,0,0,0.85)]"
          style={{ backgroundColor: C.bg, borderColor: C.line }}
          aria-label={`Открыть фото: ${p.cap}`}
        >
          <span
            className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs"
            style={{ color: "rgba(241,236,221,0.4)" }}
            aria-hidden
          >
            {p.cap}
          </span>
          <img
            src={p.src}
            alt={p.cap}
            loading="lazy"
            style={{ objectPosition: p.pos ?? "center" }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.12]"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {/* значок «открыть» */}
          <span
            className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundColor: "rgba(0,0,0,0.45)", color: C.goldSoft }}
            aria-hidden
          >
            <Maximize2 size={15} />
          </span>
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left text-[11px] uppercase tracking-[0.16em] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            style={{ color: C.goldSoft, fontFamily: "var(--font-display)" }}
          >
            {p.cap}
          </span>
        </motion.a>
      ))}
    </div>
  );
}

function Travel() {
  return (
    <section style={{ backgroundColor: C.bg2 }} className="relative overflow-hidden py-24 sm:py-32">
      <GhostTitle className="-left-6 top-8 text-[11vw]">travel</GhostTitle>
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

        {/* Ряд 2: фото-полоса во всю ширину — кликни, чтобы открыть крупно */}
        <motion.div {...fadeUp} className="mt-10">
          <TravelGallery />
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
          С женой мы вместе уже восемнадцать лет. Тема самопознания всплыла ещё при первом знакомстве и сильно помогла нам сблизиться: нас многое объединяет, и во многом мы дополняем друг друга. Она удивительно творческий человек и поёт просто шикарно — по сути, именно она привела меня в музыку.
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
      <GhostTitle className="-right-4 bottom-0 text-[11vw]">hello</GhostTitle>
      <Glow className="left-1/2 bottom-[-10%] h-[420px] w-[640px] -translate-x-1/2" />
      <Container>
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionLabel>Найти меня</SectionLabel>
          </div>
          <H2>Давайте на связи</H2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: C.inkSoft }}>
            Вот мои контакты. Буду рад пообщаться — вживую или здесь, в сети. Пишите: по делу или просто так.
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

        {/* Финальный «звёздный» блок — эффект Sparkles */}
        <div className="relative mt-20 w-full">
          <div className="relative z-10 flex items-baseline justify-center gap-2.5 sm:gap-3">
            <h3
              className="text-[22px] leading-none sm:text-[28px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: C.ink }}
            >
              Илья Бормотов
            </h3>
            <span
              className="text-[22px] leading-none sm:text-[28px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: C.inkSoft }}
            >
              © {new Date().getFullYear()}
            </span>
          </div>

          <div className="relative mx-auto mt-4 h-44 w-full max-w-[820px]">
            {/* светящиеся градиентные линии */}
            <span
              className="absolute inset-x-[8%] top-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }}
            />
            <span
              className="absolute inset-x-[8%] top-0 h-[6px] blur-sm"
              style={{ background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }}
            />
            <span
              className="absolute inset-x-[24%] top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${C.mint}, transparent)` }}
            />
            <span
              className="absolute inset-x-[24%] top-0 h-[4px] blur-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${C.mint}, transparent)` }}
            />

            {/* поле искр, замаскированное по краям (без сплошной подложки — фон-«hello» остаётся виден) */}
            <div
              className="absolute inset-0"
              style={{
                maskImage: "radial-gradient(640px 170px at top center, black 30%, transparent 82%)",
                WebkitMaskImage: "radial-gradient(640px 170px at top center, black 30%, transparent 82%)",
              }}
            >
              <SparklesCore className="h-full w-full" color={C.goldSoft} density={140} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
