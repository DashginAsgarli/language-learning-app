import { useState } from 'react';

function LangDictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  // function searchWord(word) {
  //   if (!word) return;
  //   setLoading(true);
  //   setError('');
  //   setWordData(null);

  //   fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         setError('Söz tapılmadı');
  //         setLoading(false);
  //         throw new Error('Söz tapılmadı');
  //       }
  //     })
  //     .then(data => {
  //       if (data) {
  //         const wordInfo = data[0];
  //         setWordData(wordInfo);

  //         setRecentSearches(prev => {
  //           const list = [wordInfo, ...prev.filter(w => w.word !== wordInfo.word)];
  //           return list.slice(0, 5);
  //         });

  //         setLoading(false);
  //       }
  //     })
  //     .catch(() => setLoading(false));
  // }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchWord(searchTerm.trim());
    }
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-5 md:p-10 my-8 mx-auto  shadow-2xl shadow-slate-200/50">

      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-3">
          Smart Dictionary
        </h2>
        <p className="text-slate-500 text-lg font-medium">
          İngiliscə sözlərin mənasını öyrən
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-10">
        <div className="flex flex-col md:flex-row gap-3 max-w-3xl mx-auto">
          <input
            className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-200 bg-white text-slate-800 text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-400"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Söz daxil edin..."
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
            disabled={loading}
          >
            {loading ? 'Axtarılır...' : 'Axtar'}
          </button>
        </div>
      </form>

      {error && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-bold flex items-center gap-3">
          <span className="text-2xl">⚠️</span> {error}
        </div>
      )}

      {wordData && (
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-500">
          
          <div className="border-b-2 border-slate-200 pb-6 mb-8">
            <div className="flex items-baseline gap-4 flex-wrap">
              <h3 className="text-5xl font-black text-slate-900 capitalize leading-tight">
                {wordData.word}
              </h3>
              <span className="text-2xl text-blue-500 font-medium italic">
                {wordData.phonetic}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {wordData.meanings.map((meaning, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                
                <div className="mb-4">
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100">
                    {meaning.partOfSpeech}
                  </span>
                </div>

                <div className="space-y-4">
                  {meaning.definitions.slice(0, 3).map((def, j) => (
                    <div key={j} className="p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 transition-colors">
                      <p className="text-slate-700 text-lg leading-relaxed font-medium mb-2">
                        {def.definition}
                      </p>
                      {def.example && (
                        <p className="text-slate-400 italic text-base border-l-4 border-slate-200 pl-4 py-1">
                          "{def.example}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LangDictionary;