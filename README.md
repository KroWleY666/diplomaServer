# diplomaServer
Установка компонентов
1) npm i - установить зависимости
2) npm run dev - запустить сервер

Перед миграцией сделать комменты в migrations:
- create-exercise (references te_id)
- create-train (references type_train_id И level_train_id)
- create-standart (references stn_id)
- create-parameter (references pn_id)

После миграции раскомментить

Миграции:
1) npx sequelize db:migrate
2) npx sequelize db:migrate:undo (не надо)
3) npx sequelize db:seed:all



