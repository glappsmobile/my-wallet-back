--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Ubuntu 13.4-0ubuntu0.21.04.1)
-- Dumped by pg_dump version 13.4 (Ubuntu 13.4-0ubuntu0.21.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cashflow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cashflow (
    id integer,
    user_id integer,
    date date NOT NULL,
    description text NOT NULL,
    value numeric(10,0) NOT NULL
);


ALTER TABLE public.cashflow OWNER TO postgres;

--
-- Name: cashflow_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cashflow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cashflow_id_seq OWNER TO postgres;

--
-- Name: cashflow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cashflow_id_seq OWNED BY public.cashflow.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer,
    user_id integer NOT NULL,
    token text NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cashflow id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cashflow ALTER COLUMN id SET DEFAULT nextval('public.cashflow_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cashflow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cashflow (id, user_id, date, description, value) FROM stdin;
1	11	2021-10-25	3das	-23
2	11	2021-10-25	3da	-321
3	11	2021-10-25	ataa	-1000
4	11	2021-10-25	123123	123
5	11	2021-10-25	1	-2000
6	22	2021-10-25	123213	12312321
7	22	2021-10-25	aaaaaaaa	-1231231
8	22	2021-10-25	1111111111	-111111
9	22	2021-10-25	a	-10969979
10	22	2021-10-25	d	1
11	22	2021-10-25	aba	-23
12	22	2021-10-25	aba	22
13	22	2021-10-25	a	-3
14	22	2021-10-25	a	3
15	22	2021-10-25	aaa	33
16	22	2021-10-25	a	3
17	22	2021-10-25	a	3
18	11	2021-10-25	teste	-2022
19	11	2021-10-25	dada	12
20	11	2021-10-25	ada	-13
21	11	2021-10-25	12	12
22	23	2021-10-25	dsa	23
23	23	2021-10-25	5a	-155
24	26	2021-10-25	ada	-231
25	11	2021-10-25	UM TEXTO BEM GRANDE PRA TESTAR	-123
26	11	2021-10-25	ASDADAASDAS DASDASDSA DSADASDASDSADS ASDDASDASDAS DASSADSADSADAS ADSDASDAS	-2222
27	11	2021-10-25	Comprar comida das criança	900
28	11	2021-10-25	Comprar comida das criança	900
29	11	2021-10-25	adadada	123
30	11	2021-10-25	ata	777
31	11	2021-10-25	ata	777
32	11	2021-10-25	ata	777
33	11	2021-10-25	ata	767
34	11	2021-10-25	ata	767
35	11	2021-10-25	aaaaaaaaaaaa	456
36	11	2021-10-25	teste	-1000
37	11	2021-10-25	testa	-12
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, token) FROM stdin;
\N	22	e4a11e60-2722-4e2b-b10e-7f875b499bc8
\N	23	2269486a-4e1d-433a-9f61-3f3bdad8a847
\N	26	c901023b-e9fb-4f2c-a6c3-93600ccfa5a3
\N	25	4feced4f-854b-452b-82d7-fce5205a89e1
\N	24	b8f26fac-5259-49d2-a66c-f92c64e9e3f9
\N	11	d626c1d0-f62a-407e-92a8-a83abde839a6
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
2	Gleuco	gleuco@gmail.com	$2b$11$JnJYL4Ieey/KYOCQW1mGZ.Npp8G8jth95R4tEUqCPXQoJWU0UHzfi
10	Gleuco	gleucodad@gmail.com	$2b$11$lijIK9x4f0CtmFG4oCHMpeDF5fDC4728rDdNUA2Ny020NZ1iETE4i
11	Glauco	email@teste.com	$2b$11$iGxXEIB9IVIacf2JDJZUrOiAjOU9UHs9krOyMzLsLndz8o7R/aJce
12	Glauco	email12@teste.com	$2b$11$4YSMbzmcx6FBvznYjzwwGe1UTMHbptb.3ns3bmrkT3U4id0bg1U3C
13	Glauco	email123@teste.com	$2b$11$5uiBhqT2IW3q7gwyEkmA2uZqnvqsaU0ogsQAxo0DjWTptEf5q0EaO
14	Glauco	email123312@teste.com	$2b$11$ownu4j15WBcETZRZnSlaMe.2Q8mQyBTD2LTjl4gszDfm2qkQJY3/i
15	Glauco	email12331212@teste.com	$2b$11$OhVc9lfTGtFUy1fdpHuyXOk5zfKme6fmP0xclcgL3ueGh6Q0N4j3i
16	Glauco	email12331232112@teste.com	$2b$11$3uuY0WcNv1e4bC5h2q/qyeb2PQVmAgHIIY1Ud84C3WpA75i9xmx.m
17	Glauco	email12331232213112@teste.com	$2b$11$s8euk9Wz23iqwaaNltMVVuZq.7lsJWDVOGdiwjjUYIGwCYEey4mXm
18	Glauco	email132551@teste.com	$2b$11$yMV4Fw/uq3MyvvzD5GnDdumnBLd0sZTP6.oA9p2pnnlNgHowbGcAu
19	Glauco	emai5l@teste.com	$2b$11$QwJLAjHFxcHr5Zh1OLdMzeqbOVRpf7Slwtsa7.3iQ7VlGa.G3cOzm
20	Glauco	ema321312il@teste.com	$2b$11$oaeb7LPb8pObPeVwn8i3LuwmtVtpR3hm7lZWgnZnnjfI7Kbm/oSPy
21	Glauco	e5151mail@teste.com	$2b$11$YgUZ0IRIxJmCNSHeoOi8zeUAcry02wJpUdrZJ/qpjU1IsXE7OIGKC
22	atatata	emailtata@teste.com	$2b$11$ac2eduHY3TR1N2UcK04Re.UotgMULQZkfqc3JAes4HCrTGMZvCWBK
23	Glauco Abilio Rocha Villas Boas	emailglauco@teste.com	$2b$11$Ufs22gx5rSaVXcylMhbRNe9MT1X9wkqzgoGDbNpWngpeRSI23W/Yy
24	Glauco Teste Adata Testa Villas Boas	emailtesti@teste.com	$2b$11$/Cfg5Ch535MOEftBYXNS6uKk1HHvnHnJZmE84mfP76c563kk4EL6S
25	Glauco123123123123	email1@teste.com	$2b$11$IHz42vUEF2MZhs2oOa8ZxedfLD7YoLAYgSDjDvCLl9lFqKePavjDu
26	Glauco123456789123456789	email2@teste.com	$2b$11$NqfIhnYStZg8/six6YFTQejl2IRDHMY8zJp24L0jKUrXdCklmt026
\.


--
-- Name: cashflow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cashflow_id_seq', 26, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 26, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

