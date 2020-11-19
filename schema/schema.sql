create sequence users_id_seq
	as integer
	maxvalue 2147483647;
create table users
(
	id integer default nextval('users_id_seq'::regclass) not null
		constraint users_pkey
			primary key,
	firstname varchar(200) not null,
	lastname varchar(200) not null,
	email varchar(200) not null,
	username varchar(200) not null,
	password char(128) not null,
	timestamp timestamp(6) with time zone default now() not null,
)
;
