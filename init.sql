CREATE TABLE IF NOT EXISTS base_user
(
    base_user_id      char(36) COLLATE latin1_bin          NOT NULL
        PRIMARY KEY,
    user_email        varchar(250)                         NOT NULL,
    is_email_verified tinyint(1) DEFAULT 0                 NOT NULL,
    username          varchar(250)                         NOT NULL,
    user_password     varchar(255)                         NULL,
    is_admin_user     tinyint(1) DEFAULT 0                 NOT NULL,
    is_deleted        tinyint(1) DEFAULT 0                 NOT NULL,
    created_at        datetime   DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at        datetime   DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT user_email
        UNIQUE (user_email)
);

CREATE TABLE IF NOT EXISTS member
(
    member_id      char(36) COLLATE latin1_bin        NOT NULL,
    member_base_id char(36) COLLATE latin1_bin        NOT NULL,
    reputation     int      DEFAULT 0                 NOT NULL,
    created_at     datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at     datetime DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (member_id, member_base_id),
    CONSTRAINT member_ibfk_1
        FOREIGN KEY (member_base_id) REFERENCES base_user (base_user_id)
            ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX member_base_id
    ON member (member_base_id);

CREATE TABLE IF NOT EXISTS post
(
    post_id            char(36) COLLATE latin1_bin        NOT NULL
        PRIMARY KEY,
    member_id          char(36) COLLATE latin1_bin        NOT NULL,
    type               varchar(30)                        NOT NULL,
    title              text                               NULL,
    text               text                               NULL,
    link               text                               NULL,
    slug               varchar(150)                       NOT NULL,
    points             int      DEFAULT 0                 NOT NULL,
    total_num_comments int      DEFAULT 0                 NOT NULL,
    created_at         datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at         datetime DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT post_ibfk_1
        FOREIGN KEY (member_id) REFERENCES member (member_id)
            ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comment
(
    comment_id        char(36) COLLATE latin1_bin        NOT NULL
        PRIMARY KEY,
    member_id         char(36) COLLATE latin1_bin        NOT NULL,
    parent_comment_id char(36) COLLATE latin1_bin        NULL,
    post_id           char(36) COLLATE latin1_bin        NOT NULL,
    text              text                               NOT NULL,
    points            int      DEFAULT 1                 NOT NULL,
    created_at        datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at        datetime DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT comment_ibfk_1
        FOREIGN KEY (member_id) REFERENCES member (member_id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT comment_ibfk_2
        FOREIGN KEY (parent_comment_id) REFERENCES comment (comment_id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT comment_ibfk_3
        FOREIGN KEY (post_id) REFERENCES post (post_id)
            ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX member_id
    ON comment (member_id);

CREATE INDEX parent_comment_id
    ON comment (parent_comment_id);

CREATE INDEX post_id
    ON comment (post_id);

CREATE TABLE IF NOT EXISTS comment_vote
(
    comment_vote_id char(36) COLLATE latin1_bin        NOT NULL
        PRIMARY KEY,
    comment_id      char(36) COLLATE latin1_bin        NOT NULL,
    member_id       char(36) COLLATE latin1_bin        NOT NULL,
    type            varchar(10)                        NOT NULL,
    created_at      datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at      datetime DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT comment_vote_ibfk_1
        FOREIGN KEY (comment_id) REFERENCES comment (comment_id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT comment_vote_ibfk_2
        FOREIGN KEY (member_id) REFERENCES member (member_id)
            ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX comment_id
    ON comment_vote (comment_id);

CREATE INDEX member_id
    ON comment_vote (member_id);

CREATE INDEX member_id
    ON post (member_id);

CREATE TABLE IF NOT EXISTS post_vote
(
    post_vote_id char(36) COLLATE latin1_bin        NOT NULL
        PRIMARY KEY,
    post_id      char(36) COLLATE latin1_bin        NOT NULL,
    member_id    char(36) COLLATE latin1_bin        NOT NULL,
    type         varchar(10)                        NOT NULL,
    created_at   datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at   datetime DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT post_vote_ibfk_1
        FOREIGN KEY (post_id) REFERENCES post (post_id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT post_vote_ibfk_2
        FOREIGN KEY (member_id) REFERENCES member (member_id)
            ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX member_id
    ON post_vote (member_id);

CREATE INDEX post_id
    ON post_vote (post_id);
