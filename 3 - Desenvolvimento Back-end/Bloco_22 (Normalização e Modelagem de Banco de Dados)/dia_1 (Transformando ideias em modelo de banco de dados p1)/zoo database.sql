CREATE DATABASE IF NOT EXISTS zoo;

USE zoo;

CREATE TABLE animais (
	animal_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(100) NOT NULL,
    sexo VARCHAR(50) NOT NULL,
	idade INT NOT NULL,
	localizacao VARCHAR(150) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE gerentes(
	gerente_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE cuidadores (
	cuidador_id INT PRIMARY KEY AUTO_INCREMENT,
    gerente_id INT NOT NULL,
    nome VARCHAR(200),
    FOREIGN KEY (gerente_id) REFERENCES gerentes(gerente_id)
) ENGINE=InnoDB;

CREATE TABLE animais_cuidadores (
	CONSTRAINT PRIMARY KEY (animal_id, cuidador_id),
    cuidador_id INT NOT NULL,
    animal_id INT NOT NULL,
    FOREIGN KEY (animal_id) REFERENCES animais(animal_id),
    FOREIGN KEY (cuidador_id) REFERENCES cuidadores(cuidador_id)
) ENGINE=InnoDB;
