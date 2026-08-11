# HighReels

Mobile client for the HighReels short-video product.

## Language

**Environment**:
A named backend the app talks to, identified by its API base URL. Today there are two: Development and Production. An Environment is not an Expo/EAS build profile; those are deferred until EAS is set up.
_Avoid_: Build profile, EAS environment, stage, deployment (when meaning the backend target)

**Development**:
The Environment backed by the AWS Lambda Function URL used for day-to-day client work.
_Avoid_: Local, staging, test

**Production**:
The Environment backed by the Fargate ALB (URL TBD) that real users will hit.
_Avoid_: Live, release

**API base URL**:
The single config value that selects which Environment the app talks to. Switching Environment means changing that value locally (EAS later).
_Avoid_: Endpoint host, server URL, backend URL (as separate concepts)

**Login**:
An existing user becoming authenticated. Phone Login uses OTP. Email+password Login UI exists but is not API-backed yet.
_Avoid_: Sign-in (as a separate concept), auth (as the act)

**Session**:
The persisted access token and refresh token that mean the user is authenticated.
_Avoid_: Auth state (as a synonym for the tokens themselves), login state

**OAuth**:
Login via a third-party identity provider (e.g. Google), distinct from phone OTP Login.
_Avoid_: Social login

**Phone number**:
The user's phone identifier in E.164 form (`+` and digits only, no spaces), used as the Login identity for phone OTP.
_Avoid_: Mobile, MSISDN (in product language)

**OTP Challenge**:
A short-lived server handle for an in-progress OTP proof (Login or Signup). The API field is `sessionId`; that is not a Session.
_Avoid_: Session, auth session, OTP session (as names for this handle)

**Signup**:
Creating a new account via OTP Challenge then Complete signup (password, PIN, birthday, username).
_Avoid_: Registration, sign-up (as a separate concept), onboarding (for the API act)

**Signup draft**:
In-progress local fields collected during Signup for the Complete signup call; not a Session. Cleared after success or abandon.
_Avoid_: Signup session, wizard state, form state (as product names)
