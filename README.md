# Examenopdracht Front-end Web Development

- Student: Peter Cypers
- Studentennummer: 202185333
- E-mailadres: <mailto:peter.cypers@student.hogent.be>

## <u>Project: Image Saving Application</u>

[online website](https://peter-cypers-images-project.onrender.com)

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

Voor gebruikers van [Chocolatey](https://chocolatey.org/):

```powershell
choco install nodejs -y
choco install yarn -y
```
Voor gebruikers van [Homebrew](https://brew.sh/):

```powershell
brew install node
brew install yarn
```

## Opstarten

- Maak een nieuwe `.env` (development) file aan, in dezelfde folder als de src, met deze template:

```ini
VITE_API_URL=http://localhost:9000/api/
```

- Installeer alle dependencies: `yarn install`
- Start de development server: `yarn dev`

## Testen

- Maak een `.env` file aan (zie boven)
- Start de tests: `yarn test`