## Project brief

You are tasked to create 2 node apps. One identity provider (SSO) and one simple web service (Service). Service only authenticates user via SSO. Once authenticated, Service will provide all protected service to user until the session expires, which is determined by SSO.

## Functional check list:

Note: all views only require basic HTML , no styling needed.

### 1. Setting up a Service
- Service should have a simple login page with a “Login with SSO” button
- Service should have a protected /home page, only allow authenticated users.
- Service should have a /login API
  - Calling /login API will check whether the user has SSO token and whether it is already expired.
  - If there is SSO token, and not expired, log the user in directly (using session etc)
  - If there’s no SSO token, attempt the SSO flow by redirecting.
- Service should have a /profile API
  - Authenticated users can call /profile to get their user email
  
### 2. Setting up SSO [DONE]
- SSO should have a login form for when users are redirected from Service.

### 3. Registering a Service in SSO [DONE]
- SSO should have a form to register a Service. Fields include:
  - service_name
  - service_callback_url
- Once registered, SSO should generate a client ID + client secret for the Service.
- Service will use
  - client id - on initiating authentication
  - client id and secret - on getting actual access token
- More info: https://aaronparecki.com/oauth-2-simplified/#web-server-apps

### 4. User login for the first time in Service
- User clicks “Login with SSO”
- Service does not find any active session in DB
- Service will redirect user to SSO login form
- User enters credentials
- On valid credentials, redirect user back to Service callback url with a code
- Service calls SSO with the code to retrieve actual access token + expiry date.
- Service persist user in DB, and authenticates the user (create session)
- Service should now show user the protected home page

### 5. Existing user login with expired session in Service
- User clicks “Login with SSO”
- Service does not find any active session in DB
- Service will redirect user to SSO login form
- User enters credentials
- On valid credentials, redirect user back to Service callback url with a code
- Service calls SSO with the code to retrieve actual access token + expiry date.
- Service should now show user the protected home page

### 6. Existing user login with active session in Service
- User clicks “Login with SSO”
- Service found an active session in DB
- Service should now show user the protected home page

### 7. Banned user login with expired session in Service
- User clicks “Login with SSO”
- Service does not find any active session in DB
- Service will redirect user to SSO login form
- User enters credentials
- On valid credentials, SSO found that this particular user cannot access this Service.
- Shows “Invalid credentials” on form.

### 8. Banned user login with active session in Service
- User clicks “Login with SSO”
- Service found an active session in DB
- Service should now show user the protected home page
