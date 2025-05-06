create database db_controle_musicas_aa;

use db_controle_musicas_aa;

create table tbl_musica(
id 			             int not null primary key auto_increment,
nome 		             varchar(100) not null,
duracao 				 time not null ,
data_lancamento			 date not null, 
letra                    text , 
link                     varchar(200)


);



create table tbl_genero(
id 			             int not null primary key auto_increment,
nome 		             varchar(100) not null



);

create table tbl_gravadora(
id 			             int not null primary key auto_increment,
nome 		             varchar(100) not null,
email                    varchar(100) not null



);
create table tbl_usuario(
id                      int not null primary key auto_increment,
nome                    varchar(100) not null,
email                   varchar(100) not null 


);
create table tbl_artista(
id 						int not null primary key auto_increment,
nome                     varchar(100) not null, 
id_nacionalidade         int not null,

constraint FK_NACIONALIDADE_ARTISTA
foreign key (id_nacionalidade)
references (tbl_nacionalidade) 

);
create table tbl_nacionalidade(
id      int not null primary key auto_increment,
nome    varchar(100) not null
);



show tables ;



