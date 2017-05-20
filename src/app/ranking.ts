export class Ranking {
		journalName: string;
		search: string;
		updated?: Date;
		noRank?: boolean;
		complete?: boolean;
		GSRank?: any;
		IF?: number;
		IFLink?: string;

	constructor(
		journalName: string,
		search: string,
		updated?: Date,
		noRank?: boolean,
		complete?: boolean,
		GSRank?: any,
		IF?: number,
		IFLink?: string
		){
		this.GSRank = [];
		this.journalName = journalName;
		for (let rank of GSRank){
			this.GSRank.push(rank);
		}
		this.IF = IF;
		this.search = search;
		this.updated = updated;
		this.noRank = noRank;
		this.IFLink = IFLink;
		this.complete = complete;
	}
}
