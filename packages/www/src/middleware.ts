import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
	publicRoutes: [
		'/',
		'/api/trigger',
		'/api/webhooks/clerk',
		'/api/NHLBrackets',

    // ! Remove these after
		'/api/NHLPicks',
		'/api/NHLSeries',
		'/api/NHLStandings',
	],

	apiRoutes: [
		// '/api/NHLBrackets',
		// '/api/NHLPicks',
		// '/api/NHLSeries',
		// '/api/NHLStandings'
	],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
