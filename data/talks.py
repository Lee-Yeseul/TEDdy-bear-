import pandas as pd
import ast
import datetime as dt
import numpy as np
from pymongo import MongoClient


# client = MongoClient("mongodb+srv://elice:1234@cluster0.usvux.mongodb.net/")
# 본인의 몽고 db url을 설정해주세요.
client = MongoClient("")
db = client['ted']
collection_talk = db['talks']
collection_topic = db['topics']

######################################### talk, topic #############################
tedUltimate = pd.read_csv('./ted_talks_ko.csv', encoding='utf-8')
tedUltimate['link'] = tedUltimate['url'].str.slice(start=26, stop=-1)
tedUltimate.drop(['transcript', 'event', 'views', 'title'], axis=1, inplace=True)
ted = pd.read_csv('./data.csv')
ted['link'] = ted['link'].str.slice(start=22)

newData = pd.merge(tedUltimate, ted, how='inner', on='link')
newData.drop(['link', 'date'], axis=1, inplace=True)

newData['all_speakers'].fillna("{0:\"\"}", inplace=True)

import ast
newData['speakers'] = newData.apply(lambda x: list(ast.literal_eval(x['all_speakers']).values()), axis=1)
newData['topics'] = newData.apply(lambda x: list(ast.literal_eval(x['topics'])), axis=1)

import re
newData['available_lang'] = newData.apply(lambda x: re.split(r'[\'{2}\',]', x['available_lang'])[1::3], axis=1)

newData.drop(['speaker_1', 'all_speakers', 'occupations', 'about_speakers', 'recorded_date', 'comments', 'views', 'likes'], axis=1, inplace=True)

teddy_talks = []
teddy_topics = {}

for idx, row in newData.iterrows():
    new_talk = {
        'id': row.talk_id,
        'title': row.title, 
        'speakers': row.speakers, 
        'published_date': row.published_date, 
        'native_languages': row.native_lang, 
        'available_languages': row.available_lang, 
        'duration': '약 ' + str(row.duration // 60) + '분',
        'description': row.description,
        'topics': row.topics,
        'teddy_view_count': 0,
        'teddy_like_count': 0,
        'url': row.url
    }
    teddy_talks.append(new_talk)
    
    for topic in row.topics:
        if not topic in teddy_topics:
            teddy_topics[topic] = [row.talk_id]
        else:
            teddy_topics[topic].append(row.talk_id)

teddy_topics_list = []
for key, value in teddy_topics.items():
    temp = {key: value}
    teddy_topics_list.append(temp)

collection_talk.insert_many(teddy_talks)
collection_topic.insert_many(teddy_topics_list)




