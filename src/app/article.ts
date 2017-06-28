export class Article {
	constructor(
		public title: string,
		public journal: string,
		public citations: number,
		public year: number,
		public exclude: boolean,
		public firstAuthor: boolean,
		public citationsLink?: string
		){}
	
}
