# Airbean API 

#### Välkommen till Sandras individuella uppgift!


### Projektbeskrivning

Detta projekt är ett menyhanteringssystem som låter administratörer lägga till, modifiera och ta bort produkter från en meny. <br>
Systemet inkluderar även funktionalitet för att hantera kampanjerbjudanden.


## Installation:
### 1. Klona repot:<br>
```
git clone: 
```


### 2. Installera paketen:
```
npm install 
```
## Användning
#### Så här använder/startar du projektet:
```
npm start 
```

## Endpoints
### Autentisering

- `POST /login`<br>
- `http://localhost:7070/api/users/login`
  - **Beskrivning:** Logga in med användaruppgifter /admin-konto.
  - **Request Body:**
    ```json
    {
      "username": "Morgan",
      "password": "lösenord"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "JWT-token"
    }
    ```

 ### Produkter

- `GET /products`
- `URL: http://localhost:7070/api/products`
  - **Beskrivning:** Hämta alla produkter.
  - **Response:**
    ```json
    {
        "title": "Kaffe Svart",
        "description": "Svart som natten",
        "price": "15",
        "createdAt": "2024-06-14T15:42:20.344Z",
        "_id": "VuqwEA4y0dJ5lSK9"
    }
   
    ```
<br>

- `GET /products/:id`
- `URL: http://localhost:7070/api/products/keMYZr0xKhOlN8qS`
  - **Beskrivning:** Hämta specifik produkt.
  - **Response:**
    ```json 
    { 
        "title": "Best Coffee X1",
        "description": "Description for Best Coffee X1",
        "price": "30",
        "createdAt": "2024-06-13T20:34:58.567Z",
        "_id": "keMYZr0xKhOlN8qS", 
    }
   
    ```

<br>


- `POST /products`<br>
- ` URL: http://localhost:7070/api/products`
  - **Beskrivning:** Lägg till en ny produkt.
  - **Request Body:**
    ```json
    {
      "title": "Bryggkaffe",
      "desc": "Kaffe från Etiopien",
      "price": 25
    }
    ```
  - **Response:**
    ```json
    {
        "title": "KanelBulle",
        "description": "extra saftig kanelbulle",
        "price": "25",
        "createdAt": "2024-06-14T15:43:11.210Z",
        "_id": "GFWu9EgkKGur5uvL"
    }
    
    ```
<br>

- `PUT /products/:id`
- `URL: http://localhost:7070/api/products/keMYZr0xKhOlN8qS`

  - **Beskrivning:** Modifiera en befintlig produkt.
  - **Request Body:**
    ```json
    {
      "title": "Bryggkaffe",
      "desc": "Uppdaterad beskrivning",
      "price": 30
    }
    ```
  - **Response:**
    ```json
    {
      "title":"Best Coffee X1",
      "description":"Description for Best Coffee X1",
      "price":"40",
      "createdAt":,
      "_id":"keMYZr0xKhOlN8qS",
      "modifiedAt":
    }
    ```



<br>

- `DELETE /products/:id`
  - **Beskrivning:** Ta bort en produkt.
  - **Response:**
    ```json
    {
      "message": "Produkt borttagen"
    }
    ```

### Kampanjer
<br>

- `GET /campaigns`
- `URL: http://localhost:7070/api/campaigns`
  - **Beskrivning:** Hämta alla kampanjerbjudanden.
 
  - **Response:**
    ```json
    {
        "combinations": [
            {
                "productId": "nYHlLF4k3S0DYzk8"
            },
            {
                "productId": "keMYZr0xKhOlN8qS"
            }
        ],
        "totalPrice": "120.20",
        "validFrom": "2024-06-13T20:40:11.239Z",
        "validUntil": "2024-06-15T20:43:11.239Z",
        "createdAt": "2024-06-13T20:56:19.931Z",
        "_id": "ge8zYhFLgafTLqVQ",
        "modifiedAt": "2024-06-13T21:44:06.736Z"
    }
    ```
<br>

- `GET /campaigns/:id`
- `URL: http://localhost:7070/api/campaigns/ge8zYhFLgafTLqVQ `
  - **Beskrivning:** Hämta specifik kampanj.

  - **Response:**
    ```json
    {
        "combinations": [
            {
                "productId": "nYHlLF4k3S0DYzk8"
            },
            {
                "productId": "keMYZr0xKhOlN8qS"
            }
        ],
        "totalPrice": "120.20",
        "validFrom": "2024-06-13T20:40:11.239Z",
        "validUntil": "2024-06-15T20:43:11.239Z",
        "createdAt": "2024-06-13T20:56:19.931Z",
        "_id": "ge8zYhFLgafTLqVQ",
        "modifiedAt": "2024-06-13T21:44:06.736Z"
    }
    ```




- `POST /campaigns`
- `URL: http://localhost:7070/api/campaigns`
  - **Beskrivning:** Lägg till ett nytt kampanjerbjudande.
  - **Request Body:**
  ```json
  {
    "products": ["Produkt1", "Produkt2"],
    "totalPrice": 200,
    "validFrom": "2024-06-13T20:40:11.239Z",
    "validUntil": "2024-06-15T20:43:11.239Z"
  }
    ```
  - **Response:**
  ```json
    {
      "message": "Kampanj tillagd",
      "campaign": {
      "id": "1",
      "products": ["Produkt1", "Produkt2"],
      "totalPrice": 200,
      "validFrom": "2024-06-13T20:40:11.239Z",
      "validUntil": "2024-06-15T20:43:11.239Z",
      "createdAt": "2024-06-13T12:34:56.789Z"
  }
  }
    ```

- `PUT /campaigns/:id`
- `URL: http://localhost:7070/api/campaigns/ge8zYhFLgafTLqVQ`
  - **Beskrivning:** Uppdatera kampanjerbjudande
  - **Request**
  ```json
    {
    "combinations": [
        {
            "productId": "nYHlLF4k3S0DYzk8"
        }
    ],
    "totalPrice": "120.20",
    "validFrom": "2024-06-13T20:40:11.239Z",
    "validUntil": "2024-06-14T20:40:11.239Z",
    "_id": "ge8zYhFLgafTLqVQ"
  }
  ```


  - **Response:**
  ```json

    {
    "combinations": [
        {
            "productId": "nYHlLF4k3S0DYzk8"
        }
    ],
    "totalPrice": "120.20",
    "validFrom": "2024-06-13T20:40:11.239Z",
    "validUntil": "2024-06-14T20:40:11.239Z",
    "_id": "ge8zYhFLgafTLqVQ",
    "createdAt":,
    "modifiedAt":

  }

    ```




 ## Teknologier
- Node.js
- Express
- NeDB
- JWT för autentisering
- Joi för validering
- nodemon för utvecklingsverktyg
- dotenv för miljövariabler (environment variables)

## Gruppexamination
### För att se gruppexaminationen gå in på länkarna nedan: 

* [Gruppexaminationen ](https://github.com/sandranymark/Airbean-API-Grupparbete)
* [Dokumentatin för GruppExaminationen](https://github.com/sandranymark/Airbean-API-Grupparbete/tree/main/Airbean-API-main/documentation)







