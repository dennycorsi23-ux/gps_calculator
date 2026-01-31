CREATE TABLE `corsi_ecampus` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titolo` varchar(255) NOT NULL,
	`categoria` enum('certificazione_linguistica','clil','certificazione_informatica','master','cfu_abilitanti') NOT NULL,
	`livello` varchar(50),
	`descrizione` text NOT NULL,
	`durata` varchar(100),
	`crediti` varchar(50),
	`punteggio_gps` varchar(50),
	`costo` decimal(8,2),
	`costo_promo` decimal(8,2),
	`modalita` varchar(100),
	`requisiti` text,
	`attivo` int NOT NULL DEFAULT 1,
	`ordine` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `corsi_ecampus_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `richieste_info_corsi` (
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
