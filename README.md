# Frontend для СибКомплект

Клиентская часть веб-сайта компании СибКомплект, построенная на Next.js 15 с использованием современного стека технологий для создания интерактивного и производительного пользовательского интерфейса.

## 📋 Содержание

- [Технологии](#технологии)
- [Особенности проекта](#особенности-проекта)
- [Структура проекта](#структура-проекта)
- [Установка и настройка](#установка-и-настройка)
- [Переменные окружения](#переменные-окружения)
- [Архитектура](#архитектура)
- [3D Визуализация](#3d-визуализация)
- [Компоненты](#компоненты)
- [Роутинг и страницы](#роутинг-и-страницы)
- [Стилизация](#стилизация)
- [Оптимизация](#оптимизация)
- [Развертывание](#развертывание)
- [Скрипты](#скрипты)

## 🚀 Технологии

### Основной стек
- **Framework**: Next.js 15.3.1 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.8.3
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: TanStack Query (React Query) 5.80.7

### 3D и анимации
- **3D Engine**: Three.js 0.176.0
- **React Three Fiber**: 9.1.2
- **React Three Drei**: 10.0.7
- **Animations**: Framer Motion 12.18.1, GSAP 3.13.0
- **Smooth Scrolling**: Lenis 1.3.1

### UI/UX
- **Component Library**: Radix UI
- **Icons**: Lucide React 0.516.0
- **Styling Utils**: class-variance-authority, clsx, tailwind-merge
- **Themes**: next-themes 0.4.6
- **Transitions**: next-view-transitions 0.3.4

### Формы и валидация
- **Forms**: React Hook Form 7.56.4
- **Validation**: Встроенная валидация с React Hook Form
- **File Upload**: react-easy-crop 5.5.0

### Интеграции
- **Maps**: react-yandex-maps 4.6.0
- **HTTP Client**: Axios 1.10.0
- **Cookies**: js-cookie 3.0.5
- **reCAPTCHA**: react-google-recaptcha 3.1.0
- **Excel**: xlsx 0.18.5

## ✨ Особенности проекта

### 🎨 Современный дизайн
- Адаптивный дизайн для всех устройств
- Темная и светлая темы
- Плавные анимации и переходы
- Интерактивные 3D элементы

### 🚀 Производительность
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Оптимизация изображений Next.js
- Lazy loading компонентов
- Code splitting

### 🎯 UX/UI
- Плавная прокрутка (Lenis)
- Переходы между страницами
- Интерактивные формы с валидацией
- Уведомления и тосты
- Прогрессивная загрузка контента

### 🔒 Безопасность
- Middleware для защиты роутов
- JWT аутентификация
- reCAPTCHA защита форм
- Валидация на клиенте и сервере

## 📁 Структура проекта

```
src/
├── app/                          # Next.js App Router
│   ├── (admin)/                 # Административная панель
│   │   ├── admin/              # Админ страницы
│   │   ├── auth/               # Аутентификация
│   │   └── dashboard/          # Панель управления
│   ├── (main)/                 # Основной сайт
│   │   ├── (home)/            # Главная страница
│   │   ├── about/             # О компании
│   │   ├── catalog/           # Каталог продукции
│   │   ├── certificates/      # Сертификаты
│   │   ├── contacts/          # Контакты
│   │   ├── news/              # Новости
│   │   ├── portfolio/         # Портфолио
│   │   ├── product/           # Страницы продуктов
│   │   ├── production/        # Производство
│   │   ├── questionnaire/     # Анкета
│   │   └── vacancies/         # Вакансии
│   └── client_api/            # API роуты
├── components/                  # Переиспользуемые компоненты
│   ├── 3DScene/              # 3D сцены и компоненты
│   ├── ContactForm/          # Формы обратной связи
│   ├── CustomScrollbar/      # Кастомный скроллбар
│   ├── CustomSlider/         # Кастомные слайдеры
│   ├── shared_screens/       # Общие экраны (Header, Footer)
│   └── ui/                   # UI компоненты
├── config/                     # Конфигурационные файлы
├── context/                    # React контексты
├── hooks/                      # Кастомные хуки
├── services/                   # API сервисы
├── shared/                     # Общие типы и утилиты
└── middleware.ts              # Next.js middleware
```

## 🔧 Установка и настройка

### Предварительные требования

- Node.js 18+
- pnpm (рекомендуется) или npm
- Запущенный backend API

### Установка зависимостей

```bash
# Установка зависимостей
pnpm install

# Или с npm
npm install
```

### Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
# API Backend
NEXT_PUBLIC_API_URL=https://sibkomplekt.ru/api
NEXT_PUBLIC_UPLOADS_URL=https://sibkomplekt.ru/

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key

# Yandex Maps (если используется)
NEXT_PUBLIC_YANDEX_MAPS_API_KEY=your-yandex-maps-api-key

# Режим разработки
NODE_ENV=development
```

### Запуск проекта

```bash
# Режим разработки с Turbopack
pnpm dev

# Сборка для продакшена
pnpm build

# Запуск продакшен версии
pnpm start
```

## 🏗️ Архитектура

### App Router (Next.js 15)
Проект использует новый App Router с группировкой роутов:

- `(main)` - Публичные страницы сайта
- `(admin)` - Административная панель
- Защищенные роуты через middleware

### Провайдеры и контексты

```typescript
// Основные провайдеры
<QueryClientProvider>      // TanStack Query
  <FontProvider>           // Управление шрифтами
    <ViewTransitions>      // Переходы между страницами
      <PageTransitionProvider>  // Кастомные переходы
        <GpuDetectProvider>     // Определение GPU
          <CameraProvider>      // 3D камера
            <NotificationProvider>  // Уведомления
              <ReactLenis>      // Плавная прокрутка
```

### Middleware защита

```typescript
// Защита административных роутов
if (pathname.startsWith('/admin')) {
  return protectAdminPages(request);
}

// Защита панели управления
if (pathname.startsWith('/dashboard')) {
  return protectDashboardPages(request);
}
```

## 🎮 3D Визуализация

### Three.js интеграция
- **React Three Fiber** для декларативного 3D
- **React Three Drei** для готовых компонентов
- Кастомные шейдеры (GLSL)
- Оптимизация производительности

### 3D Компоненты
- `3DScene/` - Основная 3D сцена
- `productCard3D/` - 3D карточки продуктов
- `ProductsSlider3D/` - 3D слайдер продуктов

### GPU оптимизация
```typescript
// Определение возможностей GPU
const { isLowEndDevice } = useGpuDetect();

// Адаптивное качество рендеринга
const quality = isLowEndDevice ? 'low' : 'high';
```

## 🧩 Компоненты

### UI Компоненты (Shadcn/ui)
Проект использует компоненты на основе Radix UI:

```bash
# Установка новых компонентов
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
```

### Кастомные компоненты

#### Формы
- `ContactForm/` - Формы обратной связи
- `RequestForm/` - Форма заявки
- `VacancyForm/` - Форма отклика на вакансию
- `QuestionnaireForm/` - Анкета

#### UI элементы
- `MainButton/` - Основная кнопка
- `SecondaryButton/` - Вторичная кнопка
- `GradientHeading/` - Заголовки с градиентом
- `RevealAnimation/` - Анимации появления
- `ParallaxImage/` - Параллакс изображения

### Анимации

#### Framer Motion
```typescript
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};
```

#### GSAP
```typescript
import { gsap } from 'gsap';

// Сложные анимации временной шкалы
const tl = gsap.timeline();
tl.to('.element', { opacity: 1, duration: 1 })
  .to('.element2', { x: 100, duration: 0.5 });
```

## 🛣️ Роутинг и страницы

### Публичные страницы
- `/` - Главная страница
- `/about` - О компании
- `/catalog` - Каталог продукции
- `/product/[slug]` - Страница продукта
- `/portfolio/[slug]` - Кейс из портфолио
- `/news` - Новости
- `/news/[slug]` - Страница новости
- `/vacancies` - Вакансии
- `/contacts` - Контакты
- `/certificates` - Сертификаты

### Административные страницы
- `/auth/login` - Вход в систему
- `/dashboard` - Панель управления
- `/admin` - Административная панель

### Динамические роуты
```typescript
// app/product/[slug]/page.tsx
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}
```

## 🎨 Стилизация

### Tailwind CSS
Кастомная конфигурация с расширенными цветами и брейкпоинтами:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        laptop: { min: "1534px", max: "1750px" },
        xxl: "1600px",
      },
      colors: {
        primary: "hsl(var(--primary))",
        // ... кастомные цвета
      }
    }
  }
}
```

### CSS переменные
```css
:root {
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}
```

### Адаптивность
- Mobile-first подход
- Кастомные брейкпоинты для laptop и xxl
- Адаптивная типографика
- Оптимизация для touch устройств

## ⚡ Оптимизация

### Производительность
- **Image Optimization**: Next.js Image компонент
- **Code Splitting**: Автоматическое разделение кода
- **Lazy Loading**: Ленивая загрузка компонентов
- **Bundle Analysis**: Анализ размера бандла

### SEO
- **Metadata API**: Динамические meta теги
- **Structured Data**: JSON-LD разметка
- **Sitemap**: Автогенерация карты сайта
- **Robots.txt**: Настройка индексации

### Кэширование
- **TanStack Query**: Кэширование API запросов
- **Static Generation**: Статическая генерация страниц
- **ISR**: Инкрементальная статическая регенерация

## 🚀 Развертывание

### Разработка

```bash
# Запуск dev сервера с Turbopack
pnpm dev

# Запуск с анализом бандла
ANALYZE=true pnpm build
```

### Продакшен

```bash
# Сборка проекта
pnpm build

# Запуск продакшен сервера
pnpm start
```

### Docker

```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && pnpm build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Vercel (рекомендуется)

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install"
}
```

## 📜 Скрипты

```bash
# Разработка
pnpm dev                 # Запуск с Turbopack
pnpm dev:legacy         # Запуск без Turbopack

# Сборка и продакшен
pnpm build              # Сборка проекта
pnpm start              # Запуск продакшен версии

# Линтинг
pnpm lint               # ESLint проверка
pnpm lint:fix           # Автоисправление

# Типы
pnpm type-check         # Проверка TypeScript

# Shadcn/ui
npx shadcn-ui@latest add [component]  # Добавление компонентов
```

## 🔧 Настройка разработки

### VS Code расширения
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint"
  ]
}
```

### Prettier конфигурация
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 🎯 Особенности реализации

### Формы с валидацией
```typescript
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = async (data) => {
  await submitForm(data);
};
```

### 3D сцены
```typescript
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

<Canvas>
  <OrbitControls />
  <mesh>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>
</Canvas>
```

### Анимации прокрутки
```typescript
import { useInView } from 'react-intersection-observer';

const { ref, inView } = useInView({
  threshold: 0.1,
  triggerOnce: true
});
```

## 🐛 Отладка

### React Query Devtools
```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Доступно в development режиме
<ReactQueryDevtools initialIsOpen={false} />
```

### Next.js Bundle Analyzer
```bash
# Анализ размера бандла
ANALYZE=true pnpm build
```

### Логирование
```typescript
// Условное логирование
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

## 🤝 Участие в разработке

### Структура коммитов
```
feat: добавить новый компонент
fix: исправить баг в форме
docs: обновить README
style: исправить форматирование
refactor: рефакторинг API сервиса
```

### Создание компонентов
```bash
# Создание нового UI компонента
mkdir src/components/ui/NewComponent
touch src/components/ui/NewComponent/index.tsx
touch src/components/ui/NewComponent/types.ts
```
