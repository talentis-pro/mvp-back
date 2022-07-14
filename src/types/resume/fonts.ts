export interface Font {
	fontName: string;
	bold?: Buffer;
	regular?: Buffer;
	italic?: Buffer;
	boldItalic?: Buffer;
}

export type Fonts = Array<Font>;
