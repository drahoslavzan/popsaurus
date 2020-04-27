
export interface ISentence {
	sentence: string;
	upvotes: number;
	downvotes: number;
	score: number;
}

export interface ISearchSentences {
	word: string;
	headword: string;
	more: string;
	sentenes: ISentence[];
}

const apiRoot = 'https://api.yourdictionary.com';
const getMoreUrl = (word: string) => `https://sentence.yourdictionary.com/${word}`;
const getApiUrl = (word: string, count: number) => `${apiRoot}/words/${word}/sentences/en?limit=${count}`;

function processSentences(sens: ISentence[]): ISentence[] {
	if (!sens) return sens;
	for (var s of sens) {
		s.score = s.upvotes - s.downvotes;
	};
	sens.sort((a, b) => a.score === b.score ? 0 : a.score > b.score ? -1 : 1);
	return sens;
}

class YourdictionaryApi {
    async getSentences(word: string, count: number): Promise<ISearchSentences> {
		const res = await fetch(getApiUrl(word, count));
		const data = JSON.parse(await res.text())?.data;
		return {
			word,
			headword: data?.headword,
			sentenes: processSentences(data?.sentences),
			more: getMoreUrl(word)
		};
    }
}

export default YourdictionaryApi;
