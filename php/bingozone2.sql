PGDMP      
            
    |         	   bingozone    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397 	   bingozone    DATABASE        CREATE DATABASE bingozone WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE bingozone;
                postgres    false            �            1259    16431    partida    TABLE     �   CREATE TABLE public.partida (
    id_partida integer NOT NULL,
    codigo_partida character(6) NOT NULL,
    id_creador integer
);
    DROP TABLE public.partida;
       public         heap    postgres    false            �            1259    16430    partida_id_partida_seq    SEQUENCE     �   CREATE SEQUENCE public.partida_id_partida_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.partida_id_partida_seq;
       public          postgres    false    218            �           0    0    partida_id_partida_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.partida_id_partida_seq OWNED BY public.partida.id_partida;
          public          postgres    false    217            �            1259    16419    usuario    TABLE     �  CREATE TABLE public.usuario (
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
          public          postgres    false    215            �            1259    16445    usuarios_partidas    TABLE     �   CREATE TABLE public.usuarios_partidas (
    id_usuario_partida integer NOT NULL,
    id_usuario integer,
    id_partida integer,
    posicion integer,
    coins_ganados integer DEFAULT 0
);
 %   DROP TABLE public.usuarios_partidas;
       public         heap    postgres    false            �            1259    16444 (   usuarios_partidas_id_usuario_partida_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_partidas_id_usuario_partida_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.usuarios_partidas_id_usuario_partida_seq;
       public          postgres    false    220            �           0    0 (   usuarios_partidas_id_usuario_partida_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.usuarios_partidas_id_usuario_partida_seq OWNED BY public.usuarios_partidas.id_usuario_partida;
          public          postgres    false    219            '           2604    16434    partida id_partida    DEFAULT     x   ALTER TABLE ONLY public.partida ALTER COLUMN id_partida SET DEFAULT nextval('public.partida_id_partida_seq'::regclass);
 A   ALTER TABLE public.partida ALTER COLUMN id_partida DROP DEFAULT;
       public          postgres    false    218    217    218            $           2604    16422 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            (           2604    16448 $   usuarios_partidas id_usuario_partida    DEFAULT     �   ALTER TABLE ONLY public.usuarios_partidas ALTER COLUMN id_usuario_partida SET DEFAULT nextval('public.usuarios_partidas_id_usuario_partida_seq'::regclass);
 S   ALTER TABLE public.usuarios_partidas ALTER COLUMN id_usuario_partida DROP DEFAULT;
       public          postgres    false    220    219    220            �          0    16431    partida 
   TABLE DATA           I   COPY public.partida (id_partida, codigo_partida, id_creador) FROM stdin;
    public          postgres    false    218   V&       �          0    16419    usuario 
   TABLE DATA           r   COPY public.usuario (id, nombre, apellido, nombre_pantalla, correo, contrasena, imagen_perfil, coins) FROM stdin;
    public          postgres    false    216   �&       �          0    16445    usuarios_partidas 
   TABLE DATA           p   COPY public.usuarios_partidas (id_usuario_partida, id_usuario, id_partida, posicion, coins_ganados) FROM stdin;
    public          postgres    false    220   �'       �           0    0    partida_id_partida_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.partida_id_partida_seq', 28, true);
          public          postgres    false    217            �           0    0    usuario_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.usuario_id_seq', 4, true);
          public          postgres    false    215            �           0    0 (   usuarios_partidas_id_usuario_partida_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.usuarios_partidas_id_usuario_partida_seq', 43, true);
          public          postgres    false    219            /           2606    16438 "   partida partida_codigo_partida_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.partida
    ADD CONSTRAINT partida_codigo_partida_key UNIQUE (codigo_partida);
 L   ALTER TABLE ONLY public.partida DROP CONSTRAINT partida_codigo_partida_key;
       public            postgres    false    218            1           2606    16436    partida partida_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.partida
    ADD CONSTRAINT partida_pkey PRIMARY KEY (id_partida);
 >   ALTER TABLE ONLY public.partida DROP CONSTRAINT partida_pkey;
       public            postgres    false    218            +           2606    16427    usuario usuario_correo_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correo_key UNIQUE (correo);
 D   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_correo_key;
       public            postgres    false    216            -           2606    16425    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    216            3           2606    16453 =   usuarios_partidas usuarios_partidas_id_usuario_id_partida_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.usuarios_partidas
    ADD CONSTRAINT usuarios_partidas_id_usuario_id_partida_key UNIQUE (id_usuario, id_partida);
 g   ALTER TABLE ONLY public.usuarios_partidas DROP CONSTRAINT usuarios_partidas_id_usuario_id_partida_key;
       public            postgres    false    220    220            5           2606    16451 (   usuarios_partidas usuarios_partidas_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.usuarios_partidas
    ADD CONSTRAINT usuarios_partidas_pkey PRIMARY KEY (id_usuario_partida);
 R   ALTER TABLE ONLY public.usuarios_partidas DROP CONSTRAINT usuarios_partidas_pkey;
       public            postgres    false    220            6           2606    16439    partida partida_id_creador_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.partida
    ADD CONSTRAINT partida_id_creador_fkey FOREIGN KEY (id_creador) REFERENCES public.usuario(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.partida DROP CONSTRAINT partida_id_creador_fkey;
       public          postgres    false    216    4653    218            7           2606    16459 3   usuarios_partidas usuarios_partidas_id_partida_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuarios_partidas
    ADD CONSTRAINT usuarios_partidas_id_partida_fkey FOREIGN KEY (id_partida) REFERENCES public.partida(id_partida) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.usuarios_partidas DROP CONSTRAINT usuarios_partidas_id_partida_fkey;
       public          postgres    false    220    218    4657            8           2606    16454 3   usuarios_partidas usuarios_partidas_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuarios_partidas
    ADD CONSTRAINT usuarios_partidas_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.usuarios_partidas DROP CONSTRAINT usuarios_partidas_id_usuario_fkey;
       public          postgres    false    216    4653    220            �   #   x�3��07324�4�22�4547�0�c���� I�      �   H  x���Ko�@����p[h�IP��PDL7�0� /y(���&5Ml7'��]�/����r�Fi� �!k���eT2�q����$�w��JΗ��n�M׵�x�^f
EUٌ��;]D�i�����E��QIY��mE_�9̊� �T9�re�E$�>�<zt��@5��D�+Û�~$Z�՗q$��D��3/�/^��������R7?!���qcG�k)�����?�W	�exwg�&�d���4�	��rȈM��.=}ȯ<����XŚx�n��j�i#bn���M�S����j2�p���k6v�90����!�2<�q�̱�      �   !   x�36�4�4����4�2� r�L!�=... N��     