--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

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
-- Name: individuals; Type: TABLE; Schema: public; Owner: juliana
--

CREATE TABLE public.individuals (
    id integer NOT NULL,
    nickname character varying(100) NOT NULL,
    species_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.individuals OWNER TO juliana;

--
-- Name: individuals_id_seq; Type: SEQUENCE; Schema: public; Owner: juliana
--

CREATE SEQUENCE public.individuals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.individuals_id_seq OWNER TO juliana;

--
-- Name: individuals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: juliana
--

ALTER SEQUENCE public.individuals_id_seq OWNED BY public.individuals.id;


--
-- Name: sightings; Type: TABLE; Schema: public; Owner: juliana
--

CREATE TABLE public.sightings (
    id integer NOT NULL,
    sighting_time timestamp without time zone NOT NULL,
    individual_id integer,
    location text NOT NULL,
    healthy boolean NOT NULL,
    sighter_email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sightings OWNER TO juliana;

--
-- Name: sightings_id_seq; Type: SEQUENCE; Schema: public; Owner: juliana
--

CREATE SEQUENCE public.sightings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sightings_id_seq OWNER TO juliana;

--
-- Name: sightings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: juliana
--

ALTER SEQUENCE public.sightings_id_seq OWNED BY public.sightings.id;


--
-- Name: species; Type: TABLE; Schema: public; Owner: juliana
--

CREATE TABLE public.species (
    id integer NOT NULL,
    common_name character varying(100) NOT NULL,
    scientific_name character varying(100) NOT NULL,
    estimated_population integer NOT NULL,
    conservation_status character varying(10) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.species OWNER TO juliana;

--
-- Name: species_id_seq; Type: SEQUENCE; Schema: public; Owner: juliana
--

CREATE SEQUENCE public.species_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.species_id_seq OWNER TO juliana;

--
-- Name: species_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: juliana
--

ALTER SEQUENCE public.species_id_seq OWNED BY public.species.id;


--
-- Name: individuals id; Type: DEFAULT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.individuals ALTER COLUMN id SET DEFAULT nextval('public.individuals_id_seq'::regclass);


--
-- Name: sightings id; Type: DEFAULT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.sightings ALTER COLUMN id SET DEFAULT nextval('public.sightings_id_seq'::regclass);


--
-- Name: species id; Type: DEFAULT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.species ALTER COLUMN id SET DEFAULT nextval('public.species_id_seq'::regclass);


--
-- Data for Name: individuals; Type: TABLE DATA; Schema: public; Owner: juliana
--

COPY public.individuals (id, nickname, species_id, created_at) FROM stdin;
1	Prickly Petunia	1	2024-09-15 13:41:15.335853
2	Tiny Tusk	2	2024-09-16 09:49:00.303289
3	Sleepy Snacker	3	2024-09-16 09:53:49.162578
4	Polar Puff	4	2024-09-16 14:24:32.95823
5	Majestic Mews	1	2024-09-16 14:33:12.820491
\.


--
-- Data for Name: sightings; Type: TABLE DATA; Schema: public; Owner: juliana
--

COPY public.sightings (id, sighting_time, individual_id, location, healthy, sighter_email, created_at) FROM stdin;
1	2024-09-01 10:30:00	1	Yellowstone North Gate	t	scientist@example.com	2024-09-15 13:41:15.336872
2	2024-09-05 14:00:00	1	Serengeti National Park	t	researcher1@example.com	2024-09-16 09:56:19.834764
3	2024-09-07 09:15:00	2	Ngorongoro Crater	t	researcher2@example.com	2024-09-16 11:16:15.742624
4	2024-09-09 16:45:00	3	Chengdu Research Base, China	t	scientist2@example.com	2024-09-16 11:16:29.418522
5	2024-09-10 18:30:00	3	Qinling Mountains, China	t	conservationist@example.com	2024-09-16 11:17:23.148609
7	2024-08-10 18:30:00	4	Ice Caps	t	scientist2@example.com	2024-09-16 14:24:41.919757
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: juliana
--

COPY public.species (id, common_name, scientific_name, estimated_population, conservation_status, created_at) FROM stdin;
1	Tiger	Panthera tigris	3000	EN	2024-09-15 13:41:15.333026
2	Elephant	Loxodonta africana	415000	VU	2024-09-16 09:44:36.990727
3	Giant Panda	Ailuropoda melanoleuca	1864	VU	2024-09-16 09:45:05.682815
4	Polar Bear	Ursus maritimus	26000	VU	2024-09-16 14:09:07.884598
\.


--
-- Name: individuals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: juliana
--

SELECT pg_catalog.setval('public.individuals_id_seq', 6, true);


--
-- Name: sightings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: juliana
--

SELECT pg_catalog.setval('public.sightings_id_seq', 7, true);


--
-- Name: species_id_seq; Type: SEQUENCE SET; Schema: public; Owner: juliana
--

SELECT pg_catalog.setval('public.species_id_seq', 5, true);


--
-- Name: individuals individuals_pkey; Type: CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_pkey PRIMARY KEY (id);


--
-- Name: sightings sightings_pkey; Type: CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_pkey PRIMARY KEY (id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- Name: individuals individuals_species_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_species_id_fkey FOREIGN KEY (species_id) REFERENCES public.species(id);


--
-- Name: sightings sightings_individual_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.individuals(id);


--
-- PostgreSQL database dump complete
--

