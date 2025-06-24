--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Homebrew)
-- Dumped by pg_dump version 15.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'PREMIUM',
    'MANAGER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _ProductPortfolioItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_ProductPortfolioItems" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_ProductPortfolioItems" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    id text NOT NULL,
    category text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    image text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    reading_time integer DEFAULT 0 NOT NULL,
    slug text NOT NULL,
    short_content text
);


ALTER TABLE public.news OWNER TO postgres;

--
-- Name: portfolio_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.portfolio_items (
    id text NOT NULL,
    name text NOT NULL,
    poster text NOT NULL,
    task_title text NOT NULL,
    task_description text NOT NULL,
    solution_title text NOT NULL,
    solution_description text NOT NULL,
    solution_subtitle text NOT NULL,
    solution_subdescription text NOT NULL,
    has_review boolean DEFAULT false NOT NULL,
    review_title text,
    review_text text,
    review_name text,
    review_image text,
    review_role text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    full_video_path text,
    preview_video_path text,
    solution_images text[],
    year integer NOT NULL,
    slug text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.portfolio_items OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id text NOT NULL,
    category text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    important_characteristics jsonb NOT NULL,
    advantages jsonb NOT NULL,
    simple_description jsonb NOT NULL,
    detailed_description jsonb NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    model_3d_url text,
    preview_image text,
    slug text NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: site_seo_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.site_seo_settings (
    id text NOT NULL,
    page_path text NOT NULL,
    page_name text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    keywords text,
    og_title text,
    og_description text,
    og_image text,
    canonical_url text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.site_seo_settings OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    email text,
    phone text,
    name text,
    password text,
    avatar_path text,
    telegram_id text,
    otp_code text,
    otp_expires_at timestamp(3) without time zone,
    verification_token text,
    rights public."Role"[] DEFAULT ARRAY['USER'::public."Role"]
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: vacancies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vacancies (
    id text NOT NULL,
    title text NOT NULL,
    requirements text[],
    experience text[],
    salary integer NOT NULL,
    category text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.vacancies OWNER TO postgres;

--
-- Data for Name: _ProductPortfolioItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ProductPortfolioItems" ("A", "B") FROM stdin;
cmc397eb10000mh0x56iwfirw	cmc5ubn2u0000mhdgwyf60udc
cmc3gm0050001mhaof7shpsce	cmc5ubn2u0000mhdgwyf60udc
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
9b5c5a51-7f3b-4b8e-b20e-89baecbea347	a2c46308187417653f27f4b5856e9ee2c7f09f614875785a1e10c7586ea18c02	2025-06-18 20:02:52.951174+07	20250617064852_add_news_model	\N	\N	2025-06-18 20:02:52.943649+07	1
5dda14e5-286a-420d-acd8-534a857e65a4	b2049bd7ac8e28d1f3c8d8ba0ecaa4e22cf6119f7d052962bfb6f6789d372f20	2025-06-18 20:02:52.95309+07	20250617090153_add_reading_time	\N	\N	2025-06-18 20:02:52.951631+07	1
4722dd4e-ad5f-43ac-a448-29effb66f9cb	af20e1e65d515470a68aea2ebd8948134cdee5306869782a6bc3027ed11e0c05	2025-06-21 13:05:51.521808+07	20250621060551_make_preview_image_optional	\N	\N	2025-06-21 13:05:51.52077+07	1
0f652d44-0e0f-4366-bc4a-00f4b4770dd4	dad373bf26bcd5947432323f3fbc1d8f3c2b0db752b9d3bb31c5994a348c6b7e	2025-06-18 20:02:52.957662+07	20250618030806_add_portfolio_items	\N	\N	2025-06-18 20:02:52.953422+07	1
7cb26b8c-0dc7-42b7-889d-63680575fab3	92906bcf0e3d69bca5913a6cdd46d9be14f526cb74800d3ec31777940aba731a	2025-06-18 20:02:52.959165+07	20250618092814_add_portfolio_new_fields	\N	\N	2025-06-18 20:02:52.957892+07	1
5a4f25c6-118b-489a-8887-1d2aa34dc1a8	f332e44cb74d8cec5cafee5b44ba77f8fbb6600011be9db8ed2956151b4e64cb	2025-06-18 20:02:52.962392+07	20250618102903_add_slug_fields	\N	\N	2025-06-18 20:02:52.959484+07	1
871ddddc-2fd8-4e7d-bfa3-816d03b27ae7	fed428a5330a85919e087a5723dd45d56a3fb4c52bab4b977ab84dd79cbbc613	2025-06-22 22:07:12.902758+07	20250622150655_add_slug_to_product	\N	\N	2025-06-22 22:07:12.899245+07	1
69edb8ec-84e9-43d5-b464-6ce622cbff6c	97c7694d95173da2e73209f38cf79310cf5ad909a15b868a4221ccf89420b2c8	2025-06-19 16:21:05.97143+07	20250619092105_add_short_content_to_news	\N	\N	2025-06-19 16:21:05.969517+07	1
891775db-a8e0-4404-802a-7650585c7189	79fa88055153a16bdb50d98738d955c992c2171b1a9569db6ab4d10f1895f61a	2025-06-19 17:38:12.003865+07	20250619103811_add_description_and_make_poster_year_required	\N	\N	2025-06-19 17:38:12.000801+07	1
3ce24485-a333-422f-8bd8-63d51a5dce48	aacb5ce3a35de880f12cc94d66c9f37b511852bee19e16858807a5281a2516e9	2025-06-19 22:11:29.472586+07	20250619151129_add_vacancy_table	\N	\N	2025-06-19 22:11:29.468278+07	1
df2a7328-4737-40d5-a171-aea0042dfdba	fb31674bb9b5288f2f8761926d5b4dca269cdb964521564dc1fc1f8cefa05a72	2025-06-22 22:47:18.518257+07	20250622154718_remove_advantage_images	\N	\N	2025-06-22 22:47:18.516344+07	1
b10f0c52-80fb-4719-8439-b14e3f591c42	1fcce3f3f33c80b59609d910f37a11f1978d111c1f6d3019f74921c5a16d0dea	2025-06-20 11:52:02.9594+07	20250620045202_add_site_seo_settings	\N	\N	2025-06-20 11:52:02.954084+07	1
493b47ee-cede-49f6-a747-e5dff7fa20ab	b7b835353c6fa2ffb20a8b74ceb9ada8d097d0c4c629777e393013af6cb52667	2025-06-21 10:04:09.627774+07	20250621030409_add_product_model	\N	\N	2025-06-21 10:04:09.62168+07	1
e8ebcba0-f284-422f-983a-60ce3a173207	0164890b663be91189a17a98099d9a6f85165f596ae4b9e80371738e9507ad39	2025-06-21 10:19:42.579435+07	20250621031942_add_advantage_images_to_product	\N	\N	2025-06-21 10:19:42.577674+07	1
061fac99-c70f-4e93-b363-a5ca11c8aab4	bf183c48448f037391023a62723538e420a5e615afa167b32a4ee805e4dbccd3	2025-06-21 11:06:37.227903+07	20250621040637_add_3d_model_to_product	\N	\N	2025-06-21 11:06:37.226037+07	1
6f33fced-4d9c-43d6-80bd-716b2ee38bb1	25e29335021fd35d4c7daef2fbac640e85aa85fd5b11d3a30b2777b246b36beb	2025-06-21 13:00:24.313406+07	20250621060024_add_preview_image_to_product	\N	\N	2025-06-21 13:00:24.31149+07	1
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news (id, category, title, content, image, created_at, updated_at, reading_time, slug, short_content) FROM stdin;
cmc1yrwfy0002mh4b9i0cy8df	technology	Тестовый заголовок	Внезапно, некоторые особенности внутренней политики набирают популярность среди определенных слоев населения, а значит, должны быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Предварительные выводы неутешительны: убеждённость некоторых оппонентов однозначно определяет каждого участника как способного принимать собственные решения касаемо глубокомысленных рассуждений. Задача организации, в особенности же глубокий уровень погружения влечет за собой процесс внедрения и модернизации новых предложений. Значимость этих проблем настолько очевидна, что граница обучения кадров способствует подготовке и реализации распределения внутренних резервов и ресурсов. А ещё диаграммы связей неоднозначны и будут объединены в целые кластеры себе подобных. С учётом сложившейся международной обстановки, семантический разбор внешних противодействий создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса своевременного выполнения сверхзадачи! Но явные признаки победы институционализации в равной степени предоставлены сами себе. В своём стремлении улучшить пользовательский опыт мы упускаем, что интерактивные прототипы освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, призваны к ответу.	1750428270228-257145453.webp	2025-06-18 13:04:33.023	2025-06-23 09:06:23.154	1	testovyy-zagolovok	краткое тестовое содержание
\.


--
-- Data for Name: portfolio_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.portfolio_items (id, name, poster, task_title, task_description, solution_title, solution_description, solution_subtitle, solution_subdescription, has_review, review_title, review_text, review_name, review_image, review_role, created_at, updated_at, full_video_path, preview_video_path, solution_images, year, slug, description) FROM stdin;
cmc397eb10000mh0x56iwfirw	«Алтайвагон»	1750339817716-711418666.webp	Увеличение мощности и отказоустойчивости энергоснабжения с интеграцией в действующую инфраструктуру	Две ранее установленные трансформаторные подстанции мощностью 2×1000 кВА не обеспечивали необходимый объём мощности для существующих и перспективных производственных нагрузок. Требовалось увеличить суммарную мощность энергоснабжения, обеспечить отказоустойчивость и гибкость в управлении нагрузками. При этом необходимо было интегрировать решение в действующую инфраструктуру предприятия, минимизируя простои и риски для производственного процесса.\r\n	Внедрение модульной подстанции с секционным резервированием	Для повышения мощности и надёжности была спроектирована и внедрена новая модульная трансформаторная подстанция, включающая 3 силовых трансформатора и 2 распределительных устройства 0,4 кВ. Конфигурация распределения предусматривала 3 секции, соединённые секционными выключателями, что позволило повысить управляемость и обеспечить резервирование питания. Учитывая, что питание осуществляется по 2 кабельным линиям, в конструкции подстанции также предусмотрена установка КСО на КЛ-6 кВ в отсеке РУВН.	Технические решения	Были проложены две кабельные линии 6 кВ от РУ-2 до новой подстанции общей протяжённостью около 180 метров, из которых 80 метров — методом горизонтального направленного бурения. Это позволило выполнить работы без нарушения текущей инфраструктуры.	f	\N	\N	\N	\N	\N	2025-06-19 10:44:18.345	2025-06-19 13:30:17.721	\N	\N	{1750332306021-560527205.webp,1750332306024-880190792.webp}	2019	altayvagon	АО «Алтайвагон» — один из крупнейших заводов в России по производству железнодорожного грузового подвижного состава. Предприятие выпускает порядка 20 моделей современных вагонов различных типов, а его производственные мощности позволяют выпускать свыше 10 000 вагонов ежегодно.
cmc3gm0050001mhaof7shpsce	Поставка оборудования для ОАО «Кучуксульфат»	1750342296951-670325432.png	Реконструкция ВРУ ГРЩ ТП №3 для повышения надежности электроснабжения предприятия	В апреле 2024 года в рамках реализации инвестиционной программы были проведены работы по перевооружению трансформаторной подстанции ПС 6/0,4 кВ. Проект предполагал реконструкцию именно вводно-распределительного устройства главного распределительного щита (ВРУ ГРЩ ТП №3) с соблюдением всех необходимых требований и стандартов. Основной задачей было обеспечение надежного и устойчивого электроснабжения предприятия, способного выдержать возросшую нагрузку и гарантировать стабильность работы в перспективе дальнейшего роста производства.	Комплексная модернизация подстанции для повышения надежности и пропускной способности	В рамках проекта была разработана и реализована специальная схема реконструированной подстанции, что позволило обеспечить высокую надежность и стабильность электроснабжения при одновременном увеличении пропускной способности объекта. Для достижения поставленных целей было выбрано и поставлено современное электрооборудование, включая комплектную двухтрансформаторную подстанцию, состоящую из двух распределительных устройств РУНН 0,4 кВ. Одно из устройств — низковольтное распределительное устройство одностороннего обслуживания внутренней установки НКУ 3b, что дополнительно повысило эффективность и безопасность эксплуатации энергообъекта.\r\n	Технические решения	Основные поставленные компоненты: КСО-312 в составе: выключатель нагрузки ВНАл-10/630-20-IIIз-У3, предохранитель высоковольтный патрон ПТ 1.3-6-160-20 УЗ, НКУ 3b. НКУ «Катунь» представляют собой напольные шкафы одностороннего или двухстороннего обслуживания, состоящие из отдельных шкафов (щитов), соединённых в функциональное распределительное устройство в соответствии с заказом. 	f	\N	\N	\N	\N	\N	2025-06-19 14:11:36.966	2025-06-19 14:12:53.026	\N	\N	{1750342296957-722683745.png,1750342296961-470725943.png}	2025	postavka-oborudovaniya-dlya-oao-kuchuksulfat	ОАО «Кучуксульфат» — крупное предприятие химической промышленности, расположенное в рабочем поселке Степное Благовещенского района Алтайского края. Завод специализируется на производстве сульфата натрия и играет ведущую роль в экономике региона.
cmc3c62lz0000mhaoz65y0ybl	БМК "Меланжист Алтая"	1750338305016-403463943.webp	Модернизация системы электроснабжения для повышения надёжности и производительности	В связи с ростом производственных потребностей существующая система электроснабжения перестала обеспечивать необходимый уровень мощности и устойчивости, что привело к регулярным перебоям и снижению стабильности работы оборудования. Перегрузки ограничивали технологические процессы и препятствовали дальнейшему развитию предприятия. Для устранения этих проблем требуется провести модернизацию инфраструктуры и внедрить более надёжную и производительную систему электроснабжения, способную обеспечить стабильную работу оборудования и поддержать дальнейшее расширение производственных мощностей.	Комплексное решение по обеспечению надёжного электроснабжения предприятия с применением 2КТП 1600 кВА	В рамках проекта реализовано современное и надёжное решение по повышению установленной мощности и обеспечению бесперебойного электроснабжения предприятия. Для этого были поставлены две комплектные трансформаторные подстанции (2КТП) мощностью по 1600 кВА, интегрированные в здание энергоблока. Конструкция подстанции предусматривает раздельное размещение оборудования по функциональным зонам, что повышает безопасность эксплуатации и облегчает обслуживание. Использование современных трансформаторов с литой изоляцией, распределительных устройств 6 кВ и 0,4 кВ, а также автоматизированных систем резервирования гарантирует высокую надёжность, адаптацию к архитектуре объекта и соответствие современным требованиям к промышленной энергетике.	Технические решения	Применены два трансформатора "Hercules" 1600 кВА с литой изоляцией и алюминиевыми обмотками, класс напряжения 6/0,4 кВ, степень защиты IP31.\r\nОборудование размещено в отдельных зонах: РУ-6 кВ, РУ-0,4 кВ и камеры трансформаторов — для повышения безопасности и удобства обслуживания.	f	\N	\N	\N	\N	\N	2025-06-19 12:07:15.383	2025-06-20 15:43:47.638	\N	\N	{1750338305021-639407251.webp,1750338305026-353464916.webp}	2025	bmk-melanzhist-altaya	Барнаульский меланжевый комбинат "Меланжист Алтая" (БМК) — единственный производитель хлопчатобумажных и смесовых тканей за Уралом с полным циклом, включающим производство пряжи, суровых и готовых тканей, выпуск швейных изделий. Сегодня БМК — это швейный цех и три фабрики: прядильная, ткацкая, отделочная.
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, category, name, description, important_characteristics, advantages, simple_description, detailed_description, created_at, updated_at, model_3d_url, preview_image, slug) FROM stdin;
cmc5ubn2u0000mhdgwyf60udc	power_quality_improvement	Пункт автоматического регулирования напряжения	Специализированное устройство для обеспечения стабильного напряжения в электрических сетях. Автоматически компенсирует колебания напряжения и защищает оборудование от скачков. Применяется в распределительных сетях, на промышленных предприятиях и объектах с критическим потреблением энергии.	[{"unit": {"text": "кВ"}, "value": "6-35", "description": "Напряжение"}, {"unit": {"text": "от номинального значения"}, "value": "±5-10%", "description": "Стабилизация напряжения"}, {"unit": {"text": ""}, "value": "Автоматическая", "description": "Система регулирования"}]	[{"icon": "CheckSquare2Icon", "image": "1750607553368-122957820.webp", "label": "Полная заводская готовность", "description": "Поставляемого в сборе, а также блоков и узлов нетранспортабельного в сборе оборудовани должна, как правило, исключать необходимость разборки и ревизии его в процессе монтажа."}, {"icon": "ClockFadingIcon", "image": "1750607652079-636952656.jpg", "label": "Сроки поставки от 14 дней", "description": "Каждый из нас понимает очевидную вещь: начало повседневной работы по формированию позиции\\nспособствует повышению качества направлений прогрессивного развития."}, {"icon": "Medal", "image": "1750607688209-215787163.webp", "label": "Высокая надежность конструктива", "description": "Высокий уровень надежности конструктивных\\nэлементов обеспечивает долговечность и\\nбесперебойную работу оборудования даже в\\nэкстремальных условиях эксплуатации."}, {"icon": "HandCoins", "image": "1750607688215-949700404.webp", "label": "Понятное и прозрачное ценообразование", "description": "Наша политика ценообразования построена на\\nпринципах прозрачности и честности, что\\nпозволяет клиентам получать максимальную\\nвыгоду при оптимальном соотношении цены и\\nкачества."}, {"icon": "LucideUserCheck", "image": "1750637412995-66227431.webp", "label": "Проектная экспертиза от типовых проектов до индивидуальных решений", "description": "Наши специалисты обладают богатым опытом в\\nразработке как типовых, так и уникальных\\nпроектных решений, что позволяет удовлетворить\\nсамые специфические требования заказчика."}]	{"items": [{"text": "ПАРН предназначен для стабилизации уровня напряжения в электрической сети, автоматической компенсации колебаний напряжения и поддержания напряжения в пределах номинальных значений."}, {"text": "Обеспечивает защиту оборудования и потребителей от скачков напряжения, гарантируя качественное электроснабжение для распределительных сетей, промышленных предприятий и объектов с критическим потреблением энергии."}, {"text": "ПАРН отличается высокой надежностью, полной автоматизацией процесса, эффективностью использования энергии и простотой обслуживания. Опционально доступен дистанционный мониторинг для удобства эксплуатации."}]}	{"items": [{"title": "test1", "description": "test2"}, {"title": "knjnj34nkj", "description": "3n534n5l439438759438798534"}, {"title": "", "description": ""}, {"title": "", "description": ""}]}	2025-06-21 06:11:00.63	2025-06-23 09:08:43.901	1750610278762-781860465.glb	1750486260624-568686638.webp	punkt-avtomaticheskogo-regulirovaniya-napryazheniya
\.


--
-- Data for Name: site_seo_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.site_seo_settings (id, page_path, page_name, title, description, keywords, og_title, og_description, og_image, canonical_url, is_active, created_at, updated_at) FROM stdin;
cmc4id4ed0005mhzc8mp3x415	/production	О производстве	О производстве | Сибкомплект	описание производства						t	2025-06-20 07:48:28.165	2025-06-20 13:13:45.118
cmc4cj4ac0000mhro4a7ep6pp	/about	О компании	О компании | «Сибкомплект»	Описание страницы о нас	ключевые, слова, через, запятую					t	2025-06-20 05:05:10.26	2025-06-20 07:28:56.243
cmc4hsms50001mhzc2i88wgqr	/certificates	Сертификаты	Сертификация | «Сибкомплект»	описание сертификатов						t	2025-06-20 07:32:32.214	2025-06-20 07:34:41.468
cmc4i19940002mhzcqd2wmg3k	/contacts	Контакты	Контакты | «Сибкомплект»	описание контактов						t	2025-06-20 07:39:14.584	2025-06-20 07:39:25.592
cmc4ia0sk0003mhzcmxrvnxty	/news	Новости	Новости | Сибкомплект	описание новостей						t	2025-06-20 07:46:03.521	2025-06-20 07:46:03.521
cmc4iaqq10004mhzc6i4l4m0t	/vacancies	Вакансии	Вакансии | Сибкомплект	описание вакансий						t	2025-06-20 07:46:37.129	2025-06-20 07:46:37.129
cmc4j0xy60006mhzc503feqkh	/privacy	Политика конфиденциальности	Политика конфиденциальности | Сибкомплект	описание политики конфиденциальности						t	2025-06-20 08:06:59.545	2025-06-20 14:17:09.457
cmc4hfyzt0000mhzc81bvv4ks	/catalog	Каталог	Каталог  | «Сибкомплект»	описание каталога						t	2025-06-20 07:22:41.513	2025-06-22 16:15:57.097
cmc4jvwzi0007mhzc9o0smz3r	/	Главная	Промышленное электрооборудование | Сибкомплект	описание главной 						t	2025-06-20 08:31:04.638	2025-06-23 09:09:31.874
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, phone, name, password, avatar_path, telegram_id, otp_code, otp_expires_at, verification_token, rights) FROM stdin;
cmc1yr18u0000mh4bdwp14csw	test@test.ru	\N	\N	$argon2id$v=19$m=65536,t=3,p=4$ilTcPnhItmu5otxaXwtSfA$JIVscaoSZricW9fviWjZW1Lb9/ZCezgZYSGyH8QBsFY	\N	\N	\N	\N	\N	{USER,MANAGER}
\.


--
-- Data for Name: vacancies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vacancies (id, title, requirements, experience, salary, category, created_at, updated_at) FROM stdin;
cmc3kp44a0001mhcy5l4nqyra	Инженер-конструктор	{"Проектирование и расчет изделий, выпускаемых предприятием. Корпусные детали оборудования из листового металла.","Разработка и оформление конструкторской документации изделий и выдача на производство.","Выполнение графической и текстовой части, необходимых расчетов."}	{"от 3-х лет стаж","от 3-х лет стаж"}	50000	hr	2025-06-19 16:06:00.73	2025-06-20 03:38:36.356
cmc49idle0002mhcyt02cjzki	Инженер расчетной группы	{"Обработка опросных листов и технических заданий заказчика;","Поиск и согласование с заказчиком аналогов требуемого оборудования исходя из технических характеристик, стоимости и сроков изготовления и поставки;","Анализ рынка, контроль за изменением стоимости комплектующих;","Подготовка опросного листа для включения в план производства;","Работа с обращениями заказчика. Консультация по технической части."}	{"3 года стаж","3 года стаж"}	50000	hr	2025-06-20 03:40:36.818	2025-06-20 03:40:36.818
cmc4a1ojt0003mhcyi32d48k3	Инженер-проектировщик	{"Проектирование и расчет изделий, выпускаемых предприятием. Корпусные детали оборудования из листового металла.","Разработка и оформление конструкторской документации изделий и выдача на производство.","Выполнение графической и текстовой части, необходимых расчетов."}	{"3 года стаж"}	50000	hr	2025-06-20 03:55:37.481	2025-06-20 14:01:15.961
\.


--
-- Name: _ProductPortfolioItems _ProductPortfolioItems_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ProductPortfolioItems"
    ADD CONSTRAINT "_ProductPortfolioItems_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- Name: portfolio_items portfolio_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio_items
    ADD CONSTRAINT portfolio_items_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: site_seo_settings site_seo_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site_seo_settings
    ADD CONSTRAINT site_seo_settings_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vacancies vacancies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacancies
    ADD CONSTRAINT vacancies_pkey PRIMARY KEY (id);


--
-- Name: _ProductPortfolioItems_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_ProductPortfolioItems_B_index" ON public."_ProductPortfolioItems" USING btree ("B");


--
-- Name: news_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX news_slug_key ON public.news USING btree (slug);


--
-- Name: portfolio_items_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX portfolio_items_slug_key ON public.portfolio_items USING btree (slug);


--
-- Name: products_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX products_slug_key ON public.products USING btree (slug);


--
-- Name: site_seo_settings_page_path_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX site_seo_settings_page_path_key ON public.site_seo_settings USING btree (page_path);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_phone_key ON public.users USING btree (phone);


--
-- Name: _ProductPortfolioItems _ProductPortfolioItems_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ProductPortfolioItems"
    ADD CONSTRAINT "_ProductPortfolioItems_A_fkey" FOREIGN KEY ("A") REFERENCES public.portfolio_items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProductPortfolioItems _ProductPortfolioItems_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ProductPortfolioItems"
    ADD CONSTRAINT "_ProductPortfolioItems_B_fkey" FOREIGN KEY ("B") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

