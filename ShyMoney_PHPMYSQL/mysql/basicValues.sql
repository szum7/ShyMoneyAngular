INSERT INTO tags (title, description) VALUES 
(1, "fix", "Always the same sum."),
(2, "monthly", "Will occur in every month. (Not necessarily the same sum.)"),
(3, "periodic", "Occurs monthly but in a specific interval."),
(4, "once", ""),
(5, "indefinite", ""),
(6, "work", ""),
(7, "gift", ""),
(8, "bill", ""),
(9, "travel", ""),
(10, "bkv", ""),
(11, "rent", ""),
(12, "scholarship", ""),
(13, "tech supply", ""),
(14, "food", ""),
(15, "bank", ""),
(16, "dentist", ""),
(17, "social", "Social, fun program."),
(18, "course", ""),
(19, "KRESZ", ""),
(20, "necessities", ""),
(21, "BME", ""),
(22, "language", ""),
(23, "exam", "");

INSERT INTO users (username, password, email) VALUES
(1, "admin", "admin", "admin@mail.hu");

INSERT INTO units (id, title) VALUES
(1, "month"),
(2, "year");

INSERT INTO options (user_id, starting_sum, starting_sum_date, unit_id, unit_count, date_from, date_to) VALUES 
(1, 164203, "2010-09-07", 1, 5, "1000-01-01", "1000-01-01");