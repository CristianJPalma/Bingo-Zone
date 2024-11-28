PGDMP  #                
    |         	   bingozone    16.4    16.4 )    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397 	   bingozone    DATABASE        CREATE DATABASE bingozone WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE bingozone;
                postgres    false            �            1259    24813    cartones    TABLE       CREATE TABLE public.cartones (
    id_carton integer NOT NULL,
    id_partida integer,
    id_usuario integer,
    numero_carton smallint,
    numeros jsonb,
    CONSTRAINT cartones_numero_carton_check CHECK (((numero_carton >= 1) AND (numero_carton <= 3)))
);
    DROP TABLE public.cartones;
       public         heap    postgres    false            �            1259    24812    cartones_id_carton_seq    SEQUENCE     �   CREATE SEQUENCE public.cartones_id_carton_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cartones_id_carton_seq;
       public          postgres    false    222            �           0    0    cartones_id_carton_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cartones_id_carton_seq OWNED BY public.cartones.id_carton;
          public          postgres    false    221            �            1259    16431    partida    TABLE     D  CREATE TABLE public.partida (
    id_partida integer NOT NULL,
    codigo_partida character(6) NOT NULL,
    id_creador integer,
    numero_balotas integer DEFAULT 75,
    modo_juego character varying(50) DEFAULT 'completo'::character varying,
    numero_cartones integer DEFAULT 1,
    redirigir integer DEFAULT 0,
    tiempo_inicio timestamp without time zone,
    numeros_generados json,
    CONSTRAINT partida_numero_balotas_check CHECK ((numero_balotas = ANY (ARRAY[75, 90]))),
    CONSTRAINT partida_numero_cartones_check CHECK ((numero_cartones = ANY (ARRAY[1, 2, 3])))
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
    coins integer DEFAULT 0,
    estilo_carton character varying(50) DEFAULT 'normal'::character varying
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
          public          postgres    false    219            4           2604    24816    cartones id_carton    DEFAULT     x   ALTER TABLE ONLY public.cartones ALTER COLUMN id_carton SET DEFAULT nextval('public.cartones_id_carton_seq'::regclass);
 A   ALTER TABLE public.cartones ALTER COLUMN id_carton DROP DEFAULT;
       public          postgres    false    222    221    222            -           2604    16434    partida id_partida    DEFAULT     x   ALTER TABLE ONLY public.partida ALTER COLUMN id_partida SET DEFAULT nextval('public.partida_id_partida_seq'::regclass);
 A   ALTER TABLE public.partida ALTER COLUMN id_partida DROP DEFAULT;
       public          postgres    false    217    218    218            )           2604    16422 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            2           2604    16448 $   usuarios_partidas id_usuario_partida    DEFAULT     �   ALTER TABLE ONLY public.usuarios_partidas ALTER COLUMN id_usuario_partida SET DEFAULT nextval('public.usuarios_partidas_id_usuario_partida_seq'::regclass);
 S   ALTER TABLE public.usuarios_partidas ALTER COLUMN id_usuario_partida DROP DEFAULT;
       public          postgres    false    219    220    220            �          0    24813    cartones 
   TABLE DATA           ]   COPY public.cartones (id_carton, id_partida, id_usuario, numero_carton, numeros) FROM stdin;
    public          postgres    false    222   #6       �          0    16431    partida 
   TABLE DATA           �   COPY public.partida (id_partida, codigo_partida, id_creador, numero_balotas, modo_juego, numero_cartones, redirigir, tiempo_inicio, numeros_generados) FROM stdin;
    public          postgres    false    218   �7       �          0    16419    usuario 
   TABLE DATA           �   COPY public.usuario (id, nombre, apellido, nombre_pantalla, correo, contrasena, imagen_perfil, coins, estilo_carton) FROM stdin;
    public          postgres    false    216   �9       �          0    16445    usuarios_partidas 
   TABLE DATA           p   COPY public.usuarios_partidas (id_usuario_partida, id_usuario, id_partida, posicion, coins_ganados) FROM stdin;
    public          postgres    false    220   �:       �           0    0    cartones_id_carton_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.cartones_id_carton_seq', 190, true);
          public          postgres    false    221            �           0    0    partida_id_partida_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.partida_id_partida_seq', 121, true);
          public          postgres    false    217            �           0    0    usuario_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.usuario_id_seq', 2, true);
          public          postgres    false    215            �           0    0 (   usuarios_partidas_id_usuario_partida_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.usuarios_partidas_id_usuario_partida_seq', 48, true);
          public          postgres    false    219            E           2606    24823 9   cartones cartones_id_partida_id_usuario_numero_carton_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.cartones
    ADD CONSTRAINT cartones_id_partida_id_usuario_numero_carton_key UNIQUE (id_partida, id_usuario, numero_carton);
 c   ALTER TABLE ONLY public.cartones DROP CONSTRAINT cartones_id_partida_id_usuario_numero_carton_key;
       public            postgres    false    222    222    222            G           2606    24821    cartones cartones_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.cartones
    ADD CONSTRAINT cartones_pkey PRIMARY KEY (id_carton);
 @   ALTER TABLE ONLY public.cartones DROP CONSTRAINT cartones_pkey;
       public            postgres    false    222            =           2606    16438 "   partida partida_codigo_partida_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.partida
    ADD CONSTRAINT partida_codigo_partida_key UNIQUE (codigo_partida);
 L   ALTER TABLE ONLY public.partida DROP CONSTRAINT partida_codigo_partida_key;
       public            postgres    false    218            ?           2606    16436    partida partida_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.partida
    ADD CONSTRAINT partida_pkey PRIMARY KEY (id_partida);
 >   ALTER TABLE ONLY public.partida DROP CONSTRAINT partida_pkey;
       public            postgres    false    218            9           2606    16427    usuario usuario_correo_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correo_key UNIQUE (correo);
 D   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_correo_key;
       public            postgres    false    216            ;           2606    16425    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    216            A           2606    16453 =   usuarios_partidas usuarios_partidas_id_usuario_id_partida_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.usuarios_partidas
    ADD CONSTRAINT usuarios_partidas_id_usuario_id_partida_key UNIQUE (id_usuario, id_partida);
 g   ALTER TABLE ONLY public.usuarios_partidas DROP CONSTRAINT usuarios_partidas_id_usuario_id_partida_key;
       public            postgres    false    220    220            C           2606    16451 (   usuarios_partidas usuarios_partidas_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.usuarios_partidas
    ADD CONSTRAINT usuarios_partidas_pkey PRIMARY KEY (id_usuario_partida);
 R   ALTER TABLE ONLY public.usuarios_partidas DROP CONSTRAINT usuarios_partidas_pkey;
       public            postgres    false    220            K           2606    24824 !   cartones cartones_id_partida_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cartones
    ADD CONSTRAINT cartones_id_partida_fkey FOREIGN KEY (id_partida) REFERENCES public.partida(id_partida) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.cartones DROP CONSTRAINT cartones_id_partida_fkey;
       public          postgres    false    222    218    4671            L           2606    24829 !   cartones cartones_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cartones
    ADD CONSTRAINT cartones_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.cartones DROP CONSTRAINT cartones_id_usuario_fkey;
       public          postgres    false    222    216    4667            H           2606    16439    partida partida_id_creador_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.partida
    ADD CONSTRAINT partida_id_creador_fkey FOREIGN KEY (id_creador) REFERENCES public.usuario(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.partida DROP CONSTRAINT partida_id_creador_fkey;
       public          postgres    false    218    4667    216            I           2606    16459 3   usuarios_partidas usuarios_partidas_id_partida_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuarios_partidas
    ADD CONSTRAINT usuarios_partidas_id_partida_fkey FOREIGN KEY (id_partida) REFERENCES public.partida(id_partida) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.usuarios_partidas DROP CONSTRAINT usuarios_partidas_id_partida_fkey;
       public          postgres    false    218    220    4671            J           2606    16454 3   usuarios_partidas usuarios_partidas_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuarios_partidas
    ADD CONSTRAINT usuarios_partidas_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.usuarios_partidas DROP CONSTRAINT usuarios_partidas_id_usuario_fkey;
       public          postgres    false    220    216    4667            �   �  x�m�Kn�@D�3����y���}��'	r�T��n	fIM����Ty�C����\ߖ_"�"�K����-�;Ŷ�붔�-u���`H�2a�x��O�5�-�
��C�Y�*�����8��a
�B]�,~`y;Yl���F\<C,.��d9�3X*ȫ%GC�f`��H���",�<� �x�؎�
�� 2&`�*Y}m��`��$B��Ou��I`�<��$�'I*�V&���$k|��Uү��w� *X.�Dt�e�#�:���Q	"�tPI?���$
���D�{E-��.H{�Ha�D����:�@�'�ɳ�A��Ȳ��Q@ɽ�i���^��l��Zh��n�{�z{��U�#���9d��6�:�(�����Xv��}z�*qrk � �4�'���.�р �0��B������t��*��)y��.����|����[      �   �  x�U�;n1��x�:@�`w��ث�
C��r���s)Zpv����~�X��k�����ۏ�Yx��l�l멵{�{��b�����k6u�P�L�"��4��i�7咱J�´���]c)����b�ٰ�L9�4u��{v]��YS3d<��n]��S�5��m�:)�b*x�=�̕dN/���6su��כ�]�}x��`��8x�G�^���G�(8��T�~|�ujјZ'#��0�j#�A����W@B(I��3M����dVq�c�4�Q<0@�?y���Q�AaYc�I�������T��������ۿ�/W����ƽ��RQ��	�ґ��I���G�8d�Kk�AtD� �ч�h�ӡU�9��:�\^t4܇���(c����]���kUv��?j��Y��s3��>���˹a�a[F\B��#dѫ�n]���say����n������      �   �   x�m�Mo�0 ��������l!,�QCv�J�J������Ec2�<o���'���0� zW�<�5��.{I�@TK�E/<��j3�Ӣ:=We})�K�G�L�V]v�����f�^��(�S��|.{�Sb�O��&ǐQ=�ғ$F�1����m�W<6��8������~[����ۺşٱZ���1�+�6j����e�^0铆B���`J      �   (   x�3�4�4���4�26�M!<������ ��     