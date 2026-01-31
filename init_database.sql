-- Script di inizializzazione database per GPS Calculator
-- Esegui questo script nel database MySQL di Railway

-- Tabella utenti (per autenticazione OAuth)
CREATE TABLE IF NOT EXISTS `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);

-- Tabella lead GPS (raccolta dati utenti che usano il calcolatore)
CREATE TABLE IF NOT EXISTS `gps_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`cellulare` varchar(20) NOT NULL,
	`classe_concorso` varchar(50) NOT NULL,
	`voto_diploma` int,
	`lode_diploma` int DEFAULT 0,
	`voto_laurea` int,
	`lode` int DEFAULT 0,
	`num_c2` int NOT NULL DEFAULT 0,
	`num_clil` int NOT NULL DEFAULT 0,
	`num_biannale` int NOT NULL DEFAULT 0,
	`certificazioni_informatiche` int NOT NULL DEFAULT 0,
	`punteggio_laurea` decimal(5,2) NOT NULL,
	`punteggio_titoli` decimal(5,2) NOT NULL,
	`punteggio_totale` decimal(5,2) NOT NULL,
	`privacy_consent` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`ip_address` varchar(45),
	`user_agent` text,
	CONSTRAINT `gps_leads_id` PRIMARY KEY(`id`)
);

-- Tabella corsi eCampus
CREATE TABLE IF NOT EXISTS `corsi_ecampus` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titolo` varchar(255) NOT NULL,
	`categoria` enum('Percorsi Abilitanti','Certificazioni Linguistiche','Metodologie Didattiche','Certificazioni Informatiche','Master') NOT NULL,
	`livello` varchar(50),
	`descrizione` text NOT NULL,
	`durata` varchar(100),
	`crediti` varchar(50),
	`punteggio_gps` varchar(50),
	`costo` varchar(100),
	`costo_promo` varchar(100),
	`modalita` varchar(100),
	`requisiti` text,
	`attivo` int NOT NULL DEFAULT 1,
	`ordine` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `corsi_ecampus_id` PRIMARY KEY(`id`)
);

-- Tabella richieste info corsi
CREATE TABLE IF NOT EXISTS `richieste_info_corsi` (
	`id` int AUTO_INCREMENT NOT NULL,
	`corso_id` int NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`telefono` varchar(20) NOT NULL,
	`messaggio` text,
	`stato` enum('nuova','contattato','interessato','iscritto','non_interessato') NOT NULL DEFAULT 'nuova',
	`note` text,
	`privacy_consent` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`ip_address` varchar(45),
	`user_agent` text,
	CONSTRAINT `richieste_info_corsi_id` PRIMARY KEY(`id`)
);

-- Tabella per tracciare le migrazioni Drizzle
CREATE TABLE IF NOT EXISTS `__drizzle_migrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`hash` varchar(255) NOT NULL,
	`created_at` bigint,
	CONSTRAINT `__drizzle_migrations_id` PRIMARY KEY(`id`)
);
