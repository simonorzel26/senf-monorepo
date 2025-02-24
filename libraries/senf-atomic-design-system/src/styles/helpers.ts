export interface ColorNames {
	[key: string]: {
		h: number;
		s: number;
		l: number;
	}
}
export interface ThemeColors { [key: string]: string }

export type RGB = [number, number, number];
export type HSL = RGB;

export const hsla = (h: number, s: number, l: number, a = 1) => `hsla(${h}, ${s}%, ${l}%, ${a})`;

export const hsl2rgb = (hue: number, sat: number, lum: number) => {
	const h = hue;
	const s = sat / 100;
	const l = lum / 100;
	const a = s * Math.min(l, 1 - l);
	const f = (n: number, k = (n + h / 30) % 12) =>
		Math.floor((l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)) * 255);
	return [f(0), f(8), f(4)];
};
export const rgb2hsl = (red: number, green: number, blue: number) => {
	const r = red / 255;
	const g = green / 255;
	const b = blue / 255;
	const v = Math.max(r, g, b);
	const c = v - Math.min(r, g, b);
	const f = 1 - Math.abs(v + v - c - 1);
	const h =
		c && (v === r ? (g - b) / c : v === g ? 2 + (b - r) / c : 4 + (r - g) / c);
	return [
		Math.floor(60 * (h < 0 ? h + 6 : h)),
		Math.floor((f ? c / f : 0) * 100),
		Math.floor(((v + v - c) / 2) * 100),
	];
};

export const composite = (h: number, s: number, l: number, a: number, b: HSL = [0, 0, 100]) => {
	const overlay = hsl2rgb(h, s, l)
	const background = hsl2rgb(...b as RGB)
	return hsla(
		...rgb2hsl(
			...overlay.map((value, index) => a * value + (1 - a) * background[index]) as RGB
		) as RGB
	);
}
const pad = (n: number, padding = 3) => String(n).padStart(padding, '0');

/**
 * Generates theme colors based on the given colors and luminance
 * @param colors Object with colors and their HSL values as an array.
 * @example { primary: { h: 46, s: 100, l: 71 }, ... }
 * @param luminance Array of luminance values.
 * @example [100, 75, 50, 25, 15, 10, 5];
 * @param mix HSL values to mix with, defaults to white, set to false to disable and only generate the base color as well as transparency.
 * @example [46, 100, 71]
 * @returns Object with colors and their HSLA values as string.
 * @example { 'primary-100': 'hsla(45, 100%, 98%, 1)', 'primary-100-tra': 'hsla(46, 100%, 71%, 0.05)', ... }
 */
export const generateThemeColors = (colors: ColorNames, luminance: number[], mix: HSL | boolean = [0, 0, 100]) => {
	const themeColors: ThemeColors = {};
	Object.entries(colors).forEach(([name, color]) => {
		const { h, s, l } = color
		if (!mix) themeColors[`${name}`] = hsla(h, s, l, 1)
		luminance.forEach((lum, i) => {
			const index = pad((luminance.length - i) * 100)
			if (mix) themeColors[`${name}-${index}`] = composite(h, s, l, lum / 100, mix as HSL)
			themeColors[`${name}-${index}-tra`] = hsla(h, s, l, lum / 100)
			if (name === 'primary') {
				const { shade } = colors
				themeColors[`${name}-${index}-shade`] = composite(shade.h, shade.s, shade.l, lum / 100, [h, s, l])
			}
		})
	})
	return themeColors
}
export const getRelativeLuminance = (rgb: RGB) => 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

export const logColors = (colors: ThemeColors) => {
	console.log(`%cGenerated ${Object.entries(colors).length} colors:`, `font-weight: bold`);
	Object.entries(colors).forEach(([name, color]) => {
		console.log(`%c  `, `background: ${color}; color: black; border-radius: 0.25rem;`, `${name}: ${color}`)
	})
}