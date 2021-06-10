## Project brief

You are tasked to create 2 node apps. One identity provider (SSO) and one simple web service (Service). Service only authenticates user via SSO. Once authenticated, Service will provide all protected service to user until the session expires, which is determined by SSO.

## Functional check list:

Note: all views only require basic HTML , no styling needed.

### 1. Setting up a Service
- Service should have a simple login page with a “Login with SSO” button                              >> DONE
- Service should have a protected /home page, only allow authenticated users.                         >> DONE
- Service should have a /login API
  - Calling /login API will check whether the user has SSO token and whether it is already expired.   >> DONE
  - If there is SSO token, and not expired, log the user in directly (using session etc)              >> DONE
  - If there’s no SSO token, attempt the SSO flow by redirecting.                                     >> DONE
- Service should have a /profile API
  - Authenticated users can call /profile to get their user email                                     >> DONE
  
### 2. Setting up SSO [DONE]
- SSO should have a login form for when users are redirected from Service.                            >> DONE

### 3. Registering a Service in SSO [DONE]
- SSO should have a form to register a Service. Fields include:                                       >> DONE
  - service_name
  - service_callback_url
- Once registered, SSO should generate a client ID + client secret for the Service.                   >> DONE
- Service will use                                                                                    >> DONE
  - client id - on initiating authentication
  - client id and secret - on getting actual access token
- More info: https://aaronparecki.com/oauth-2-simplified/#web-server-apps

### 4. User login for the first time in Service [DONE]
- User clicks “Login with SSO”                                                                        >> OK
- Service does not find any active session in DB                                                      >> OK
- Service will redirect user to SSO login form                                                        >> OK
- User enters credentials                                                                             >> OK
- On valid credentials, redirect user back to Service callback url with a code                        >> OK
- Service calls SSO with the code to retrieve actual access token + expiry date.                      >> OK
- Service persist user in DB, and authenticates the user (create session)                             >> OK
- Service should now show user the protected home page                                                >> OK

### 5. Existing user login with expired session in Service [DONE]
- User clicks “Login with SSO”                                                                        >> OK
- Service does not find any active session in DB                                                      >> OK
- Service will redirect user to SSO login form                                                        >> OK
- User enters credentials                                                                             >> OK
- On valid credentials, redirect user back to Service callback url with a code                        >> OK
- Service calls SSO with the code to retrieve actual access token + expiry date.                      >> OK
- Service should now show user the protected home page                                                >> OK

### 6. Existing user login with active session in Service [DONE]
- User clicks “Login with SSO”                                                                        >> OK
- Service found an active session in DB                                                               >> OK
- Service should now show user the protected home page                                                >> OK

### 7. Banned user login with expired session in Service [DONE]
- User clicks “Login with SSO”                                                                        >> OK
- Service does not find any active session in DB                                                      >> OK
- Service will redirect user to SSO login form                                                        >> OK
- User enters credentials                                                                             >> OK
- On valid credentials, SSO found that this particular user cannot access this Service.               >> OK
- Shows “Invalid credentials” on form.                                                                >> OK

### 8. Banned user login with active session in Service [DONE]
- User clicks “Login with SSO”                                                                        >> OK
- Service found an active session in DB                                                               >> OK
- Service should now show user the protected home page                                                >> OK
