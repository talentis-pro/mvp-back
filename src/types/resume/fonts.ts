export interface FontUsed {
	fontName: string;
	variations: Array<"bold" | "boldItalic" | "italic" | "regular">;
}

export interface Font {
	fontName: string;
	bold?: Buffer;
	regular?: Buffer;
	italic?: Buffer;
	boldItalic?: Buffer;
}

export type Fonts = Array<Font>;
