# COMP6251

## plan

1. patient:
   1. [x] sign up, role is unreg-patient
   2. [x] self register
      1. [x] submit a form
2. admin:
   1. [x] review the form
   2. [x] approve the form
   3. [x] one patient, role -> patient
3. patient:
   1. [x] role -> patient
   2. more function rendered in side bar
   3. appointment
      1. search all available appointments
      2. book an appointment
      3. update an appointment
4. GP:
   1. appointments
      1. search my appointments
      2. update my appointments
   2. today works
      1. search today's appointments
      2. appointment take place
         1. update the appointment?
         2. update patient medical history
         3. create prescription
         4. optional: order additional tests
5. Tester:
   1. incoming tests
   2. update test results
   3. update patient medical history
   4. notification to patients
6. patient:
   1. appointment
      1. incoming appointments
      2. done appointments
   2. tests:
      1. incoming tests
      2. done tests

## collaboration TODOs

0. sign up password double check
1. sidebar icons
2. self register page complete:
   1. [x] data
   2. [x] layout
3. patient profile
   1. [x] data
4. rename the title and resources
   1. medical history?
   2. 

## description

1. mock data created by frontend/scratch/mockData.http so the password and email can be found there
2. ref project:  [most completed](https://github.com/yurisldk/realworld-react-fsd/tree/master)
3. mock data:
   1. [json-server-v0-docs](https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#add-middlewares)
   2. [json-server-auth](https://github.com/jeremyben/json-server-auth)

4. [react-router-docs](https://reactrouter.com/en/main)

5. [react-query-tutorial](https://tkdodo.eu/blog/mastering-mutations-in-react-query)
[react-query-docs](https://tanstack.com/query/latest/docs/framework/react/overview)

6. [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
[simple-zh-tutorial](https://www.jianshu.com/p/516c85c50da8)

 
## tech stack

- React
    - template: https://create-react-app.dev/docs/running-tests
- material UI 
- react-query
  - fetch
  - Axios
- TypeScript
- JSX
- react router https://reactrouter.com/en/main
- mock
  - json-server

- future
  - Tailwind CSS
  - Vite