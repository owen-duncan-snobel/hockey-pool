import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"

export default authMiddleware({
	publicRoutes: [
		'/',
		'/api/trigger',
		'/api/webhooks/clerk',
	],
  afterAuth(auth, req, evt){
    if (!auth.userId && !auth.isPublicRoute) {
        return redirectToSignIn({ returnBackUrl: req.url })
    }
  }
})

export const config = {
	matcher: [
		'/((?!.*\\..*|_next).*)',
		'/',
		'/(api|trpc)(.*)',
		'/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)',
	],
}
