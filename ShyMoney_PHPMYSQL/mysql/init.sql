CREATE TABLE sums (
    id			BIGINT NOT NULL AUTO_INCREMENT,
    title		VARCHAR(500),
    sum			INT NOT NULL,
    date		DATE NOT NULL,
    created             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE tags (
    id			BIGINT NOT NULL AUTO_INCREMENT,
    title		VARCHAR(255) NOT NULL,
    description		VARCHAR(500),
    icon_url		VARCHAR(255),
    is_inquickbar	BOOLEAN DEFAULT 0,
    created		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE sum_tag_connection (
    id                  BIGINT NOT NULL AUTO_INCREMENT,
    sum_id		BIGINT NOT NULL,
    tag_id		BIGINT NOT NULL,
    created		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(sum_id) REFERENCES sums (id) ON DELETE CASCADE,
    FOREIGN KEY(tag_id) REFERENCES tags (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE users (
    id			BIGINT NOT NULL AUTO_INCREMENT,
    username		VARCHAR(255) NOT NULL,
    password            VARCHAR(255) NOT NULL,
    email               VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE units (
    id			BIGINT NOT NULL AUTO_INCREMENT,
    title               VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE options (
    id                          BIGINT NOT NULL AUTO_INCREMENT,
    user_id                     BIGINT NOT NULL,
    starting_sum                INT,
    starting_sum_date           DATE,
    unit_id                     BIGINT NOT NULL,
    unit_count                  INT,
    date_from                   DATE NOT NULL,
    date_to                     DATE NOT NULL,
    period_averages_date_from   DATE,
    period_averages_date_to     DATE,
    graph_view_date_from        DATE,
    graph_view_date_to          DATE,
    monthly_averages_date_from  DATE,
    monthly_averages_date_to    DATE,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY(unit_id) REFERENCES units (id)
) ENGINE=InnoDB;
