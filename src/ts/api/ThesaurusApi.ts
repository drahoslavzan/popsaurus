
export interface IDefinition {
	pos: string;
	definition: string;
	synonyms: string[];
}

export interface ISearchTerm {
	term: string;
	definitons: IDefinition[];
}

const getApiUrl = (word: string) => `https://tuna.thesaurus.com/pageData/${word}`;

function processSynonyms(synonyms: any[]) {
    synonyms.sort((a, b) => parseInt(a.similarity, 10) > parseInt(b.similarity, 10) ? -1 : 1);
    return synonyms.map(s => s.term);
}

function processData(data: any): IDefinition[] {
	if (!data || !data.data) return [];

    const dd = data.data.definitionData;
    if (!dd) return [];

    const defs = dd.definitions;
	if (!defs) return [];

    const definitions = defs.map((d: any) => ({
        pos: d.pos,
        definition: d.definition,
        synonyms: processSynonyms(d.synonyms)
	}));

    return definitions;
}

class ThesaurusApi {
    async getDefinitions(word: string): Promise<ISearchTerm> {
		const res = await fetch(getApiUrl(word));
		const data = await res.text();
		const defs = processData(JSON.parse(data));
		return { term: word, definitons: defs };
    }
}

export default ThesaurusApi;
