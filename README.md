## Instalação

- Criar arquivo .env de acordo com example.env
- Criar arquivo arquivo ormconfig.json de acordo com documentação https://docs.nestjs.com/techniques/database

```bash
$ npm install
```

```bash
$ npm run typeorm migration:run
```

## Iniciar aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Testar aplicação

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=api_invetory&uri=https%3A%2F%2Fraw.githubusercontent.com%2FdrapalskiMario%2Fapi_inventory%2Fmain%2FInsomnia_2021-09-27.json)
