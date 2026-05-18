CREATE TABLE `activity_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`child_id` int NOT NULL,
	`activity_type_id` int NOT NULL,
	`started_at` timestamp NOT NULL DEFAULT (now()),
	`completed_at` timestamp,
	`duration_seconds` int,
	`correct_answers` int,
	`total_questions` int,
	`status` enum('in_progress','completed','abandoned') NOT NULL DEFAULT 'in_progress',
	CONSTRAINT `activity_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `activity_types` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`display_name` varchar(128) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activity_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `child_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`parent_id` int NOT NULL,
	`name` varchar(128) NOT NULL,
	`age` int,
	`font_size_preference` varchar(32) NOT NULL DEFAULT 'medium',
	`color_theme` varchar(32) NOT NULL DEFAULT 'calm',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `child_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `daily_schedule_tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`child_id` int NOT NULL,
	`title` varchar(128) NOT NULL,
	`description` text,
	`order` int NOT NULL,
	`icon` varchar(64),
	`completed_today` boolean DEFAULT false,
	`completed_at` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `daily_schedule_tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rewards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`child_id` int NOT NULL,
	`activity_session_id` int,
	`stars_earned` int NOT NULL DEFAULT 1,
	`message` text,
	`earned_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `rewards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `activity_sessions` ADD CONSTRAINT `activity_sessions_child_id_child_profiles_id_fk` FOREIGN KEY (`child_id`) REFERENCES `child_profiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `activity_sessions` ADD CONSTRAINT `activity_sessions_activity_type_id_activity_types_id_fk` FOREIGN KEY (`activity_type_id`) REFERENCES `activity_types`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `child_profiles` ADD CONSTRAINT `child_profiles_parent_id_users_id_fk` FOREIGN KEY (`parent_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `daily_schedule_tasks` ADD CONSTRAINT `daily_schedule_tasks_child_id_child_profiles_id_fk` FOREIGN KEY (`child_id`) REFERENCES `child_profiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rewards` ADD CONSTRAINT `rewards_child_id_child_profiles_id_fk` FOREIGN KEY (`child_id`) REFERENCES `child_profiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rewards` ADD CONSTRAINT `rewards_activity_session_id_activity_sessions_id_fk` FOREIGN KEY (`activity_session_id`) REFERENCES `activity_sessions`(`id`) ON DELETE no action ON UPDATE no action;