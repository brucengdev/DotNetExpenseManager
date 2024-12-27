export async function sleep(time: number): Promise<void> {
    await new Promise(r => setTimeout(r, time))
}