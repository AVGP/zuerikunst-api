CREATE EXTENSION earthdistance;
CREATE EXTENSION cube;

create table art_pieces(id serial primary key, name text, artist text, date text, type text, material text, location_desc text, lat double precision, lng double precision);
