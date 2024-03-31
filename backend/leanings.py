from newsapi import NewsApiClient
import pandas as pd
from GoogleNews import GoogleNews

def make_upper_db():
    df = pd.read_csv('source_reliability_bias.csv')
    for i in range(len(df["Source"])):
        df.loc[i, 'Source'] = df.loc[i, 'Source'].upper()
        print(df.loc[i, 'Source'])
    df.to_csv('srb_upper.csv', index=False)

def main():
    googlenews = GoogleNews(lang='en', period='7d')
    print(googlenews.search('APPLE'))
    
    # newsapi = NewsApiClient(api_key='10b67349b2f14011a5191c38ac54ede4')
    # top_sources = newsapi.get_sources()['sources']
    
    # source_names = []
    # for element in top_sources:
    #     source_names.append(element['name'].upper())

    # df = pd.read_csv('srb_upper.csv')
    # for name in source_names:
    #     # print(df[df['Source'].str.contains(name)])
    #     check = name in df['Source'].values
    #     if check:
    #         print(name, df.loc[df['Source'].str.contains(name), 'Reliability'].values[0],
    #                     df.loc[df['Source'].str.contains(name), 'Bias'].values[0])


if __name__ == "__main__":
    main()