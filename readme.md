# react web app with asp.net api jwt authentication
also has user roles admin and user

react, redux, tailwind css and the mantine ui kit

## frontend
```
cd my-app
npm install
npm run start
```


## backend
```
cd MyApi
dotnet ef database update
dotnet run
```

## Users
seeded in `MyApi/Data/Seeder.cs`

### Admin
email: admin@email.com
password: @AdminPassword123

### User
email: test@email.com
password: @TestPassword123