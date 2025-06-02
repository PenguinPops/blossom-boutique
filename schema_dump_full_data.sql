--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13
-- Dumped by pg_dump version 16.8

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    userid integer NOT NULL,
    orderdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(50) DEFAULT 'pending'::character varying NOT NULL,
    total real DEFAULT 0
);


ALTER TABLE public."Order" OWNER TO neondb_owner;

--
-- Name: OrderDetail; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."OrderDetail" (
    id integer NOT NULL,
    orderid integer NOT NULL,
    productid integer NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public."OrderDetail" OWNER TO neondb_owner;

--
-- Name: OrderDetail_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."OrderDetail_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OrderDetail_id_seq" OWNER TO neondb_owner;

--
-- Name: OrderDetail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."OrderDetail_id_seq" OWNED BY public."OrderDetail".id;


--
-- Name: OrderInfo; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."OrderInfo" (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    surname character varying(40) NOT NULL,
    postalcode character varying(6) NOT NULL,
    number character varying(12) NOT NULL,
    address character varying(255) NOT NULL,
    country character varying(30) NOT NULL,
    voivodeship character varying(30) NOT NULL,
    orderid integer NOT NULL,
    userid integer NOT NULL
);


ALTER TABLE public."OrderInfo" OWNER TO neondb_owner;

--
-- Name: OrderInfo_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

ALTER TABLE public."OrderInfo" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."OrderInfo_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Order_id_seq" OWNER TO neondb_owner;

--
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name character varying(128) NOT NULL,
    description character varying(256) NOT NULL,
    price real NOT NULL,
    image character varying(256) NOT NULL,
    categoryid integer
);


ALTER TABLE public."Product" OWNER TO neondb_owner;

--
-- Name: ProductCategory; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."ProductCategory" (
    id integer NOT NULL,
    name character varying(128) NOT NULL,
    slug character varying(128) NOT NULL,
    description text,
    image character varying(256)
);


ALTER TABLE public."ProductCategory" OWNER TO neondb_owner;

--
-- Name: ProductCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."ProductCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ProductCategory_id_seq" OWNER TO neondb_owner;

--
-- Name: ProductCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."ProductCategory_id_seq" OWNED BY public."ProductCategory".id;


--
-- Name: ProductDetails; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."ProductDetails" (
    id integer NOT NULL,
    productid integer,
    detail text NOT NULL
);


ALTER TABLE public."ProductDetails" OWNER TO neondb_owner;

--
-- Name: ProductDetails_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."ProductDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ProductDetails_id_seq" OWNER TO neondb_owner;

--
-- Name: ProductDetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."ProductDetails_id_seq" OWNED BY public."ProductDetails".id;


--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO neondb_owner;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email character varying(64),
    password character varying(64),
    name character varying(40)
);


ALTER TABLE public."User" OWNER TO neondb_owner;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO neondb_owner;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.customers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    image_url character varying(255) NOT NULL
);


ALTER TABLE public.customers OWNER TO neondb_owner;

--
-- Name: invoices; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.invoices (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    customer_id uuid NOT NULL,
    amount integer NOT NULL,
    status character varying(255) NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.invoices OWNER TO neondb_owner;

--
-- Name: revenue; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.revenue (
    month character varying(4) NOT NULL,
    revenue integer NOT NULL
);


ALTER TABLE public.revenue OWNER TO neondb_owner;

--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- Name: OrderDetail id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."OrderDetail" ALTER COLUMN id SET DEFAULT nextval('public."OrderDetail_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: ProductCategory id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ProductCategory" ALTER COLUMN id SET DEFAULT nextval('public."ProductCategory_id_seq"'::regclass);


--
-- Name: ProductDetails id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ProductDetails" ALTER COLUMN id SET DEFAULT nextval('public."ProductDetails_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Order" (id, userid, orderdate, status, total) FROM stdin;
7	3	2025-01-07 11:45:42.312062	pending	69.98
8	4	2025-01-07 12:02:28.486225	pending	12.99
9	4	2025-01-07 13:55:26.87612	pending	39.99
10	4	2025-01-07 13:55:31.897156	pending	39.99
11	4	2025-01-14 09:28:43.587813	pending	119.97
12	4	2025-01-14 09:28:48.206224	pending	119.97
13	4	2025-01-14 09:50:08.817429	pending	19.99
14	4	2025-01-14 09:54:22.436979	pending	19.99
15	4	2025-04-07 11:38:53.235911	pending	39.99
\.


--
-- Data for Name: OrderDetail; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."OrderDetail" (id, orderid, productid, quantity) FROM stdin;
9	7	2	2
10	8	6	1
11	9	1	1
12	10	1	1
13	11	1	3
14	12	1	3
15	13	9	1
16	14	9	1
17	15	1	1
\.


--
-- Data for Name: OrderInfo; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."OrderInfo" (id, name, surname, postalcode, number, address, country, voivodeship, orderid, userid) FROM stdin;
5	Adrian	Dziewa	22-100	111222333	Sloneczna 1, Lublin	Poland	Lubelskie	7	3
6	Stefan	Rzecki	22-222	111333222	Pogodna 1, Lublin	Polska	Lubelskie	8	4
7	Adrian	Dziewa	22-100	111222333	Słoneczna 1	Pl	Lb	9	4
8	Adrian	Dziewa	22-100	111222333	Słoneczna 1	Pl	Lb	10	4
9	Franek	Janek	22-100	200100100	Plackowa 3, Lublin	Polska	Lubelskie	11	4
10	Franek	Janek	22-100	200100100	Plackowa 3, Lublin	Polska	Lubelskie	12	4
11	Janek	Franek	00-444	000222333	Słoneczna 6674, Lublin	Polska	Lubelskie	13	4
12	Kacper	Franecki	44-444	444444444	Pochmurna 666, Lublin	Polska	Lubelskie	14	4
13	Adrian	Dziewa	22-100	123456789	ul. Wesola	Polska	Lubelskie	15	4
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Product" (id, name, description, price, image, categoryid) FROM stdin;
1	Romantic Roses	A beautiful bouquet of roses.	39.99	/images/roses.jpg	1
3	Sunny Blooms	Bright and cheerful sunflowers.	29.99	/images/sunflowers.jpg	1
2	Elegant Lilies	Perfect for weddings.	34.99	/images/lilies.jpg	1
7	Succulent Garden	A stylish assortment of low-maintenance succulents, perfect for any space.	24.99	/images/succulents.jpg	2
8	Fiddle Leaf Fig	Lush, vibrant fiddle leaf figs perfect for enhancing your home's natural vibe.	14.99	/images/fiddle-leaf-fig.jpg	2
9	Snake Plant	A sleek and hardy indoor plant that purifies the air and adds a modern touch to any room.	19.99	/images/snake-plant.jpg	2
4	Bridal Bouquet	A breathtaking bouquet tailored to make your wedding day unforgettable.	99.99	/images/bridal-bouquet.jpg	3
5	Table Centerpieces	Elegant table centerpieces designed to enhance your wedding reception.	59.99	/images/table-centerpiece.jpg	3
6	Handcrafted Boutonnieres	Handcrafted boutonnieres to complement your rustic wedding theme.	12.99	/images/boutonnieres.jpg	3
\.


--
-- Data for Name: ProductCategory; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."ProductCategory" (id, name, slug, description, image) FROM stdin;
2	Plants	plants	Indoor and outdoor plants to bring life to your space	/images/plant.jpg
1	Bouquets	bouquets	A collection of beautiful floral arrangements for various occasions	/images/roses.jpg
3	Weddings	weddings	Exclusive wedding floral arrangements and accessories	/images/wedding.jpg
\.


--
-- Data for Name: ProductDetails; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."ProductDetails" (id, productid, detail) FROM stdin;
1	4	Customizable floral arrangement
2	4	Designed to match your wedding theme
3	4	Includes a keepsake ribbon wrap
4	4	Care instructions provided
5	5	Customizable arrangements for wedding themes
6	5	Includes a stylish decorative vase
7	5	Perfect for reception and dinner tables
8	5	Care instructions provided
9	6	Made with fresh or dried flowers
10	6	Includes decorative ribbon
11	6	Perfect for groomsmen and the groom
12	6	Care instructions provided
13	7	Low-maintenance succulents in a stylish planter
14	7	Perfect for modern spaces
15	7	Ideal as a gift or home decor
16	8	Comes in a hanging basket or pot
17	8	Thrives in indirect sunlight
18	8	Requires moderate watering
19	8	Care instructions included
20	9	Height: 12-16 inches
21	9	Comes in a minimalist ceramic pot
22	9	Low light and water requirements
23	9	Care instructions included
24	1	12 long-stemmed red roses
25	1	Comes with a decorative vase
26	1	Includes a personalized message card
27	1	Care instructions provided
28	3	6 large sunflowers
29	3	Wrapped in eco-friendly kraft paper
30	3	Optional gift wrapping available
31	3	Care instructions provided
32	2	8 premium white lilies
33	2	Includes a decorative vase
34	2	Complimentary message card included
35	2	Care instructions provided
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."User" (id, email, password, name) FROM stdin;
1	user@nextmail.com	$2a$10$NVtn.8GeITNz.CuImAGqbu/aDoofVeNmbGtdN8ciBRvFPkATr7B12	user1
2	user2@nextmail.com	$2a$10$2NiDVGTcpZwMAUeTsJneAuzCJxBlSUoBAX/vwTIGgVkmIeTJhHv.6	user2
3	user3@nextmail.com	$2a$10$lEJairzl6dK0EuE.jMShtOJlCoJuKAhbA5ob3b12HQHYb3xgzbboa	user3
5	test321@test.pl	$2a$10$MOtBBcVH.bl4gc2eXO1BT.hfLrEgLI4XP1rkPdF27EvCm2ACNmQk.	test321
4	jrzecki@onet.pl	$2a$10$RTGZO6GnmIUdrxW6h3/1busRJ6ZJKHGawzZphRjpZ8tN.P/xS1Fv2	jrzecki3
6	test@test.com	$2a$10$awxkX5lTpzIw5cpphK0lQOCT.2hAhllWh22T1e0hFcXsHPYls8QbK	testUser
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.customers (id, name, email, image_url) FROM stdin;
d6e15727-9fe1-4961-8c5b-ea44a9bd81aa	Evil Rabbit	evil@rabbit.com	/customers/evil-rabbit.png
3958dc9e-712f-4377-85e9-fec4b6a6442a	Delba de Oliveira	delba@oliveira.com	/customers/delba-de-oliveira.png
3958dc9e-742f-4377-85e9-fec4b6a6442a	Lee Robinson	lee@robinson.com	/customers/lee-robinson.png
76d65c26-f784-44a2-ac19-586678f7c2f2	Michael Novotny	michael@novotny.com	/customers/michael-novotny.png
cc27c14a-0acf-4f4a-a6c9-d45682c144b9	Amy Burns	amy@burns.com	/customers/amy-burns.png
13d07535-c59e-4157-a011-f8d2ef4e0cbb	Balazs Orban	balazs@orban.com	/customers/balazs-orban.png
\.


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.invoices (id, customer_id, amount, status, date) FROM stdin;
c1ac9c4e-a75f-4a99-bc05-6f72251b0253	d6e15727-9fe1-4961-8c5b-ea44a9bd81aa	15795	pending	2022-12-06
b9d41cd3-c9d4-4fcd-886e-94140107f578	3958dc9e-712f-4377-85e9-fec4b6a6442a	20348	pending	2022-11-14
88920b16-577f-476e-87c6-23ab8d3289ad	cc27c14a-0acf-4f4a-a6c9-d45682c144b9	3040	paid	2022-10-29
533559af-ed85-4fa8-88be-02dfc3d67aa6	13d07535-c59e-4157-a011-f8d2ef4e0cbb	34577	pending	2023-08-05
283493cd-0459-4fd2-9be7-63a3604e7200	3958dc9e-742f-4377-85e9-fec4b6a6442a	54246	pending	2023-07-16
4a1cc409-085b-4edb-bc99-c6c6717aa06f	d6e15727-9fe1-4961-8c5b-ea44a9bd81aa	666	pending	2023-06-27
9108aea9-92a7-4034-b9d6-472a6526e5de	76d65c26-f784-44a2-ac19-586678f7c2f2	32545	paid	2023-06-09
348ca368-ab0f-4af2-93cc-bbcf956b5ce6	cc27c14a-0acf-4f4a-a6c9-d45682c144b9	1250	paid	2023-06-17
177b84f8-544e-4e24-9218-d24bbb7ef2a7	13d07535-c59e-4157-a011-f8d2ef4e0cbb	8546	paid	2023-06-07
9a987aa9-74a3-4c0e-aaf3-50f16eb5e7a0	3958dc9e-712f-4377-85e9-fec4b6a6442a	500	paid	2023-08-19
9a8e7e1c-bd72-47b1-93be-a32cfb11a0a4	13d07535-c59e-4157-a011-f8d2ef4e0cbb	8945	paid	2023-06-03
c927bfee-6538-4bdc-944e-44587f0e17da	3958dc9e-742f-4377-85e9-fec4b6a6442a	1000	paid	2022-06-05
\.


--
-- Data for Name: revenue; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.revenue (month, revenue) FROM stdin;
Feb	1800
Mar	2200
Apr	2500
May	2300
Jun	3200
Jul	3500
Aug	3700
Sep	2500
Oct	2800
Nov	3000
Dec	4800
Jan	2000
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, name, email, password) FROM stdin;
410544b2-4001-4271-9855-fec4b6a6442a	User	user@nextmail.com	$2b$10$8BeEWEAH3j4Br0lKYTaU7utLUcJUpmVDkmVKqLfSG7/YEb.1UBJ2i
\.


--
-- Name: OrderDetail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."OrderDetail_id_seq"', 17, true);


--
-- Name: OrderInfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."OrderInfo_id_seq"', 13, true);


--
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."Order_id_seq"', 15, true);


--
-- Name: ProductCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."ProductCategory_id_seq"', 3, true);


--
-- Name: ProductDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."ProductDetails_id_seq"', 35, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."Product_id_seq"', 3, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."User_id_seq"', 6, true);


--
-- Name: OrderDetail OrderDetail_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."OrderDetail"
    ADD CONSTRAINT "OrderDetail_pkey" PRIMARY KEY (id);


--
-- Name: OrderInfo OrderInfo_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."OrderInfo"
    ADD CONSTRAINT "OrderInfo_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: ProductCategory ProductCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ProductCategory"
    ADD CONSTRAINT "ProductCategory_pkey" PRIMARY KEY (id);


--
-- Name: ProductCategory ProductCategory_slug_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ProductCategory"
    ADD CONSTRAINT "ProductCategory_slug_key" UNIQUE (slug);


--
-- Name: ProductDetails ProductDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ProductDetails"
    ADD CONSTRAINT "ProductDetails_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: User User_username_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_username_key" UNIQUE (name);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: revenue revenue_month_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.revenue
    ADD CONSTRAINT revenue_month_key UNIQUE (month);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: OrderDetail OrderDetail_orderid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."OrderDetail"
    ADD CONSTRAINT "OrderDetail_orderid_fkey" FOREIGN KEY (orderid) REFERENCES public."Order"(id) ON DELETE CASCADE;


--
-- Name: OrderDetail OrderDetail_productid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."OrderDetail"
    ADD CONSTRAINT "OrderDetail_productid_fkey" FOREIGN KEY (productid) REFERENCES public."Product"(id) ON DELETE CASCADE;


--
-- Name: ProductDetails ProductDetails_productid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ProductDetails"
    ADD CONSTRAINT "ProductDetails_productid_fkey" FOREIGN KEY (productid) REFERENCES public."Product"(id) ON DELETE CASCADE;


--
-- Name: Product Product_categoryid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryid_fkey" FOREIGN KEY (categoryid) REFERENCES public."ProductCategory"(id) ON DELETE SET NULL;


--
-- Name: OrderInfo fk_order; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."OrderInfo"
    ADD CONSTRAINT fk_order FOREIGN KEY (orderid) REFERENCES public."Order"(id);


--
-- Name: OrderInfo fk_user; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."OrderInfo"
    ADD CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES public."User"(id);


--
-- Name: all_tables; Type: PUBLICATION; Schema: -; Owner: neondb_owner
--

CREATE PUBLICATION all_tables FOR ALL TABLES WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION all_tables OWNER TO neondb_owner;

--
-- PostgreSQL database dump complete
--

