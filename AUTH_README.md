# Authentication Method

We are using JSON Web Tokens (JWT) for authentication.

When hitting any route protected by requireAuth can expect the following data
attached to the request if user passes authentication:

```
user: 
   { id: {USER_ID},
     name: {USER_NAME},
     email: {USER_EMAIL},
     password: {USER_PASSWORD},
     iceboxID: {USER_ICEBOXID},
     created_at: {USER_CREATED_AT} 
    },
```