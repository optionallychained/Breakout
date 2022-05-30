export class Sounds {

    private static sounds: Map<string, string> = new Map();

    public static add(name: string, filePath: string): void {
        Sounds.sounds.set(name, filePath);
    }

    public static play(name: string): void {
        void (new Audio(Sounds.sounds.get(name)).play());
    }
}
