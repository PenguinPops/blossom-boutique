import { auth } from "@/app/auth";

export async function validateUserSession() {
    const session = await auth();
    if (!session?.user) {
        return { error: 'Unauthorized' };
    }
    return { user: session.user };
}

export async function validateUserOwnership(username: string) {
    const session = await auth();
    if (!session?.user) {
        return { error: 'Unauthorized' };
    }
    if (session.user.name !== username) {
        return { error: 'Forbidden' };
    }
    return { user: session.user };
}