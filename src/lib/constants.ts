export enum ResponseMessage {
  Welcome = 'Welcome onboard!',
  Intro = 'Welcome to online chatbot lessons',
  Success = "Created successfully"
}


export enum ErrorMessage {
  InvalidRequestParameters = 'Invalid request parameters',
  InvalidToken = 'Invalid code',
  TokenExpired = 'Code expired',
  EmailNotVerified = 'Please verify your email first',
  UserAlreadyExists = 'Email already in use',
  InvalidCredentials = 'Invalid credentials',
  CourseTitle = 'Course title already exists',
  CourseId = 'Course not found',
  Required = 'Please provide the required fields',
  Unauthenticated = 'Sorry, you are not signed in',
  Exists = 'Already exists',
  NotFound = 'Not found',
  ServerError = 'Something went wrong. It would be nice if you report this to us',
  Unauthorized = 'Sorry, you do not have permission to perform this action',
  InternalServerError = "InternalServerError"
}
