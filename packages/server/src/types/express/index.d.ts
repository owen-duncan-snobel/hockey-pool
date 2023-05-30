import express, { Request } from 'express'
import { AuthObject, LooseAuthProp } from '@clerk/clerk-sdk-node'

declare module 'express' {
  interface Request {
    auth?: AuthObject
  }
}

// declare module 'express' {
//   interface Request {
//     auth?: AuthObject
//   }
// }
