# Zuerikunst
## Api zum "Kunst im Stadtraum"-Datensatz

## API Endpoints

The API is deployed at [zuerikunst.herokuapp.com](http://zuerikunst.herokuapp.com).
It is also available via HTTPS.

### `GET /`

Returns the entire dataset

Example:

```shell
curl http://zuerikunst.herokuapp.com/
[{
  "name": "\"Hintermünsterbrunnen\"",
  "type": "Brunnen",
  "artist": "Johann Jakob Breitinger (1814-1880), Joseph von  Wyl",
  "date": "1861/1976",
  "lat": 47.3702858347,
  "lng": 8.54468923201
},
...
]
```

### `GET /type/<type>`

Returns the objects of the specified `<type>`.
The available types are:

* `Brunnen`
* `Gestaltung`
* `Installation`
* `Bauplastik`
* `Freiplastik`

Example:

```shell
curl http://zuerikunst.herokuapp.com/type/Brunnen
[{
  "name": "\"Hintermünsterbrunnen\"",
  "type": "Brunnen",
  "artist": "Johann Jakob Breitinger (1814-1880), Joseph von  Wyl",
  "date": "1861/1976",
  "lat": 47.3702858347,
  "lng": 8.54468923201
},
...
]
```

### `GET /nearby/<latitude>/<longitude>`

Returns the ten closest art objects for the given `<latitude>` and `<longitude>`.

Example:

```shell
curl http://zuerikunst.herokuapp.com/nearby/47.37059/8.5448568
[{
  "name": "\"Hintermünsterbrunnen\"",
  "type": "Brunnen",
  "artist": "Johann Jakob Breitinger (1814-1880), Joseph von  Wyl",
  "date": "1861/1976",
  "lat": 47.3702858347,
  "lng": 8.54468923201,
  "distance": 36.1397163868055
},
{
  "name": "\"Klausbrunnen\" (auch bekannt als \"Samichlausbrunnen\")",
  "type": "Brunnen",
  "artist": "Arnold Hünerwadel (1877-1945)",
  "date": "1910 (erneuert 1973)",
  "lat": 47.3696309256,
  "lng": 8.54537455095,
  "distance": 113.676258448047
},
...
```

## Local setup

You will need a Postgres database, the [Kunst im Stadtraum JSON file](https://data.stadt-zuerich.ch/storage/f/kunst_im_stadtraum/KiS.json) and Node.js.

```shell
git clone https://github.com/avgp/zuerikunst.git
cd zuerikunst
npm install
wget https://data.stadt-zuerich.ch/storage/f/kunst_im_stadtraum/KiS.json
DATABASE_URL=<your databse url> DATA_FILE=`pwd`/KiS.json node setup/import_data.js
```

The API server can then be started by running `node index.js` and will launch on [localhost:8080](http://localhost:8080).

## Acknowledgements

This project would not be possible without [Open Data Zürich](https://data.stadt-zuerich.ch/organization/stadt-zurich) and the Departementssekretariat, Tiefbau- und Entsorgungsdepartement as well as the Geomatik + Vermessung Zürich, Tiefbau- und Entsorgungsdepartement.

More about ["Kunst im Stadtraum"](https://data.stadt-zuerich.ch/dataset/kunst-im-stadtraum) can be found on the website of the dataset.

## License

The original dataset is licensed under [CC0 (Public Domain)](https://creativecommons.org/publicdomain/zero/1.0/deed.en).

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)
