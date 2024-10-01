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
-- Name: games; Type: TABLE; Schema: public; Owner: juliana
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    title character varying(250) NOT NULL,
    genre character varying(100),
    release_date date,
    developer character varying(250),
    platform character varying(250),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.games OWNER TO juliana;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: juliana
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_game_id_seq OWNER TO juliana;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: juliana
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: juliana
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    game_id integer,
    reviewer_name character varying(255) NOT NULL,
    rating integer,
    review_text text,
    review_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 10)))
);


ALTER TABLE public.reviews OWNER TO juliana;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: juliana
--

CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_review_id_seq OWNER TO juliana;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: juliana
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: juliana
--

COPY public.games (game_id, title, genre, release_date, developer, platform, created_at) FROM stdin;
3	The Legend of Zelda: Ocarina of Time	Action-Adventure	1998-11-21	Nintendo	Nintendo 64	2024-09-29 14:24:23.985938
4	The Legend of Zelda: Breath of the Wild	Action-Adventure	2017-03-03	Nintendo	Nintendo Switch, Wii U	2024-09-29 14:24:23.985938
1	The Legend of Zelda: Windwaker	Action-Adventure	2002-12-13	Nintendo	GameCube	2024-09-29 14:24:23.985938
2	The Legend of Zelda: Twilight Princess	Action-Adventure	2006-11-19	Nintendo	GameCube, Wii	2024-09-29 14:24:23.985938
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: juliana
--

COPY public.reviews (review_id, game_id, reviewer_name, rating, review_text, review_date) FROM stdin;
1	1	John Doe	9	A timeless classic with a unique art style and great storytelling.	2024-09-29 14:25:11.96658
2	2	Jane Smith	8	Twilight Princess brings a darker tone to the Zelda franchise, with solid gameplay and challenging puzzles.	2024-09-29 14:25:11.96658
4	4	Emily Davis	10	Breath of the Wild reinvents the Zelda series with an open-world design, freedom of exploration, and breathtaking visuals.	2024-09-29 14:25:11.96658
3	3	Alex Smith	10	Ocarina of Time is a masterpiece and one of the greatest games ever made.	2024-10-01 08:12:55.780532
\.


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: juliana
--

SELECT pg_catalog.setval('public.games_game_id_seq', 4, true);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: juliana
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 27, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- Name: reviews reviews_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(game_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

