## Description
+ Base NestJS for FlexTech
+ Node v20

## Guide build for project
- copy .env.example to .env
- docker-compose up -d
- npm install
- npm run dev
- localhost:4001

## NestJS
- nest g mo NameModule (cd src/modules)
- nest g co NameController (cd src/modules)

## Content sent email

```sh
curl --location 'http://localhost:4001/api/mail/sent-data' \
    --header 'token: Aljkwqui44ASda231' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "listEmails": [
        {
            "to": "sv1@gmail.com",
            "subject": "Thông tin điểm số sinh viên",
            "content": "<h1>Điểm môn Toán</h1><p>Tình trạng: Không đạt</p>"
        },
        {
            "to": "sv2@gmail.com",
            "subject": "Thông tin điểm số sinh viên",
            "content": "<h1>Điểm môn Toán</h1><p>Tình trạng: Không đạt</p>"
        }
    ]
  }'
```
