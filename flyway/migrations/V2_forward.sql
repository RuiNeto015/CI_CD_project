create table tag
(
    tag_id     char(36) collate latin1_bin        not null
        primary key,
    member_id  char(36) collate latin1_bin        not null,
    name       text                               not null,
    created_at datetime default CURRENT_TIMESTAMP not null,
    updated_at datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint tag_ibfk_1
        foreign key (member_id) references member (member_id)
            on update cascade on delete cascade
);

create index member_id
    on tag (member_id);

create table tag_comment
(
    comment_id char(36) collate latin1_bin        not null,
    tag_id     char(36) collate latin1_bin        not null,
    created_at datetime default CURRENT_TIMESTAMP not null,
    updated_at datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    primary key (comment_id, tag_id),
    constraint tag_comment_ibfk_1
        foreign key (comment_id) references comment (comment_id)
            on update cascade on delete cascade,
    constraint tag_comment_ibfk_2
        foreign key (tag_id) references tag (tag_id)
            on update cascade on delete cascade
);

create index tag_id
    on tag_comment (tag_id);

create table tag_post
(
    post_id    char(36) collate latin1_bin        not null,
    tag_id     char(36) collate latin1_bin        not null,
    created_at datetime default CURRENT_TIMESTAMP not null,
    updated_at datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    primary key (post_id, tag_id),
    constraint tag_post_ibfk_1
        foreign key (post_id) references post (post_id)
            on update cascade on delete cascade,
    constraint tag_post_ibfk_2
        foreign key (tag_id) references tag (tag_id)
            on update cascade on delete cascade
);

create index tag_id
    on tag_post (tag_id);