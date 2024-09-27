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
-- Name: user_passwords; Type: TABLE; Schema: public; Owner: juliana
--

CREATE TABLE public.user_passwords (
    password_id integer NOT NULL,
    user_id integer,
    password_hash character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_passwords OWNER TO juliana;

--
-- Name: user_passwords_password_id_seq; Type: SEQUENCE; Schema: public; Owner: juliana
--

CREATE SEQUENCE public.user_passwords_password_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_passwords_password_id_seq OWNER TO juliana;

--
-- Name: user_passwords_password_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: juliana
--

ALTER SEQUENCE public.user_passwords_password_id_seq OWNED BY public.user_passwords.password_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: juliana
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(100) NOT NULL,
    favorite_city character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO juliana;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: juliana
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO juliana;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: juliana
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: user_passwords password_id; Type: DEFAULT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.user_passwords ALTER COLUMN password_id SET DEFAULT nextval('public.user_passwords_password_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: user_passwords; Type: TABLE DATA; Schema: public; Owner: juliana
--

COPY public.user_passwords (password_id, user_id, password_hash, created_at) FROM stdin;
1	1	meeshie3	2024-09-23 11:34:22.12512
2	2	juliana1	2024-09-23 11:35:11.454663
3	3	dogsdrool10	2024-09-23 11:35:44.475862
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: juliana
--

COPY public.users (user_id, username, favorite_city) FROM stdin;
3	ilia	napa
1	misha	dillon beach
2	jules	malibu
\.


--
-- Name: user_passwords_password_id_seq; Type: SEQUENCE SET; Schema: public; Owner: juliana
--

SELECT pg_catalog.setval('public.user_passwords_password_id_seq', 3, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: juliana
--

SELECT pg_catalog.setval('public.users_user_id_seq', 4, true);


--
-- Name: user_passwords user_passwords_pkey; Type: CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.user_passwords
    ADD CONSTRAINT user_passwords_pkey PRIMARY KEY (password_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: user_passwords user_passwords_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.user_passwords
    ADD CONSTRAINT user_passwords_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

