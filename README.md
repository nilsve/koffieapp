# Readme

### KoffieApp

#### Backend starten:
1. Installeer de laatste versie van [NodeJS](https://nodejs.org/en/download/).
2. Open een terminal binnen `koffieapp\backend` en voer het volgende commando uit: `npm run dev`.
3. Wacht op bevestiging van opstarten: `KoffieApp REST API running on port 5000`.
4. Benader de server op de REST API of open de webpagina op `http://localhost:5000/`.

#### REST API
Voor het gebruiken van de API raad ik [Postman](https://www.getpostman.com/downloads/) aan.

In dit voorbeeld is telkens gebruikers id `5c756f74db57e175c4d0a013` gebruikt.

- Alle gebruikers opvragen: `http://localhost:5000/api/users`.
	- ***Respons***: Alle gebruikers.

- Een enkele gebruiker opvragen: `http://localhost:5000/api/users/5c756f74db57e175c4d0a013`.
	- ***Respons***: Enkele gebruiker.

- Een gebruiker aanmaken: `http://localhost:5000/api/users/create`.
	- **Body**: `{ "name": "Test Tester", "email": "test@test.nl" }`.
	- ***Respons***: Nieuwe gebruiker.
	
- Een gebruiker aanpassen: `http://localhost:5000/api/users/update/5c756f74db57e175c4d0a013`
	- **Body**: `{ "name": "Indy Maat - Aanpassing" }`
	- ***Respons***: Aangepaste gebruiker.

- Een gebruiker verwijderen: (**Nieuw**) `http://localhost:5000/api/users/delete/5c756f74db57e175c4d0a013`
	- ***Respons***: Alle gebruikers.
