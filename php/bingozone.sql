PGDMP       *            
    |         	   bingozone    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397 	   bingozone    DATABASE        CREATE DATABASE bingozone WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE bingozone;
                postgres    false            �            1259    16419    usuario    TABLE     �  CREATE TABLE public.usuario (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    apellido character varying(50) NOT NULL,
    nombre_pantalla character varying(20) NOT NULL,
    correo character varying(50) NOT NULL,
    contrasena character varying(150) NOT NULL,
    imagen_perfil character varying(150) DEFAULT '../imgs/capi/capi-furia.png'::character varying,
    coins integer DEFAULT 0
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    16418    usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    216            �           0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    215                       2604    16422 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    16419    usuario 
   TABLE DATA           r   COPY public.usuario (id, nombre, apellido, nombre_pantalla, correo, contrasena, imagen_perfil, coins) FROM stdin;
    public          postgres    false    216          �           0    0    usuario_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.usuario_id_seq', 1, true);
          public          postgres    false    215                       2606    16427    usuario usuario_correo_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correo_key UNIQUE (correo);
 D   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_correo_key;
       public            postgres    false    216                        2606    16425    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    216            �   �   x�3�t.�,.�L��H��M�Lr,��C�����˩bT�bh��j薖l��hP�VPQ�_R����_�c�������⟜�e�n����a�Ω�����^���X�	&t�JS�JR�
��9�b���� �'.q     