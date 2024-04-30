# API

/api/* -> /*

- users
  - user    POST   signup, /signup
    - auto create profile
  - user    POST   login, /login
- self-reg
  - admin   GET   all self-reg, /admin/approvals
  - admin   PATCH approve one self-reg, /admin/approve/{id}
  - user    POST  self-reg, /patient/self-reg
- profile
  - user    POST  profile, /profile
  - user    PATCH profile, /profile/{id}
  - user    GET   profile, /profile?userId={id}
- slots
  - user    GET     all slots, /slots
  - user    PATCH   update slot, /slots/{id}
- appointment
  - user    POST    appointment, /appointment
  - gp      GET     gps appointments, /appointment?gpId={id}
  - gp      PATCH   update appointment, /appointment/{id}
- gpss
  - user    GET     all gps, /medical-history?userId={id}
- guestPatient
  - user get guestpaitent check, /patient/guest-check/:id
- medical-history
- test
- prescription