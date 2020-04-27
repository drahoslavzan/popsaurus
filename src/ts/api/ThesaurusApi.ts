
export interface IDictRecord {
	term: string;
	similarity: number;
}

export interface IPronunciation {
	spell: string;
	audio: string;
}

export interface IDefinition {
	pos: string;
	definition: string;
	synonyms: IDictRecord[];
	antonyms: IDictRecord[];
}

export interface ISearchTerm {
	word: string;
	more: string;
	pronunciation: IPronunciation;
	definitons: IDefinition[];
}

const getMoreUrl = (word: string) => `https://www.thesaurus.com/browse/${word}`;
const getApiUrl = (word: string) => `https://tuna.thesaurus.com/pageData/${word}`;

function processDictRecs(synonyms: any[]): IDictRecord[] {
    const s = synonyms.map(s => ({ term: s.term, similarity: parseInt(s.similarity, 10) })) as IDictRecord[];
	s.sort((a, b) => a.similarity === b.similarity ? a.term.localeCompare(b.term) : a.similarity > b.similarity ? -1 : 1);
	return s;
}

function processData(data: any): IDefinition[] {
	if (!data) return [];

    const dd = data.definitionData;
    if (!dd) return [];

    const defs = dd.definitions;
	if (!defs) return [];

    const definitions = defs.map((d: any) => ({
        pos: d.pos,
        definition: d.definition,
        synonyms: processDictRecs(d.synonyms),
        antonyms: processDictRecs(d.antonyms),
	}));

    return definitions;
}

class ThesaurusApi {
    async getDefinitions(word: string): Promise<ISearchTerm> {
		const res = await fetch(getApiUrl(word));
		const data = JSON.parse(await res.text())?.data;
		const defs = processData(data);
		const pronun = data?.pronunciation;
		return {
			word,
			pronunciation: {
				spell: pronun?.spell,
				audio: pronun?.audio?.['audio/mpeg'],
			},
			definitons: defs,
			more: getMoreUrl(word)
		};
    }
}

export default ThesaurusApi;
