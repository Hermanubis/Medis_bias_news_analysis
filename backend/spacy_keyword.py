# python -m spacy download en
# pip install --user -U nltk
# pip install -U spacy

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
from collections import Counter
from string import punctuation
nlp = spacy.load("en_core_web_sm")

stopwords_list = nltk.corpus.stopwords.words('english')

def extraction (text):
    result = []
    pos_tag = ['PROPN', 'ADJ', 'NOUN'] 
    doc = nlp(text.lower()) 
    for token in doc:
        if(token.text in nlp.Defaults.stop_words or token.text in punctuation):
            continue
        if(token.pos_ in pos_tag):
            result.append(token.text)
    return result


def starter (content):
    
    stemmer = nltk.stem.porter.PorterStemmer()
    from nltk.stem import WordNetLemmatizer
    wordnet_lemmatizer = WordNetLemmatizer()
    tokenized = word_tokenize(content)
    #tokenizeStemmer = [ stemmer.stem(token) for token in tokenized if token not in stopwords_list]
    sentence = [wordnet_lemmatizer.lemmatize(word) for word in tokenized if word not in stopwords_list]
    sentence = ' '.join(sentence) 
    
    print(sentence)
    
    processed = set(extraction(sentence))
    myList = Counter(processed).most_common(7)
    return myList
    
    
text = """The Ukrainian soccer federation urged FIFA on Monday to remove Iran from the World Cup next month, alleging human rights violations and supplying the Russian military with weapons."""

keywords = starter(text)
for word in keywords:
    print(word[0])