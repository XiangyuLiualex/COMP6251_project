# Backend


1. patient
   1. if guest, request limited
2. json server
3. json server auth
   1. login....
4. sign up, create role patient


# plan for the project

1. build the miniumal viable product (MVP)
   1. using mock data for fetch api as backend
   2. draw the wireframe for the frontend
2. transfer to vite from CRA(too heavy)
   - not maintained anymore
   - [try](https://www.freecodecamp.org/news/how-to-migrate-from-create-react-app-to-vite/)
   - or [carco](https://craco.js.org/)

## TODOs

- [ ] draw the wireframe for the frontend
- [ ] login page
  - login for patient
  - login for doctor and practitioner
  - hash the password
  - link to register
- main page for patient
  - consult
  - query
  - ....
- main page for admin
  - query all registration
  - approve registration
- main page for doctor and practitioner
  - check current appointment
- [ ] replace UI with framework UI
- material Base ui with tailwind or Material UI
- using React Query

- backend
  - user account status
  - authentication method
    - [why not jwt](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/)
    - [diff session](https://www.cnblogs.com/liqing/p/about-session.html)
  - serverside session in cookie
  - clientside session in JWT
  - [why so much JWT](https://v2ex.com/t/992055) [2](https://www.v2ex.com/t/774127)
  - [session, jwt, cookie](https://hytonightyx.github.io/fedoc/04-%E6%B8%B8%E8%A7%88%E5%99%A8%E4%B8%8EBOM/Cookie-Session%20,JWT%E8%AE%A4%E8%AF%81%E6%9C%BA%E5%88%B6.html#%E8%B7%A8%E5%9F%9F%E8%AE%A4%E8%AF%81%E7%9A%84%E9%97%AE%E9%A2%98)