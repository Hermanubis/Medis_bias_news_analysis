# import spacy
# nlp = spacy.load("en_core_sci_lg")
# text = """spaCy is an open-source software library for advanced natural language processing, 
# written in the programming languages Python and Cython. The library is published under the MIT license
# and its main developers are Matthew Honnibal and Ines Montani, the founders of the software company Explosion."""
# doc = nlp(text)
# print(doc.ents)

import spacy
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from rake_nltk import Rake

stopwords_list = nltk.corpus.stopwords.words('english')

def extraction (text):
    myRake = Rake(min_length=1, max_length=5, include_repeated_phrases=False)
    
    myRake.extract_keywords_from_text(text)
    keyword_extracted = myRake.get_ranked_phrases()[:3]
    return keyword_extracted


def starter (content):
    
    stemmer = nltk.stem.porter.PorterStemmer()
    from nltk.stem import WordNetLemmatizer
    wordnet_lemmatizer = WordNetLemmatizer()
    tokenized = word_tokenize(content)
    #tokenizeStemmer = [ stemmer.stem(token) for token in tokenized if token not in stopwords_list]
    sentence = [wordnet_lemmatizer.lemmatize(word) for word in tokenized if word not in stopwords_list]
    sentence = ' '.join(sentence) 
    
    print(sentence)
    
    processed = extraction(content)
    return processed
    
    
text = """The Ukrainian soccer federation urged FIFA on Monday to remove Iran from the World Cup next month, alleging human rights violations and supplying the Russian military with weapons."""

keywords = starter(text)
print(keywords)