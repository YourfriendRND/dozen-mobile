export function isNetworkError(error: unknown): boolean {
    if (error instanceof Error) {
        return (
            error?.message.includes('Network request failed') ||
            error?.message.includes('fetch')
        )
    }

    return false;
}
