import { clerkClient } from "../libs/clerk/clerk"

const TEST_USER_ID = 'user_2QIwKpllcsJE0lKmZtYu4DIN40b'

export const getSessionToken = async () => {
  const sessions = await clerkClient.sessions.getSessionList()
  const sessionId = sessions.find(session => session.userId === TEST_USER_ID)
  const token = await clerkClient.sessions.getToken(sessionId!.id, 'HOCKEY_POOL_TEST_TOKEN')
  return token
}