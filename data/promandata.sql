--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: board_columns; Type: TABLE; Schema: public; Owner: hackmaster
--

CREATE TABLE public.board_columns (
    board_id integer NOT NULL,
    column_name character varying(255)
);


ALTER TABLE public.board_columns OWNER TO hackmaster;

--
-- Name: boards; Type: TABLE; Schema: public; Owner: hackmaster
--

CREATE TABLE public.boards (
    id integer NOT NULL,
    user_id integer NOT NULL,
    private integer DEFAULT 0 NOT NULL,
    title character varying(255)
);


ALTER TABLE public.boards OWNER TO hackmaster;

--
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: hackmaster
--

CREATE SEQUENCE public.boards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.boards_id_seq OWNER TO hackmaster;

--
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackmaster
--

ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;


--
-- Name: cards; Type: TABLE; Schema: public; Owner: hackmaster
--

CREATE TABLE public.cards (
    id integer NOT NULL,
    board_id integer NOT NULL,
    title character varying(255),
    column_name character varying(255) NOT NULL
);


ALTER TABLE public.cards OWNER TO hackmaster;

--
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: hackmaster
--

CREATE SEQUENCE public.cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cards_id_seq OWNER TO hackmaster;

--
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackmaster
--

ALTER SEQUENCE public.cards_id_seq OWNED BY public.cards.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: hackmaster
--

CREATE TABLE public.users (
    id integer NOT NULL,
    user_name character varying(255) NOT NULL,
    hashed_pw character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO hackmaster;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: hackmaster
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO hackmaster;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackmaster
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: boards id; Type: DEFAULT; Schema: public; Owner: hackmaster
--

ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);


--
-- Name: cards id; Type: DEFAULT; Schema: public; Owner: hackmaster
--

ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public.cards_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: hackmaster
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: board_columns; Type: TABLE DATA; Schema: public; Owner: hackmaster
--

COPY public.board_columns (board_id, column_name) FROM stdin;
\.


--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: hackmaster
--

COPY public.boards (id, user_id, private, title) FROM stdin;
\.


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: hackmaster
--

COPY public.cards (id, board_id, title, column_name) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: hackmaster
--

COPY public.users (id, user_name, hashed_pw) FROM stdin;
\.


--
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackmaster
--

SELECT pg_catalog.setval('public.boards_id_seq', 1, false);


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackmaster
--

SELECT pg_catalog.setval('public.cards_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackmaster
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: hackmaster
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: hackmaster
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: hackmaster
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: boards_id_uindex; Type: INDEX; Schema: public; Owner: hackmaster
--

CREATE UNIQUE INDEX boards_id_uindex ON public.boards USING btree (id);


--
-- Name: cards_id_uindex; Type: INDEX; Schema: public; Owner: hackmaster
--

CREATE UNIQUE INDEX cards_id_uindex ON public.cards USING btree (id);


--
-- Name: users_id_uindex; Type: INDEX; Schema: public; Owner: hackmaster
--

CREATE UNIQUE INDEX users_id_uindex ON public.users USING btree (id);


--
-- Name: users_user_name_uindex; Type: INDEX; Schema: public; Owner: hackmaster
--

CREATE UNIQUE INDEX users_user_name_uindex ON public.users USING btree (user_name);


--
-- Name: board_columns board_columns_boards_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: hackmaster
--

ALTER TABLE ONLY public.board_columns
    ADD CONSTRAINT board_columns_boards_id_fk FOREIGN KEY (board_id) REFERENCES public.boards(id);


--
-- Name: boards boards_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: hackmaster
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: cards cards_boards_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: hackmaster
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_boards_id_fk FOREIGN KEY (board_id) REFERENCES public.boards(id);


--
-- PostgreSQL database dump complete
--

