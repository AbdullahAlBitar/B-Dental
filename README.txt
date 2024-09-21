First run:
npm install
npx prisma migrate dev --name "init"
npx prisma generate

note : always make sure XAMPP MySQL server is runing

-----------------------------------------------------

If you make changes to your prisma/schema.prisma file
run:
npx prisma migrate dev --name "describe-your-changes"
npx prisma generate


-----------------------------------------------------

to gen JWT_SECRET:
openssl rand -base64 32
