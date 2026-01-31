ALTER TABLE `gps_leads` MODIFY COLUMN `voto_laurea` int;--> statement-breakpoint
ALTER TABLE `gps_leads` MODIFY COLUMN `lode` int;--> statement-breakpoint
ALTER TABLE `gps_leads` ADD `voto_diploma` int;--> statement-breakpoint
ALTER TABLE `gps_leads` ADD `lode_diploma` int DEFAULT 0;