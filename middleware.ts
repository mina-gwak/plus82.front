import { stackMiddlewares } from 'shared/config/middleware/stack-middleware'
import { withAuth } from 'shared/config/middleware/with-auth'

const middlewares = [withAuth]
export default stackMiddlewares(middlewares)

export const config = {
  matcher: [
    '/((?!api|.*\\..*|_next/static|_next/image|manifest.json|assets|favicon.ico).*)',
  ],
}
