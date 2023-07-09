import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    '/',
    '/api/trigger',
    '/api/webhooks/clerk'
  ],

  apiRoutes: [
    '/api/NHLBrackets',
  ]
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
